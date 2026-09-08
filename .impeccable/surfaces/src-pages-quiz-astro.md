---
version: 1
slug: "src-pages-quiz-astro"
primary_target: "src/pages/quiz.astro"
related_targets:
  - "src/components/Quiz.astro"
  - "src/components/BrandHeader.astro"
  - "src/layouts/Funnel.astro"
  - "src/lib/quiz-v8.ts"
  - "src/lib/quiz-v8-controller.ts"
  - "src/lib/signal-art.ts"
  - "src/content/funnel-content.json"
  - "src/styles/funnel.css"
  - "src/styles/funnel-v5.css"
  - "src/styles/funnel-v8.css"
  - "src/styles/signal-identity.css"
---

# Protocol 44 — quiz visual 8.2 EN

Mode: Operate, com narrativa visual. Rota `/quiz`, EN/EUA. Registro de 08/09/2026. Motor e sessão V8, copy 8.1 e identidade 8.2. Este brief substitui cores, fontes e progressão visual anteriores; /quiz-v4 permanece documental.

## Direction contract

THESIS: Dar um próximo passo compreensível e revisável a partir das respostas, passando do sinal interrompido ao resultado claro.

OWN-WORLD: Direção explícita do RTF e referências Pinterest registradas em docs/IDENTIDADE-8.2-PINTEREST.md. Deep Void, CRT Gray, mint e crimson passam a Studio White, Pacific Blue, Hyper Green e Ink Black. Montserrat/Plus Jakarta Sans locais; serif44 preservado. Sem seed, nova seleção de identidade ou comp aprovado.

STORY: Abertura → dez perguntas e três reforços → atividade opcional após Q9 com Skip → resumo imediato → nome opcional → resultado calculado e revisão → prática escrita. Q3 múltipla, Q7 idade opcional, notas de consistência após Q5 e Q8. Dois eixos, três temas e fallback neutro permanecem.

FIRST VIEWPORT: Logo claro, título geométrico em caixa alta, contexto e CTA mint. Desktop: imagem óptica e sinal ao lado do texto; grade 1.1fr/.9fr, gap 80 px, ou 45 px até 1100 px. Mobile: texto e ação antes da imagem/sinal, uma coluna e gap 24 px. Avançar e Skip não aguardam animação.

FORM: Uma coluna de até 640 px para responder. Sinal compacto acima da contagem e progresso nativos; escolhas amplas, avanço explícito e voltar. O ruído diminui pela posição da tela no fluxo, sem ler a pontuação ou inferir melhora mental.

FINISH: Sete cenas desktop/mobile e seis capturas de viewport em .impeccable/review/v8.2/final. finish-review.md encontrou apenas persistência documental como correção material. Nenhuma nova execução funcional ou do detector faz parte deste registro.

## Stages and visual progress

`visualStage(screen)` define o tema; `visualProgress(screen)` é o índice da tela no fluxo sem engine_reveal, dividido por total de telas menos um. O controller atualiza body, --signal-clarity e theme-color a cada render.

| Estágio | Telas | Fundo e papéis |
| --- | --- | --- |
| noise | screen_0, Q1, Q2 e demais telas não listadas | Deep Void #0d0e11; conjunto dark-* de DESIGN.md. |
| focus | Q3, Q4, reinforcement_1, Q5, Q6, reinforcement_2 | #111a29 e conjunto focus-*. |
| settle | Q7, Q8, Q9, priming_2, reinforcement_3, Q10, loading, gate_name | #1b3049 e conjunto settle-*. |
| clear | result | Studio White #f8f9fa e conjunto claro. |

Os três temas escuros mantêm mint em ação/destaque/foco, Studio White no texto principal e pares próprios de texto secundário/contorno. No resultado, ações são verdes, destaque/foco azuis e texto Ink Black. Os azuis intermediários são interpolações implementadas. Revisar retorna a Q1; voltar e restaurar sessão recalculam tema e ruído pela tela.

Scanlines originais SVG cobrem o fundo com opacity calc(.03 * (1 - var(--signal-clarity))). Chegam a zero no resultado. Não são o progresso de respostas nem medem estado psicológico.

## Signal and opening materials

Abertura com raster óptico original `/brand/signal-glass-v8.2.webp`, 1536 × 1024. Prompt no JSON adjacente; referências Pinterest no contrato. Aqui a imagem é apoio decorativo com alt vazio: largura 100%, altura 190 px, object-fit cover, opacidade 0,9. Mobile: altura 145 px.

SVG principal com 17 linhas em viewBox 600 × 380, deslocado sobre a imagem por margem superior −25 px e máximo de 150 px de altura; mobile −20 px e máximo 90 px. O traço central mint tem 2 px; secundários CRT Gray, 0,8 px. Não há quadrado terminal laranja.

`signalArt(clarity,compact)` reduz o ruído e a separação das linhas. A interrupção central permanece abaixo de clareza 0,55; fragmentos crimson desaparecem a partir de 0,6. A opacidade secundária passa de 0,5 a 0,14. Esses limiares são composição, não faixas clínicas.

O sinal compacto usa sete linhas, viewBox 600 × 64, janela de 44 px e margem inferior 10 px; mobile 34 px e margem 4 px. Substitui a faixa recortada antiga. A barra nativa abaixo continua com 4 px, máximo 10 e contagem real de respostas.

Traço da abertura: uma execução de 1,8 s por montagem. Cursor mint da legenda: 6 × 14 px, duas pulsações de 1,2 s. Reduced-motion mantém o sinal completo e elimina a pulsação. O feixe da imagem do hero pertence à home, não é um efeito duplicado aqui.

## Type and controls

Abertura: Montserrat 650, caixa alta, clamp(34px,3.3vw,47px)/1,18, tracking −0,025em; mobile clamp(30px,7.8vw,40px). Lead 21 px/1,55, 19 px no mobile. Padding vertical 64/78 px, ou 34/42 px.

Pergunta: Montserrat 650, 29 px/1,28; mobile 25 px. Nota inline tem título de 20 px/1,35 em Plus Jakarta Sans, peso 650, caixa alta e tracking −0,025em, subordinado à pergunta. Texto da nota 17 px/1,5.

Opções: Plus Jakarta Sans 18/17 px, entrelinha 1,5, raio 10 px, mínimo 68 px, padding 17 × 20 px ou 16 px no mobile. Radio: aro 22 px, ponto 10 px; checkbox com cantos 4/1 px. Seleção combina fundo, contorno e indicador; foco chega ao label. Sem autoavanço.

Idade e nome: até 420 px, raio 6 px, padding 15 × 18 px, texto 21 px/1,4. Ambos opcionais. A atividade mantém controles nativos e escolhas de palavras aria-pressed. Erros escuros usam #ff809c; nenhum efeito de glitch prejudica o texto.

## Clear result

Campo Studio White, título Pacific Blue e CTA Hyper Green/Ink Black no início. Padding 54/75 px, ou 34/44 px no mobile. Desktop: leitura 1.15fr e resumo .85fr, gap 100 px; até 1100 px, gap 45 px e resumo sem sticky. Acima disso, resumo sticky a 24 px do topo.

Título principal: Montserrat 650, caixa alta, clamp(34px,3.1vw,45px)/1,16; mobile 31 px. h2 do resultado: 28 px/1,25, mobile 25 px, conservando a família própria do componente. Texto de seções: 20/19 px, entrelinha 1,6. Cabeçalho inclui sinal ilustrativo de 150 × 32 px, nome opcional, contexto e CTA.

Resumo: apoio claro, regra superior verde de 2 px, padding 28 × 30 px, sem borda externa. Mostra respostas de base, método em details, revisão e convite ao programa. Comparação de ondas em duas colunas no desktop e uma no mobile, com legenda de ilustração e sem eixo temporal.

No mobile: coluna flex com leitura primeiro, resumo de largura total e padding 24 px depois, fechamento por último. Resultado calculado não oferece o seletor direto de foco V5. Revisar retorna às perguntas.

## Behavior and limits

Sessão local versionada protocol44-quiz-v8, sem email ou envio. Falha de storage conserva uso em memória; limpar restaura abertura. Escrita da prática não é persistida. Ausência de resposta informa role=alert e foca o primeiro controle. Navegação retorna ao topo e foca título/legend.

Perguntas e reforços entram em 200 ms/4 px, eliminados com movimento reduzido. Sem JavaScript, noscript oferece a prática escrita. Ruído, sinal, comparação e Blocked Signal são metáforas visuais, não diagnóstico ou prova de eficácia.

Programa completo e filme em preparação, prática escrita disponível, vendas fechadas e noindex. V4 e checkout ficam fora desta extensão.
