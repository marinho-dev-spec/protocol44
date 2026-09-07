/**
 * Orquestrador do funil — renderização imperativa + GSAP.
 * Motion-princípio da marca (BRANDING_BRIEF §4.4): tudo anima como SINTONIZAÇÃO —
 * do borrado ao nítido, do trêmulo ao estável. Nunca brilhos, nunca partículas.
 */
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import * as D from './quiz-v4-copy';
import * as E from './quiz-v4-engine';
import { funnelConfig, safeWebUrl } from './funnel-config';

gsap.registerPlugin(ScrollTrigger);

const RM = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const dur = (v: number) => (RM ? 0 : v);
/** Anima só com a aba visível — em aba oculta o rAF congela e tudo deve montar no estado final. */
const vivo = () => !RM && document.visibilityState === 'visible';

const app = document.getElementById('app')!;
const shell = document.getElementById('shell')!;
const progressWrap = document.getElementById('progress')!;
const progressFill = document.getElementById('progress-fill')!;

let estado: E.Estado = { respostas: {} };
let passo = 0;

/* ── Fluxo ── */
type Step =
  | { t: 'tela0' }
  | { t: 'q'; id: string }
  | { t: 'reforco1' }
  | { t: 'reforco2' }
  | { t: 'reforco3' }
  | { t: 'priming' }
  | { t: 'loading' }
  | { t: 'gateEmail' }
  | { t: 'gateNome' }
  | { t: 'resultado' };

const FLUXO: Step[] = [
  { t: 'tela0' },
  { t: 'q', id: 'p1' },
  { t: 'q', id: 'p2' },
  { t: 'q', id: 'p3' },
  { t: 'q', id: 'p4' },
  { t: 'reforco1' },
  { t: 'q', id: 'p5' },
  { t: 'q', id: 'p6' },
  { t: 'reforco2' },
  { t: 'q', id: 'p7' },
  { t: 'q', id: 'p8' },
  { t: 'q', id: 'p9' },
  { t: 'priming' },
  { t: 'reforco3' },
  { t: 'q', id: 'p10' },
  { t: 'loading' },
  { t: 'gateEmail' },
  { t: 'gateNome' },
  { t: 'resultado' },
];

/* ── Utilitários visuais ── */

function setGrain(op: number) {
  document.documentElement.style.setProperty('--grain-op', String(op));
}

function atualizarProgresso() {
  const respondidas = Object.keys(estado.respostas).filter((k) => k.startsWith('p')).length;
  const pct = Math.min(100, (respondidas / 10) * 100);
  progressWrap.setAttribute('aria-valuenow', String(respondidas));
  progressWrap.setAttribute('aria-valuetext', `${respondidas} de 10 perguntas respondidas`);
  gsap.to(progressFill, { width: `${pct}%`, duration: dur(0.4), ease: 'power2.out' });
}

/** Content is visible before motion; screen timers cannot fire on a later screen. */
let screenVersion = 0;
const pendingTimers = new Set<number>();
function later(fn: () => void, ms: number) {
  const version = screenVersion;
  const timer = window.setTimeout(() => { pendingTimers.delete(timer); if (version === screenVersion) fn(); }, ms);
  pendingTimers.add(timer);
}
function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, c => ({'&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;'}[c]!));
}
function focusContent() {
  const heading = app.querySelector<HTMLElement>('h1,h2,p');
  if (heading) { heading.tabIndex = -1; heading.focus({ preventScroll: true }); }
}
function swap(html: string, onMount?: () => void) {
  app.innerHTML = html;
  onMount?.();
  window.scrollTo({ top: 0, behavior: 'instant' });
  focusContent();
  if (vivo()) gsap.fromTo(app, { y: 6 }, { y: 0, duration: .25, ease: 'power2.out' });
}

function irPara(n: number) {
  screenVersion++;
  pendingTimers.forEach(timer => clearTimeout(timer)); pendingTimers.clear();
  gsap.killTweensOf([app, ...app.querySelectorAll('*')]);
  ScrollTrigger.getAll().forEach(trigger => trigger.kill());
  passo = n;
  E.salvar(estado, passo);
  render();
}

const avancar = () => irPara(passo + 1);

/* ── Telas ── */

function render() {
  const step = FLUXO[passo];
  progressWrap.style.opacity = step.t === 'q' || step.t === 'reforco1' || step.t === 'reforco2' || step.t === 'reforco3' || step.t === 'priming' ? '1' : '0';
  if (step.t !== 'resultado') {
    shell.className = SHELL_QUIZ;
  }
  switch (step.t) {
    case 'tela0': return telaZero();
    case 'q': return pergunta(step.id);
    case 'reforco1': return reforco1();
    case 'reforco2': return reforco2();
    case 'reforco3': return reforco3();
    case 'priming': return priming();
    case 'loading': return loading();
    case 'gateEmail': return gateEmail();
    case 'gateNome': return gateNome();
    case 'resultado': return resultado();
  }
}

const SHELL_QUIZ = 'v4-shell';
const SHELL_RESULTADO = 'v4-shell v4-result';

/**
 * O motivo-assinatura da marca: fio de prumo.
 * Dois estados. Peso fora do eixo em Tide = The Swing (diagnostico, antes).
 * Peso no eixo em Brass = The Hold (payoff, resolucao).
 */
let _prumoN = 0;
function prumoSvg(id: string, cls = '') {
  return `
  <svg class="mx-auto h-full ${cls}" viewBox="0 0 160 96" aria-hidden="true">
    <line id="${id}-rest" x1="18" y1="80" x2="142" y2="80" stroke="#c5c1b7" stroke-width="1.5"/>
    <path d="M 46 76 A 42 42 0 0 1 114 76" fill="none" stroke="#5c625c" stroke-width="1" stroke-dasharray="2 5" opacity="0.4"/>
    <line x1="66" y1="10" x2="94" y2="10" stroke="#5c625c" stroke-width="2.2" stroke-linecap="round"/>
    <g id="${id}-arm">
      <line x1="80" y1="10" x2="80" y2="58" stroke="#5c625c" stroke-width="1.4"/>
      <path id="${id}-bob" d="M 80 57 L 87 65 L 80 86 L 73 65 Z" fill="#5c625c"/>
    </g>
  </svg>`;
}

function telaZero() {
  swap(`<div class="v4-opening">
    <img src="/brand/symbol-ink.svg" alt="" width="120" height="120" class="v4-opening-mark" />
    <div class="signal-line" aria-hidden="true"><svg viewBox="0 0 480 64"><path d="M0 32H90l10-9 10 18 10-27 10 36 10-43 10 50 10-42 10 30 10-20 10 7h30l10-7 10 20 10-30 10 42 10-50 10 43 10-36 10 27 10-18 10 9h120" fill="none" stroke="currentColor" stroke-width="1.5"/></svg></div>
    <p class="v4-opening-copy">${D.TELA0.texto}</p>
    <button class="cta w-full mt-7" id="btn-start">${D.TELA0.cta}</button>
  </div>`, () => document.getElementById('btn-start')!.addEventListener('click', avancar));
}

function optHtml(o: D.Opcao) {
  const emoji = o.emoji ? `<span class="emoji" aria-hidden="true">${o.emoji}</span>` : '';
  return `<button class="opt st" data-id="${o.id}" aria-pressed="false">${emoji}<span>${o.label}</span></button>`;
}

function pergunta(pid: string) {
  const q = D.PERGUNTAS[pid];
  setGrain(Math.max(0.028, 0.055 - q.numero * 0.0025));

  // previsões do motor — CONGELADAS antes da resposta (regra de segurança)
  const previstoVilao = pid === 'p5' ? E.preverVilaoP5(estado) : null;
  const previstaPersona = pid === 'p8' ? E.preverPersonaP8(estado) : null;

  const grid7 = pid === 'p7' ? 'grid grid-cols-3 gap-2.5' : 'flex flex-col gap-3';
  swap(
    `
    <div class="st flex items-center gap-3 mb-4">
      <span class="eyebrow">Pergunta ${q.numero} <span class="text-dust">/ 10</span></span>
      <span class="h-px flex-1 bg-seam"></span>
    </div>
    <h2 class="st font-display font-semibold text-[1.45rem] leading-[1.3] mb-7 text-balance">${q.titulo}</h2>
    <div class="${grid7}" id="opts">${q.opcoes.map(optHtml).join('')}</div>
    <div id="acao" class="mt-5"></div>
  `,
    () => {
      const botoes = Array.from(app.querySelectorAll<HTMLButtonElement>('.opt'));
      const acao = document.getElementById('acao')!;

      const concluir = () => {
        botoes.forEach((b) => (b.disabled = true));
        atualizarProgresso();
        // Revelações do motor — só quando a previsão bate de verdade
        if (pid === 'p5' && E.revelaP5(estado, previstoVilao)) return revelar(acao, [D.MOTOR.p5.fff, `${D.MOTOR.p5.revelacao}`, D.MOTOR.p5.barnum]);
        if (pid === 'p8' && E.revelaP8(estado, previstaPersona)) return revelar(acao, [`${D.MOTOR.p8.revelacao}`, D.MOTOR.p8.futurePacing]);
        if (pid === 'p9') return bufferP9();
        later(avancar, RM ? 80 : 420);
      };

      if (q.multipla) {
        const marcadas = new Set<string>();
        acao.innerHTML = `<button class="cta w-full" id="btn-multi" disabled>Continuar</button>`;
        const btnMulti = document.getElementById('btn-multi') as HTMLButtonElement;
        botoes.forEach((b) => {
          b.addEventListener('click', () => {
            const opt = q.opcoes.find((o) => o.id === b.dataset.id)!;
            if (marcadas.has(opt.id)) {
              marcadas.delete(opt.id);
              b.setAttribute('aria-pressed', 'false');
            } else {
              if (opt.exclusiva) {
                marcadas.clear();
                botoes.forEach((x) => x.setAttribute('aria-pressed', 'false'));
              } else {
                for (const o of q.opcoes) if (o.exclusiva && marcadas.has(o.id)) {
                  marcadas.delete(o.id);
                  botoes.find((x) => x.dataset.id === o.id)?.setAttribute('aria-pressed', 'false');
                }
              }
              marcadas.add(opt.id);
              b.setAttribute('aria-pressed', 'true');
            }
            btnMulti.disabled = marcadas.size === 0;
          });
        });
        btnMulti.addEventListener('click', () => {
          estado.respostas[pid] = [...marcadas];
          E.salvar(estado, passo);
          btnMulti.remove();
          concluir();
        });
      } else {
        botoes.forEach((b) => {
          b.addEventListener('click', () => {
            estado.respostas[pid] = [b.dataset.id!];
            E.salvar(estado, passo);
            b.setAttribute('aria-pressed', 'true');
            concluir();
          });
        });
      }
    }
  );
}

/** Caixa de revelação do motor — o único verde do quiz (a cor só entra quando algo se resolve). */
function revelar(slot: HTMLElement, linhas: string[]) {
  slot.innerHTML = `
    <div class="reveal" id="rv">${linhas.map((l) => `<p class="rv-l mb-2 last:mb-0">${l}</p>`).join('')}</div>
    <button class="cta mt-4 w-full" id="btn-rv">Continuar</button>`;
  document.getElementById('btn-rv')!.addEventListener('click', avancar);
  if (vivo()) {
    gsap.fromTo('#rv', { opacity: 0, scale: 0.97, filter: 'blur(6px)' }, { opacity: 1, scale: 1, filter: 'blur(0px)', duration: 0.45, ease: 'power2.out' });
    gsap.fromTo('.rv-l', { opacity: 0, y: 6 }, { opacity: 1, y: 0, duration: 0.4, stagger: 0.35, delay: 0.2 });
    gsap.fromTo('#btn-rv', { opacity: 0 }, { opacity: 1, duration: 0.3, delay: 0.9 });
  }
}

/** Buffer pós-P9 (The Ledge) — 1 linha, depois segue pro Priming 2. */
function bufferP9() {
  const tipo = primingTipo();
  const acao = document.getElementById('acao')!;
  acao.innerHTML = `<p class="text-ash text-[0.92rem] leading-relaxed" id="buffer">${D.P9_BUFFERS[tipo]}</p>`;
  if (vivo()) gsap.fromTo('#buffer', { opacity: 0 }, { opacity: 1, duration: 0.4 });
  later(avancar, RM ? 300 : 1700);
}

function primingTipo(): D.PrimingTipo {
  const r = estado.respostas['p9']?.[0];
  return r === 'p9-crente' ? 'crente' : r === 'p9-duvida' ? 'duvida' : 'cetica';
}

function cardReforco(inner: string, ctaLabel: string, extra = '') {
  return `
    <img class="v4-reinforcement-mark" src="/brand/symbol-copper.svg" alt="" width="56" height="56"/>
    <div class="painel p-6">${inner}</div>
    ${extra}
    <button class="st cta mt-6 w-full" id="btn-ref">${ctaLabel}</button>`;
}

function reforco1() {
  swap(
    cardReforco(
      `
      <p class="st font-display font-semibold text-[1.15rem] leading-snug">${D.REFORCO1.feel}</p>
      <p class="st text-ash text-[0.95rem] leading-relaxed mt-4">${D.REFORCO1.felt}</p>
      <p class="st font-display font-semibold text-[1.3rem] text-tide mt-4">${D.REFORCO1.found}</p>
      <p class="st text-[0.95rem] leading-relaxed mt-4">${D.REFORCO1.corpo}</p>
      <p class="st text-ash text-[0.95rem] mt-4">${D.REFORCO1.fecho}</p>
      <p class="st eyebrow mt-6">${D.REFORCO1.prova}</p>
    `,
      D.REFORCO1.cta
    ),
    () => document.getElementById('btn-ref')!.addEventListener('click', avancar)
  );
}

function reforco2() {
  swap(
    cardReforco(
      `
      <p class="st font-display font-semibold text-[1.25rem] leading-snug">${D.REFORCO2.headline}</p>
      <p class="st text-[0.98rem] leading-relaxed mt-5 text-ash">${D.REFORCO2.corpo}</p>
    `,
      D.REFORCO2.cta
    ),
    () => {
      document.getElementById('btn-ref')!.addEventListener('click', avancar);
      // contador do 97,87% removido em 07/09: numero sem lastro (INDICE_GERAL.md).
    }
  );
}

function reforco3() {
  swap(
    cardReforco(
      `
      <p class="st font-display font-bold text-[1.4rem]">${D.REFORCO3.headline}</p>
      <p class="st text-[0.93rem] leading-relaxed mt-5">${D.REFORCO3.sinal1}</p>
      <p class="st text-[0.93rem] leading-relaxed mt-4">${D.REFORCO3.sinal2}</p>
      <button class="st link-sutil mt-2 font-mono text-[0.7rem] tracking-wide" id="btn-fontes">${D.REFORCO3.sinal2Fontes}</button>
      <div id="fontes" class="hidden mt-3 border border-seam rounded-xl p-4 flex flex-col gap-3">
        ${D.REFORCO3.fontes.map((f) => `<p class="text-ash text-[0.78rem] leading-relaxed">${f}</p>`).join('')}
      </div>
      <p class="st text-[0.93rem] leading-relaxed mt-4">${D.REFORCO3.sinal3}</p>
      <p class="st text-[0.9rem] leading-relaxed mt-5 border-l-2 border-seam-hi pl-4 text-ash">${D.REFORCO3.candid}</p>
    `,
      D.REFORCO3.cta
    ),
    () => {
      document.getElementById('btn-ref')!.addEventListener('click', avancar);
      const fontes = document.getElementById('fontes')!;
      document.getElementById('btn-fontes')!.addEventListener('click', () => {
        const aberto = !fontes.classList.contains('hidden');
        if (aberto) fontes.classList.add('hidden');
        else {
          fontes.classList.remove('hidden');
          if (vivo()) gsap.fromTo(fontes, { opacity: 0, y: -6 }, { opacity: 1, y: 0, duration: 0.35 });
        }
      });
    }
  );
}

/* ── Priming 2 ── */

function priming() {
  const tipo = primingTipo();
  estado.priming = { tipo };
  const P = D.PRIMING2;
  const pular = `<button class="link-sutil mt-6 block mx-auto" id="btn-pular">Pular</button>`;

  const checagem = (perguntaTxt: string) => `
    <div id="chk" class="hidden mt-7">
      <p class="font-display font-semibold text-[1.05rem] mb-4">${perguntaTxt}</p>
      <div class="flex flex-col gap-2.5">
        ${P.checagemOpcoes.map((c) => `<button class="opt" data-chk="${c}"><span>${c}</span></button>`).join('')}
      </div>
    </div>`;

  const montarChecagem = () => {
    const chk = document.getElementById('chk');
    if (!chk) return;
    chk.classList.remove('hidden');
    if (vivo()) gsap.fromTo(chk, { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.4 });
    chk.querySelectorAll<HTMLButtonElement>('[data-chk]').forEach((b) =>
      b.addEventListener('click', () => {
        estado.priming = { ...estado.priming!, checagem: b.dataset.chk };
        E.salvar(estado, passo);
        b.setAttribute('aria-pressed', 'true');
        later(avancar, RM ? 80 : 380);
      })
    );
  };

  if (tipo === 'crente') {
    swap(
      `
      <div class="text-center h-24 opacity-60">${prumoSvg('pr' + (++_prumoN))}</div>
      <p class="st text-[0.98rem] leading-loose mt-6">${P.crente.texto}</p>
      ${checagem(P.crente.checagem)}
      ${pular}
    `,
      () => {
        document.getElementById('btn-pular')!.addEventListener('click', avancar);
        later(montarChecagem, RM ? 200 : 6000);
      }
    );
  } else if (tipo === 'duvida') {
    swap(
      `
      <p class="st text-ash text-[0.92rem] leading-relaxed">${P.duvida.intro}</p>
      <p class="st text-[0.98rem] leading-loose mt-5">${P.duvida.texto}</p>
      ${checagem(P.duvida.checagem)}
      ${pular}
    `,
      () => {
        document.getElementById('btn-pular')!.addEventListener('click', avancar);
        later(montarChecagem, RM ? 200 : 6000);
      }
    );
  } else {
    swap(
      `
      <p class="st text-[1.02rem] leading-relaxed">${P.cetica.texto}</p>
      <div class="st grid grid-cols-2 gap-2.5 mt-6" id="palavras">
        ${P.cetica.palavras.map((p) => `<button class="opt justify-center" data-palavra="${p}"><span>${p}</span></button>`).join('')}
      </div>
      <div id="depois"></div>
      ${checagem(P.cetica.checagem)}
      ${pular}
    `,
      () => {
        document.getElementById('btn-pular')!.addEventListener('click', avancar);
        document.querySelectorAll<HTMLButtonElement>('[data-palavra]').forEach((b) =>
          b.addEventListener('click', () => {
            estado.priming = { ...estado.priming!, palavra: b.dataset.palavra };
            E.salvar(estado, passo);
            b.setAttribute('aria-pressed', 'true');
            document.querySelectorAll<HTMLButtonElement>('[data-palavra]').forEach((x) => (x.disabled = true));
            const depois = document.getElementById('depois')!;
            depois.innerHTML = `<p class="text-ash text-[0.92rem] leading-relaxed mt-5">${P.cetica.depois}</p>`;
            if (vivo()) gsap.fromTo(depois, { opacity: 0 }, { opacity: 1, duration: 0.4 });
            later(montarChecagem, RM ? 200 : 1400);
          })
        );
      }
    );
  }
}

/* ── Loading (labor illusion) ── */

function loading() {
  setGrain(0.035);
  swap(
    `
    <div class="text-center h-28" id="ld-prumo">${prumoSvg('ld')}</div>
    <div class="mt-8 flex flex-col gap-4" id="linhas">
      ${D.LOADING.linhas.map((l) => `<p class="ld font-mono text-[0.78rem] tracking-wide text-ash opacity-0"><span class="text-tide">▸</span> ${l}</p>`).join('')}
    </div>
    <div class="mt-10 border border-seam rounded-xl p-5 opacity-0" id="quote">
      <p class="text-[1.4rem] leading-none text-dust" aria-hidden="true">❝</p>
      <p class="italic text-[0.9rem] leading-relaxed mt-1">${D.LOADING.citacao.original}</p>
      <p class="text-ash text-[0.82rem] mt-2">${D.LOADING.citacao.traducao}</p>
      <p class="eyebrow mt-3 text-[0.6rem]!">${D.LOADING.citacao.tag}</p>
    </div>
  `,
    () => {
      if (vivo()) {
        const tl = gsap.timeline({ onComplete: avancar });
        tl.to('.ld', { opacity: 1, duration: 0.4, stagger: 1.1 });
        tl.to('#quote', { opacity: 1, duration: 0.5 }, 1.2);
        tl.to({}, { duration: 1.6 });
      } else {
        gsap.set('.ld, #quote', { opacity: 1 });
        later(avancar, 600);
      }
    }
  );
}

/* ── Gate ── */

function gateEmail() {
  swap(
    `
    <h2 class="st font-display font-semibold text-[1.35rem] leading-snug">${D.GATE.emailTitulo}</h2>
    <p class="st text-ash text-[0.93rem] leading-relaxed mt-3">${D.GATE.emailTexto}</p>
    <form id="form-email" class="st mt-6">
      <input type="email" required aria-label="E-mail" id="inp-email" inputmode="email" autocomplete="email" placeholder="${D.GATE.emailPlaceholder}"
        class="w-full bg-ridge border border-seam-hi rounded-xl px-4 py-3.5 text-chalk placeholder:text-dust text-[0.95rem]" />
      <p id="err-email" role="alert" class="hidden text-clay text-[0.8rem] mt-2">Confere esse e-mail? Parece faltar um pedaço.</p>
      <button class="cta w-full mt-4" type="submit">${D.GATE.emailCta}</button>
    </form>
    <p class="st text-dust text-[0.72rem] leading-relaxed mt-4">Sem spam. Seu e-mail guarda o diagnóstico e recebe o resultado — nada além disso sem você pedir.</p>
  `,
    () => {
      const form = document.getElementById('form-email') as HTMLFormElement;
      form.addEventListener('submit', (ev) => {
        ev.preventDefault();
        const inp = document.getElementById('inp-email') as HTMLInputElement;
        const v = inp.value.trim();
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) {
          document.getElementById('err-email')!.classList.remove('hidden');
          return;
        }
        estado.email = v;
        E.salvar(estado, passo);
        avancar();
      });
    }
  );
}

function gateNome() {
  swap(
    `
    <h2 class="st font-display font-semibold text-[1.35rem] leading-snug">${D.GATE.nomeTitulo}</h2>
    <form id="form-nome" class="st mt-6">
      <input type="text" required aria-label="Seu primeiro nome" maxlength="80" id="inp-nome" autocomplete="given-name" placeholder="${D.GATE.nomePlaceholder}"
        class="w-full bg-ridge border border-seam-hi rounded-xl px-4 py-3.5 text-chalk placeholder:text-dust text-[0.95rem]" />
      <button class="cta cta-verde w-full mt-4" type="submit">${D.GATE.nomeCta}</button>
    </form>
  `,
    () => {
      const form = document.getElementById('form-nome') as HTMLFormElement;
      form.addEventListener('submit', (ev) => {
        ev.preventDefault();
        const v = (document.getElementById('inp-nome') as HTMLInputElement).value.trim();
        if (!v) return;
        estado.nome = v.split(' ')[0];
        E.salvar(estado, passo);
        avancar();
      });
    }
  );
}

/* ── Resultado ── */

function contarNumero(el: Element | null, alvo: number, sufixo = '', decimalSep = ',', decimais = 2) {
  if (!el) return;
  if (!vivo()) { el.textContent = alvo.toFixed(decimais).replace('.', decimalSep) + sufixo; return; }
  const obj = { v: 0 };
  gsap.to(obj, {
    v: alvo,
    duration: 1.4,
    ease: 'power2.out',
    onUpdate: () => (el.textContent = obj.v.toFixed(decimais).replace('.', decimalSep) + sufixo),
  });
}

function sec(inner: string, cls = '') {
  return `<section class="sec ${cls}">${inner}</section>`;
}

function diagramaHtml(v: D.Variacao) {
  const painel = (titulo: string, comRuido: boolean, de: string, bloco: string, para: string) => `
    <div class="painel v4-signal-panel">
      <h3>${titulo}</h3>
      <div class="v4-signal-endpoints"><span>${de}</span><span>${para}</span></div>
      <svg class="v4-signal-drawing" viewBox="0 0 300 72" aria-hidden="true">
        ${comRuido
          ? `<rect x="107" y="5" width="86" height="62" fill="#ded3c6"/>
             <path d="M108 20L123 5M108 36L139 5M108 52L155 5M110 66L171 5M126 66L187 5M142 66L192 16M158 66L192 32M174 66L192 48" stroke="#b8a997" stroke-width="1"/>
             <path d="M0 36H85L92 31L98 41L105 25L112 50L120 17L127 56L135 22L143 49L151 14L159 53L166 32L174 44" fill="none" stroke="#171717" stroke-width="2"/>
             <path d="M218 36H300" stroke="#a89c8e" stroke-width="1.5" stroke-dasharray="3 7"/>`
          : `<path d="M0 36H300" fill="none" stroke="#b92c06" stroke-width="2"/>`}
      </svg>
      <p class="v4-signal-explanation">${bloco}</p>
    </div>`;
  return `
    <div class="v4-signal-panels">
      ${painel('Com a interferência ativa', true, v.diagrama.p1De, v.diagrama.p1Bloco, v.diagrama.p1Para)}
      ${painel('Depois da Resintonização', false, v.diagrama.p1De, v.diagrama.p2Texto, 'O resultado — chegando inteiro')}
    </div>
    <p class="v4-signal-caption">${D.DIAGRAMA_LEGENDA}</p>`;
}

function resultado() {
  setGrain(0.025);
  shell.className = SHELL_RESULTADO;
  progressWrap.style.opacity = '0';

  const vilao = E.vilaoFinal(estado);
  const v = D.VARIACOES[vilao];
  const nome = escapeHtml(estado.nome || 'Você');
  const p4Id = estado.respostas['p4']?.[0] ?? 'p4-dor';
  const frag4 = D.FRAG_P4[p4Id];
  const p2Id = estado.respostas['p2']?.[0] ?? 'p2-varias';
  const p8Id = estado.respostas['p8']?.[0] ?? 'p8-paz';
  const p10Id = estado.respostas['p10']?.[0] ?? 'p10-segredo';
  const fragP3 = E.fragP3Sim2(estado, vilao, D.FRAG_P3_SIM2, D.FRAG_P3_FALLBACK);
  const primingLinha = estado.priming?.checagem && estado.priming.checagem !== 'Não'
    ? (estado.priming.tipo === 'cetica'
        ? D.PRIMING2_LINHA.cetica
        : estado.priming.checagem === 'Sim'
          ? D.PRIMING2_LINHA[estado.priming.tipo]
          : null)
    : null;

  const F = D.FECHO_3SIM;

  app.innerHTML = `
    ${sec(`
      <h1 class="font-display font-bold text-[2rem] leading-[1.15] tracking-tight text-balance">${D.RESULTADO_ABERTURA.titulo(nome)}</h1>
      <p class="text-[0.95rem] text-ash leading-relaxed mt-5">${D.RESULTADO_ABERTURA.dado}</p>
      <p class="text-[0.98rem] leading-relaxed mt-5">${D.RESULTADO_ABERTURA.barnumIntro} ${v.barnumL1} ${v.barnumL2} E ${D.FRAG_P2_BARNUM[p2Id].charAt(0).toLowerCase() + D.FRAG_P2_BARNUM[p2Id].slice(1)} ${v.coda}</p>
    `)}

    ${sec(`
      <div class="painel border-tide/60! relative overflow-hidden p-7 mt-2">
        <span class="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-tide to-tide"></span>
        <h2 class="font-display font-bold text-[1.55rem] leading-[1.25] text-balance">${nome}, seu Sinal Bloqueado é: <span class="text-tide">${v.nome}</span>.</h2>
        <p class="text-[0.93rem] leading-relaxed mt-4 text-ash">${v.mecanizacao(frag4.a)}</p>
      </div>
    `, 'mt-8')}

    ${sec(`
      <p class="text-[0.95rem] leading-relaxed">${v.metafora[0]}</p>
      <div class="my-8 h-32" id="payoff-wave">${prumoSvg('pw')}</div>
      <p class="font-display font-bold text-[1.65rem] leading-[1.3] text-balance text-center" id="payoff">${v.metafora[1].replace('Foi a sintonia.', '<span class="text-brass">Foi a sintonia.</span>')}</p>
      <p class="text-[0.95rem] leading-relaxed mt-5 text-ash text-center max-w-[42ch] mx-auto">${D.OPEN_LOOP}</p>
    `, 'mt-12')}

    ${sec(WIFI_HTML(), 'mt-10')}

    ${sec(diagramaHtml(v), 'mt-10')}

    ${sec(`
      <div class="painel p-6">
        <p class="eyebrow mb-2">${D.CARD_MOTIVACAO.titulo}</p>
        <p class="font-display font-semibold text-[1.15rem] leading-snug">"${E.citacaoMotivacao(estado)}"</p>
        <p class="text-ash text-[0.8rem] italic mt-2.5">${D.CARD_MOTIVACAO.rodape}</p>
      </div>
    `, 'mt-10')}

    ${primingLinha ? sec(`<p class="text-[0.93rem] leading-relaxed border-l-2 border-tide pl-4 text-ash">${primingLinha}</p>`, 'mt-10') : ''}

    ${sec(`
      <p class="text-[0.95rem] leading-relaxed">${D.FUTURE_PACING_INTRO} <b>${D.FRAG_P10[p10Id]}</b> — ${v.futurePacingFecho}</p>
    `, 'mt-10')}

    ${sec(`
      <p class="text-[0.95rem] leading-relaxed">${D.CAMADA34.intro}</p>
      <p class="text-[0.95rem] leading-relaxed mt-4">${D.CAMADA34.corpo}${vilao === 'TravamentoInterno' ? D.CAMADA34.extraV3 : ''} ${D.CAMADA34.fecho}</p>
    `, 'mt-10')}

    ${sec(`
      <p class="text-[0.93rem] leading-relaxed text-ash">${D.AUTORIDADE.corpo}</p>
      <button class="link-sutil mt-2 font-mono text-[0.7rem] tracking-wide" id="btn-fontes-r">${D.AUTORIDADE.fontesLabel}</button>
      <div id="fontes-r" class="hidden mt-3 border border-seam rounded-xl p-4 flex flex-col gap-3">
        ${D.REFORCO3.fontes.map((f) => `<p class="text-ash text-[0.78rem] leading-relaxed">${f}</p>`).join('')}
      </div>
      ${vilao === 'TravamentoInterno' ? `<p class="text-[0.93rem] leading-relaxed text-ash mt-3">${D.AUTORIDADE.extraV3}</p>` : ''}
    `, 'mt-10')}

    ${sec(`
      <p class="text-ash text-[0.9rem] leading-relaxed mb-3">${v.prova.intro}</p>
      <div class="painel p-6">
        <p class="text-[1.6rem] leading-none text-dust" aria-hidden="true">❝</p>
        <p class="italic text-[0.95rem] leading-relaxed mt-1">${v.prova.original}</p>
        <p class="text-ash text-[0.85rem] mt-2">Tradução livre: ${v.prova.traducao}</p>
        <p class="eyebrow mt-4 text-[0.6rem]!">${D.PROVA_TAG}</p>
      </div>
    `, 'mt-10')}

    <div class="mt-14 border-t border-seam pt-10" id="fecho">
      ${simHtml(1, F.sim1.pergunta(frag4.b), F.sim1.botao, F.sim1.objecao, F.sim1.objecaoBotao)}
      ${simHtml(2, F.sim2.pergunta(fragP3), F.sim2.botao, F.sim2.objecao, F.sim2.objecaoBotao)}
      ${simHtml(3, F.sim3.pergunta, F.sim3.botao, F.sim3.objecao, F.sim3.objecaoBotao)}
      <div class="sim hidden" data-sim="4">
        <p class="text-[1rem] leading-relaxed">${F.recap(D.FRAG_P8_RECAP[p8Id], frag4.c)}</p>
        <p class="text-ash text-[0.9rem] leading-relaxed mt-4 border-l-2 border-seam-hi pl-4">${F.candid}</p>
        <a href="${safeWebUrl(funnelConfig.checkoutUrl) || '/vsl'}" class="cta cta-verde w-full mt-7 no-underline" id="cta-final">${F.cta}</a>
        <p class="text-dust text-[0.75rem] leading-relaxed mt-3 text-center">${F.posClique}</p>
        <button class="link-sutil mt-5 block mx-auto" id="btn-reler">${F.saida}</button>
      </div>
    </div>

    <footer class="mt-16 pt-5 border-t border-seam">
      <p class="font-mono text-[0.65rem] text-dust leading-relaxed">Protocol 44 — protótipo interno. Baseado na análise de um corpus de relatos públicos (contagem em reconciliação, ver INDICE_GERAL); nada nesta página promete resultado individual. Não é terapia nem tratamento médico.</p>
    </footer>
  `;

  montarResultado();
}

function WIFI_HTML() {
  return D.WIFI_REVERSAL.map((p, i) => `<p class="text-[0.95rem] leading-relaxed ${i > 0 ? 'mt-4' : ''} ${i === 0 ? '' : 'text-ash'}">${p}</p>`).join('');
}

function simHtml(n: number, pergunta: string, botao: string, objecao: string, objecaoBotao: string) {
  return `
    <div class="sim ${n === 1 ? '' : 'hidden'} mb-10" data-sim="${n}">
      <p class="eyebrow mb-3">${n} de 3</p>
      <p class="text-[1.05rem] leading-relaxed">${pergunta}</p>
      <div class="flex items-center gap-5 mt-5">
        <button class="cta grow" data-sim-btn="${n}">${botao}</button>
        <button class="link-sutil shrink-0" data-sim-obj="${n}">Ainda não sei</button>
      </div>
      <div class="hidden mt-4 border border-seam rounded-xl p-4" data-sim-objbox="${n}">
        <p class="text-ash text-[0.9rem] leading-relaxed">${objecao}</p>
        <button class="cta mt-3" data-sim-btn2="${n}">${objecaoBotao}</button>
      </div>
    </div>`;
}

function montarResultado() {
  focusContent();
  // fontes expansíveis
  const fontesR = document.getElementById('fontes-r');
  document.getElementById('btn-fontes-r')?.addEventListener('click', () => {
    if (!fontesR) return;
    const aberto = !fontesR.classList.contains('hidden');
    if (aberto) fontesR.classList.add('hidden');
    else {
      fontesR.classList.remove('hidden');
      if (vivo()) gsap.fromTo(fontesR, { opacity: 0, y: -6 }, { opacity: 1, y: 0, duration: 0.35 });
    }
  });

  // 3-SIM: um por vez, com caminho real de saída em cada
  const mostrarSim = (n: number) => {
    const el = document.querySelector<HTMLElement>(`[data-sim="${n}"]`);
    if (!el) return;
    el.classList.remove('hidden');
    if (vivo()) gsap.fromTo(el, { opacity: 0, y: 14, filter: 'blur(4px)' }, { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.5 });
    el.scrollIntoView({ behavior: RM ? 'auto' : 'smooth', block: 'center' });
  };
  for (const n of [1, 2, 3]) {
    const avancarSim = () => mostrarSim(n + 1);
    document.querySelector(`[data-sim-btn="${n}"]`)?.addEventListener('click', avancarSim);
    document.querySelector(`[data-sim-btn2="${n}"]`)?.addEventListener('click', avancarSim);
    document.querySelector(`[data-sim-obj="${n}"]`)?.addEventListener('click', () => {
      const box = document.querySelector<HTMLElement>(`[data-sim-objbox="${n}"]`);
      box?.classList.remove('hidden');
      if (box && vivo()) gsap.fromTo(box, { opacity: 0 }, { opacity: 1, duration: 0.3 });
    });
  }
  document.getElementById('btn-reler')?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: RM ? 'auto' : 'smooth' }));

  ScrollTrigger.refresh();
}

/* ── Boot ── */

const salvo = E.restaurar();
if (salvo && salvo.passo > 0 && salvo.passo < FLUXO.length) {
  estado = salvo.estado;
  passo = salvo.passo;
}
atualizarProgresso();
render();
