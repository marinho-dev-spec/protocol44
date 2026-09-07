/**
 * Motor de pontuação + autoconsistência — regra registrada na QUIZ_V4_PROPOSTA.md.
 *
 * Pontuação (regra simples, recomendada):
 *  - Persona: só P1 (peso 1) e P8 (peso 2).
 *  - Vilão: só P3 (peso 1 por área, máx 1/vilão), P4 (peso 2) e P5 (teto 1 no total).
 *  - Rótulos cruzados NÃO pontuam o outro eixo — viram sinal indireto do motor (capado < 1.0) ou flag de copy.
 *  - Empate de Vilão → vilão da P4; senão P5; senão P3; default TravamentoInterno (Padrão Herdado).
 *  - Empate/vazio de Persona → P8; senão P1; senão cena neutra.
 *
 * Motor de adivinhação (mecânica v1/v2 — revelação SÓ pós-resposta; dica pré-clique vetada):
 *  - Regra de segurança inegociável: só revela quando a previsão bate com a resposta real.
 *  - Previsão P5 (vilão): a partir de P3 + P4. Empate → vilão da P4; sem sinal → null.
 *  - Previsão P8 (persona): P1 + sinal indireto (correlação Vilão→Persona + flag P6), capado em < 1.0.
 */

import { PERGUNTAS, type Opcao, type Persona, type Vilao } from './data';

export interface Estado {
  respostas: Record<string, string[]>; // perguntaId -> opção(ões) marcada(s)
  priming?: { tipo: 'crente' | 'duvida' | 'cetica'; checagem?: string; palavra?: string };
  email?: string;
  nome?: string;
}

const CORRELACAO_VILAO_PERSONA: Record<Vilao, Partial<Record<Persona, number>>> = {
  TravamentoInterno: { Relacional: 0.3, Familia: 0.15 },
  FaltaConcreta: { Profissional: 0.3 },
  SaudeEsgotamento: { Profissional: 0.15, Familia: 0.15 },
};

const CAP_INDIRETO = 0.9; // sinal indireto nunca sobrepõe 1 ponto direto

function opcoesMarcadas(estado: Estado, pid: string): Opcao[] {
  const ids = estado.respostas[pid] ?? [];
  return PERGUNTAS[pid].opcoes.filter((o) => ids.includes(o.id));
}

/* ── Vilão-contexto ── */

export function pontosVilao(estado: Estado, incluirP5 = true): Record<Vilao, number> {
  const pts: Record<Vilao, number> = { FaltaConcreta: 0, SaudeEsgotamento: 0, TravamentoInterno: 0 };
  // P3: peso 1 por área, cada vilão no máximo 1 ponto vindo da P3
  const p3Vistos = new Set<Vilao>();
  for (const o of opcoesMarcadas(estado, 'p3')) {
    if (o.vilao && !p3Vistos.has(o.vilao)) {
      pts[o.vilao] += 1;
      p3Vistos.add(o.vilao);
    }
  }
  // P4: peso 2
  const p4 = opcoesMarcadas(estado, 'p4')[0];
  if (p4?.vilao) pts[p4.vilao] += 2;
  // P5: teto 1 no total
  if (incluirP5) {
    const p5ComVilao = opcoesMarcadas(estado, 'p5').filter((o) => o.vilao);
    if (p5ComVilao.length > 0) pts[p5ComVilao[0].vilao as Vilao] += 1;
  }
  return pts;
}

function lider<K extends string>(pts: Record<K, number>): K | null {
  const entradas = Object.entries(pts) as [K, number][];
  const max = Math.max(...entradas.map(([, v]) => v));
  if (max <= 0) return null;
  const vencedores = entradas.filter(([, v]) => Math.abs(v - max) < 1e-9);
  return vencedores.length === 1 ? vencedores[0][0] : null;
}

export function vilaoFinal(estado: Estado): Vilao {
  const pts = pontosVilao(estado);
  const l = lider(pts);
  if (l) return l;
  // Empate/vazio: P4 → P5 → P3 → default Herdado
  const p4 = opcoesMarcadas(estado, 'p4')[0];
  if (p4?.vilao) return p4.vilao;
  const p5 = opcoesMarcadas(estado, 'p5').find((o) => o.vilao);
  if (p5?.vilao) return p5.vilao;
  const p3 = opcoesMarcadas(estado, 'p3').find((o) => o.vilao);
  if (p3?.vilao) return p3.vilao;
  return 'TravamentoInterno';
}

/* ── Persona ── */

export function pontosPersona(estado: Estado): Record<Persona, number> {
  const pts: Record<Persona, number> = { Profissional: 0, Familia: 0, Relacional: 0 };
  const p1 = opcoesMarcadas(estado, 'p1')[0];
  if (p1?.persona) pts[p1.persona] += 1;
  const p8 = opcoesMarcadas(estado, 'p8')[0];
  if (p8?.persona) pts[p8.persona] += 2;
  return pts;
}

/** Persona final: null = cena neutra ("você consigo mesmo") */
export function personaFinal(estado: Estado): Persona | null {
  const l = lider(pontosPersona(estado));
  if (l) return l;
  const p8 = opcoesMarcadas(estado, 'p8')[0];
  if (p8?.persona) return p8.persona;
  const p1 = opcoesMarcadas(estado, 'p1')[0];
  if (p1?.persona) return p1.persona;
  return null;
}

/* ── Motor de adivinhação ── */

/** Previsão do vilão ANTES da P5 (a partir de P3 + P4 apenas). */
export function preverVilaoP5(estado: Estado): Vilao | null {
  const pts = pontosVilao(estado, false);
  const l = lider(pts);
  if (l) return l;
  const p4 = opcoesMarcadas(estado, 'p4')[0];
  return p4?.vilao ?? null; // tie-break: vilão da P4; sem sinal → null (nunca chuta)
}

/**
 * Checa a revelação da P5 — só é verdadeira se a previsão bate com o que a pessoa
 * de fato marcou (spec de múltipla escolha: a previsão "acerta" quando pelo menos
 * uma frase marcada carrega o vilão previsto).
 */
export function revelaP5(estado: Estado, previsto: Vilao | null): boolean {
  if (!previsto) return false;
  return opcoesMarcadas(estado, 'p5').some((o) => o.vilao === previsto);
}

/** Previsão da persona ANTES da P8 (P1 + sinal indireto capado). */
export function preverPersonaP8(estado: Estado): Persona | null {
  const combinado: Record<Persona, number> = { Profissional: 0, Familia: 0, Relacional: 0 };
  const p1 = opcoesMarcadas(estado, 'p1')[0];
  if (p1?.persona) combinado[p1.persona] += 1;

  // Sinal indireto: correlação Vilão→Persona + flag Família da P6 — soma capada em < 1.0
  const indireto: Record<Persona, number> = { Profissional: 0, Familia: 0, Relacional: 0 };
  const vilaoPts = pontosVilao(estado);
  for (const [vilao, pontos] of Object.entries(vilaoPts) as [Vilao, number][]) {
    for (const [persona, peso] of Object.entries(CORRELACAO_VILAO_PERSONA[vilao] ?? {}) as [Persona, number][]) {
      indireto[persona] += pontos * peso;
    }
  }
  const p6 = opcoesMarcadas(estado, 'p6')[0];
  if (p6?.indireto?.persona) indireto[p6.indireto.persona] += 0.3;
  const totalIndireto = indireto.Profissional + indireto.Familia + indireto.Relacional;
  const escala = totalIndireto > CAP_INDIRETO ? CAP_INDIRETO / totalIndireto : 1;
  for (const p of ['Profissional', 'Familia', 'Relacional'] as Persona[]) combinado[p] += indireto[p] * escala;

  return lider(combinado); // empate → null (nunca chuta)
}

export function revelaP8(estado: Estado, previsto: Persona | null): boolean {
  if (!previsto) return false;
  const p8 = opcoesMarcadas(estado, 'p8')[0];
  return p8?.persona === previsto; // "paz e confiança" não pontua → nunca revela (regra de segurança)
}

/* ── Flags de copy ── */

export function flagIsolamento(estado: Estado): boolean {
  return (
    opcoesMarcadas(estado, 'p3').some((o) => o.flag === 'isolamento') ||
    opcoesMarcadas(estado, 'p5').some((o) => o.flag === 'isolamento') ||
    opcoesMarcadas(estado, 'p6').some((o) => o.flag === 'isolamento')
  );
}

/* ── Fragmentos ── */

/** P3 pro SIM 2: só a área do eixo vencedor; se não marcada, fallback da variação. */
export function fragP3Sim2(estado: Estado, vilao: Vilao, tabela: Record<string, string>, fallback: Record<Vilao, string>): string {
  const marcada = opcoesMarcadas(estado, 'p3').find((o) => o.vilao === vilao);
  return marcada && tabela[marcada.id] ? tabela[marcada.id] : fallback[vilao];
}

/** Card de motivação: citação literal — P1 se não for neutra, senão P8. */
export function citacaoMotivacao(estado: Estado): string {
  const p1 = opcoesMarcadas(estado, 'p1')[0];
  if (p1 && p1.id !== 'p1-entender') return p1.label;
  const p8 = opcoesMarcadas(estado, 'p8')[0];
  return p8?.label ?? p1?.label ?? '';
}

/* ── Persistência (sessão) ── */

const CHAVE = 'acorde-quiz-v1';

export function salvar(estado: Estado, passo: number) {
  try {
    sessionStorage.setItem(CHAVE, JSON.stringify({ estado, passo }));
  } catch {}
}

export function restaurar(): { estado: Estado; passo: number } | null {
  try {
    const raw = sessionStorage.getItem(CHAVE);
    if (!raw) return null;
    const dados = JSON.parse(raw);
    if (dados && dados.estado && typeof dados.passo === 'number') return dados;
  } catch {}
  return null;
}
