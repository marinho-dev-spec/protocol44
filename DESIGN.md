---
name: Protocol 44
description: Fotografia cotidiana, papel quente, tinta e laranja vivo para uma prática concreta de reflexão.
colors:
  accent: "#ff4d17"
  accent-hover: "#ff6a3c"
  copper: "#b92c06"
  ink: "#171717"
  paper: "#faf8f4"
  cream: "#fffdf9"
  soft-paper: "#f0ece3"
  reading-ink: "#51493f"
  muted: "#5c625c"
  line: "#c5c1b7"
  sand: "#ddd6c9"
  option-border: "#cbbfb0"
  option-hover: "#fff0e7"
  accent-soft: "#ffe6d9"
  focus: "#a9422b"
typography:
  display:
    fontFamily: "Manrope, sans-serif"
    fontSize: "clamp(48px, 4.8vw, 68px)"
    fontWeight: 500
    lineHeight: 1.12
    letterSpacing: "-0.035em"
  headline:
    fontFamily: "Manrope, sans-serif"
    fontSize: "clamp(32px, 3.35vw, 48px)"
    fontWeight: 600
    lineHeight: 1.12
    letterSpacing: "-0.035em"
  quiz-title:
    fontFamily: "Manrope, sans-serif"
    fontSize: "32px"
    fontWeight: 550
    lineHeight: 1.24
    letterSpacing: "-0.025em"
  body:
    fontFamily: "Source Sans 3, sans-serif"
    fontSize: "19px"
    fontWeight: 400
    lineHeight: 1.5
  action:
    fontFamily: "Source Sans 3, sans-serif"
    fontSize: "19px"
    fontWeight: 600
    lineHeight: 1.3
  option:
    fontFamily: "Source Sans 3, sans-serif"
    fontSize: "19px"
    fontWeight: 400
    lineHeight: 1.35
  functional-label:
    fontFamily: "Source Sans 3, sans-serif"
    fontSize: "15px"
    fontWeight: 400
    lineHeight: 1.5
rounded:
  action: "6px"
  container: "12px"
  sheet: "0px"
spacing:
  gap-small: "12px"
  gap-medium: "16px"
  inset-small: "20px"
  inset-medium: "24px"
  inset-large: "28px"
  section: "40px"
components:
  button-primary:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.ink}"
    typography: "{typography.action}"
    rounded: "{rounded.action}"
    padding: "15px 23px"
  button-primary-hover:
    backgroundColor: "{colors.accent-hover}"
    textColor: "{colors.ink}"
  button-dark:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    typography: "{typography.action}"
    rounded: "{rounded.action}"
    padding: "15px 23px"
  link-subtle:
    textColor: "{colors.muted}"
    padding: "8px 0"
  option:
    backgroundColor: "{colors.cream}"
    textColor: "{colors.ink}"
    typography: "{typography.option}"
    rounded: "{rounded.container}"
    padding: "18px 20px"
  option-selected:
    backgroundColor: "{colors.accent-soft}"
    textColor: "{colors.ink}"
  focus-choice:
    backgroundColor: "{colors.cream}"
    textColor: "{colors.ink}"
    rounded: "{rounded.action}"
    padding: "14px 18px"
  textarea:
    backgroundColor: "{colors.cream}"
    textColor: "{colors.ink}"
    rounded: "{rounded.action}"
    padding: "14px 15px"
  workbook:
    backgroundColor: "{colors.soft-paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.sheet}"
    padding: "36px 38px"
  navigation:
    textColor: "{colors.ink}"
  progress:
    backgroundColor: "{colors.accent}"
    height: "4px"
  disclosure:
    textColor: "{colors.ink}"
---

# Design System: Protocol 44

## Overview

**Creative North Star: "Um lugar para voltar à prática"**

Descrição da implementação: papel quente, fotografia doméstica e espaço de escrita tornam a reflexão concreta. A tinta sustenta a leitura; o laranja vivo marca ações e progresso. Manrope dá expressão aos títulos e Source Sans 3 sustenta explicações e controles. O 44 serifado com quadrado central continua sendo a assinatura vetorial escolhida pelo titular.

A V5 amplia por código o mundo visual estabelecido; não existe comp aprovado de página. A referência de marca escolhida não equivale à aprovação de uma composição. A V4 literal permanece em sua rota legada. Este registro de 07/09/2026 descreve a implementação de `funnel-v5.css`, a base compartilhada de `funnel.css`, componentes e controllers atuais.

Os modos e percursos pertencem aos contratos de [home](.impeccable/surfaces/src-pages-index-astro.md), [quiz](.impeccable/surfaces/src-pages-quiz-astro.md), [VSL](.impeccable/surfaces/src-pages-vsl-astro.md) e [V4](.impeccable/surfaces/src-pages-quiz-v4-astro.md). O refinamento V5.1 segue [NATURAL-REFINEMENT.md](NATURAL-REFINEMENT.md), que sucede os tratamentos de intensidade da V5.

**Key Characteristics:**

- Marca vetorial serifada com quadrado central preservado.
- Papel, tinta e laranja vivo com acento escuro para texto.
- Fotografia cotidiana ilustrativa, títulos amplos e leitura confortável.
- Folhas retangulares, opções arredondadas e controles nativos.
- Movimento de execução única e feedback breve, dispensáveis à compreensão.

## Colors

### Primary

Laranja vivo (`accent`) preenche ações e progresso; `accent-hover` clareia o CTA. Cobre (`copper`) destaca partes dos títulos, perguntas de reflexão, links em hover, erros e contornos de seleção. `accent-soft` e `option-hover` diferenciam escolha e exploração.

### Neutral

Tinta (`ink`) sustenta texto e botões escuros. Papel, creme e papel de trabalho (`paper`, `cream`, `soft-paper`) distinguem página, campos e folhas. `reading-ink` e `muted` são tons de leitura secundária; `line`, `option-border` e `sand` servem a regras, contornos e trilho de progresso. O frontmatter contém os valores normativos, sem segunda família de acento.

**The Readable Accent Rule.** Use tinta sobre laranja vivo e cobre nas explicações pequenas sobre papel. Preserve foco em tinta nas seções laranja; a confirmação final registrou contraste de 5,40:1 para esse anel.

Rampas de oito passos no sidecar são sintéticas, para exploração no painel, e não tokens implementados. Aliases históricas como brass/tide/chalk/stone pertencem ao legado.

## Typography

Manrope e Source Sans 3 são locais, com fallback sans-serif, preload e `font-display: swap`. Faixas declaradas: 200–800 e 200–900. Não há terceira família para labels. O lettering serifado e condensado da marca é contorno SVG.

O frontmatter registra a base; o código usa ajustes por superfície, sem escala modular única. Títulos são balanceados com tracking negativo; parágrafos têm máximo global de 70ch. Leads geralmente usam 22 px/1,45; a introdução da home usa 24 px/1,4.

| Papel | Desktop | Até 760 px |
| --- | --- | --- |
| Home display | Frontmatter; 56 px entre 761–1100 px | clamp(40px,10.2vw,56px), entrelinha 1,12 |
| Abertura do quiz | clamp(38px,3.6vw,54px), 500/1,15 | clamp(34px,8.8vw,44px) |
| Pergunta / ponte | 32 px/1,24; ponte 38 px | 28 px; ponte 34 px |
| Resultado | clamp(40px,4.15vw,60px), 600/1,12 | 39 px |
| Título da VSL | clamp(44px,4.8vw,68px), 600/1,12 | 38 px |
| Corpo / opções | 19 px | 18 px |
| Ação | 19 px | Avanço do quiz e download 17 px; base 18 px até 360 px |
| Campo de escrita | 18 px/1,45; label 20 px | Campo permanece 18 px; label 19 px |

Seções da home usam títulos de 35–39 px no mobile; FAQ compartilhada, 36 px. Notas e indicadores ficam entre 14 e 17 px. Frases completas de `inside-title` são unidades de quebra em inline-block; “Return to it.” permanece unido.

**The Mark and Reading Rule.** Preserve a marca em vetor e use as famílias da interface para leitura. Não reconstrua o monograma digitando dois algarismos.

## Layout

Container de até 1280 px, largura `calc(100% - 112px)`; até 1100 px, margem total de 64 px; até 760 px, 40 px. Largura mínima de 320 px. Header de 108 px, reduzido a 82 px no mobile.

Home, abertura e resultado do quiz e prática usam colunas assimétricas, com gaps desktop de 76–110 px e empilhamento até 760 px. Perguntas ficam numa coluna de até 640 px e largura `calc(100% - 40px)`. Grandes seções usam aproximadamente 65–90 px de padding vertical no desktop e 39–55 px no mobile. Respostas têm gap de 11 px e ações abaixo.

A foto ilustrativa aparece somente na home, proporção 4/5 no desktop e 1,5 no mobile, sem sobreposição. O quiz mostra uma ficha HTML preenchida com exemplo fictício e ligação ao exercício. Sem filme configurado, a VSL mostra um aviso compacto; o player futuro mantém 16:9 e máximo de 920 px.

## Elevation & Depth

A estrutura é plana, com tonalidade, espaço e regras para agrupamento. A folha do exemplo usa contorno de 1 px, sem sombra ou rotação. Folhas de resultado e prática não têm sombra. A antiga folha com rotação de 1,5 grau e sombra `0 12px 32px #0003` ainda tem CSS herdado, mas não compõe a V5 atual.

**The Paper Surface Rule.** Exemplo, resultado e formulário usam fundo e contorno para agrupamento, sem sombra estrutural.

## Shapes

Ações e textareas: raio de 6 px. Opções e notas das pontes: 12 px. Folhas de exemplo, resultado e prática: retangulares. Foto da home: cantos de 12 px, ou 10 px no mobile. Regras e contornos geralmente têm 1 px.

Radio: aro de 22 px e ponto de 10 px. Setas são SVGs; o traço ornamental da fotografia foi retirado. FAQ: duas linhas CSS de 14 × 1,5 px, cruz fechada e traço horizontal aberto. Os pseudo-elementos herdam font-size para alinhar a geometria; a barra vertical é ocultada quando o details abre.

## Components

### Actions and navigation

CTA primário laranja/tinta, variante escura tinta/papel sobre laranja; mínimo de 58 px, raio e padding do frontmatter. Hover em 180 ms; botão escuro passa a `#35302a`. Em dispositivos com hover, a seta avança 4 px em 200 ms. Links secundários mantêm aparência textual e área usual de 44 px; disabled herdado usa opacidade 0,5.

Logo existente à esquerda e um destino textual à direita. Logo de 236 px, 191 px até 760 px e 162 px até 360 px; link em 17/15/14 px. Skip link aparece com foco. Não há menu expansível.

### Choices and writing

Opções V5 são radios nativos em labels dentro de fieldset/legend: mínimo de 68 px, ou 65 px no mobile. Seleção combina ponto, contorno e fundo. Hover muda fundo e contorno, sem deslocar a opção. A resposta é salva ao selecionar; avançar exige ação explícita. Ausência de resposta gera `role="alert"` e foco no primeiro radio.

Botões de foco do resultado usam `aria-pressed`, mínimo de 50 px, 17 px/1,4 e raio de 6 px; formam linha quebrável no desktop e pilha no mobile. Não há biblioteca separada de chips promocionais.

A prática usa três textareas rotuladas, limite de 1200 caracteres, resize vertical e mínimo de 102 px. Contorno `#a79783`, fundo creme e placeholder `#726453`. Folha com padding de 36 × 38 px, ou 26 × 22 px. Ao menos um campo precisa ter texto para baixar; mensagens usam `role="status"`. A escrita não é enviada ou persistida após recarregar; o download local é a forma de guardá-la.

Foco global: outline de 3 px, offset de 5 px. Radios transferem anel ao label, offset de 3 px; textarea usa offset de 4 px. Seções laranja substituem a variável de foco por tinta. Títulos/legends focados programaticamente não desenham anel; controles conservam foco visível.

### Example, disclosure and motion

Exemplo com três botões nativos agrupados, `aria-pressed`, `aria-controls` e painel nomeado; a pessoa controla a troca. Primeiro painel permanece legível sem JavaScript; trocas dependem do script. FAQ e exemplo completo da prática usam details/summary nativos.

Progresso V5 é `progress` nativo, máximo 10 e contagem textual; não há transição de largura. Navegar no quiz restaura o foco de leitura e volta ao topo. O quiz depende de JavaScript; noscript aponta para a prática escrita.

`page-motion.ts` usa Web Animations/IntersectionObserver: grupos em 320 ms; texto desloca 6 px. Exemplo recebe feedback de opacidade em 180 ms. Perguntas/pontes usam CSS em 200 ms, deslocamento de 4 px e sem blur. Easing: `cubic-bezier(.16,1,.3,1)`.

Observações são consumidas na primeira entrada. Conteúdo nasce visível e não depende de efeitos. Movimento reduzido remove animações/transições CSS e scroll suave; mudar a preferência cancela animações ativas. Não há scroll controlado nem parallax contínuo.

### Media, legacy and evidence

`public/brand/quiet-practice-v5.webp` é uma cena gerada fictícia, 1536 × 1024 px e 98.918 bytes, usada somente na home. O sidecar adjacente guarda prompt e data; o PNG de origem conserva prompt incorporado. A mulher não representa cliente; Maya é explicitamente fictícia. O handoff registra 11 rasters de distribuição e zero proveniências ausentes; este registro não executou outro scan.

Sem vídeo configurado, a VSL mostra aviso compacto de preparação e acesso à amostra escrita. A ramificação futura tem vídeo nativo, legendas/transcrição opcionais e erro. Hoje, filme, gravações e programa completo estão em preparação. A primeira unidade escrita existe; compra depende de configuração ainda indisponível.

`/quiz-v4` preserva fonte PT, resultado V2, gate local e diagrama de sinal; os estilos próprios estão no contrato legado. Checkout não integra esta atualização. As rotas mantêm noindex; o titular autorizou a publicação desta prévia no GitHub e na Vercel.

[VERIFICACAO-V5.json](.impeccable/review/natural/VERIFICACAO-V5.json) registra 13 checks, dez capturas, fontes/imagens carregadas e errors=[], cobrindo larguras de 320 a 1440 px. O [veredito final](.impeccable/review/v5/FINISH-VERDICT.md) registra ship restrito às três correções: foco sobre laranja, geometria da FAQ e título móvel. Isso não equivale a auditoria integral, eficácia comercial ou autorização de publicação.

## Do's and Don'ts

### Do:

- **Do** reutilizar os vetores serif44, preservando proporções e quadrado central.
- **Do** manter papel, tinta e laranja vivo, com cobre para texto e foco em tinta sobre laranja.
- **Do** preservar a hierarquia V5 e frases completas nas quebras móveis.
- **Do** usar controles nativos, seleção explícita, foco visível e retorno legível.
- **Do** manter fotografia e exemplo como ilustrações, com proveniência e disponibilidade declaradas.
- **Do** preservar a V4 no contrato e na rota legados.

### Don't:

- **Don't** reconstruir o monograma com texto ou substituir sua geometria por ornamentos.
- **Don't** promover aliases antigas, rampas sintéticas ou CSS sem uso a regras globais V5.
- **Don't** exigir animação para leitura ou acesso à prática.
- **Don't** apresentar reflexão como diagnóstico, cena fictícia como depoimento ou material em preparação como entregue.
- **Don't** converter o parecer visual em atestado de eficácia, conversão ou aprovação de publicação.
