---
name: Protocol 44
description: Sinal interrompido e material óptico no escuro, com leitura clara em azul e verde e a marca serif44 preservada.
colors:
  accent: "#05c46b"
  accent-hover: "#19d67d"
  copper: "#0052ff"
  blue-hover: "#003ec4"
  accent-soft: "#e1f4ec"
  focus: "#0052ff"
  ink: "#0f172a"
  paper: "#f8f9fa"
  cream: "#fff"
  soft-paper: "#edf2fa"
  reading-ink: "#46556d"
  muted: "#536078"
  line: "#bcc6d5"
  sand: "#d4ddeb"
  deep-void: "#0d0e11"
  dark-accent: "#00f0a8"
  dark-accent-hover: "#70ffd4"
  dark-accent-soft: "#123b32"
  dark-cream: "#171a21"
  dark-soft-paper: "#202530"
  dark-reading-ink: "#b9c0ce"
  dark-muted: "#a0a5b5"
  dark-line: "#535b6e"
  dark-sand: "#465062"
  dark-error: "#ff809c"
  glitch-crimson: "#ff2a54"
  focus-paper: "#111a29"
  focus-cream: "#1c293c"
  focus-soft-paper: "#263348"
  focus-line: "#63758b"
  focus-sand: "#51647d"
  focus-reading-ink: "#c3cddd"
  focus-muted: "#b2bfd2"
  settle-paper: "#1b3049"
  settle-cream: "#263e58"
  settle-soft-paper: "#304b66"
  settle-line: "#7b91a9"
  settle-sand: "#687f99"
  settle-reading-ink: "#dde6f1"
  settle-muted: "#c9d5e4"
  logo-orange: "#ff4d17"
typography:
  display:
    fontFamily: "Montserrat, sans-serif"
    fontSize: "clamp(43px, 4.1vw, 59px)"
    fontWeight: 650
    lineHeight: 1.1
    letterSpacing: "-0.025em"
  headline:
    fontFamily: "Montserrat, sans-serif"
    fontSize: "clamp(29px, 2.7vw, 39px)"
    fontWeight: 650
    lineHeight: 1.2
    letterSpacing: "-0.025em"
  quiz-title:
    fontFamily: "Montserrat, sans-serif"
    fontSize: "29px"
    fontWeight: 650
    lineHeight: 1.28
    letterSpacing: "-0.025em"
  body:
    fontFamily: "Plus Jakarta Sans, sans-serif"
    fontSize: "18px"
    fontWeight: 400
    lineHeight: 1.5
  action:
    fontFamily: "Plus Jakarta Sans, sans-serif"
    fontSize: "19px"
    fontWeight: 600
    lineHeight: 1.3
  option:
    fontFamily: "Plus Jakarta Sans, sans-serif"
    fontSize: "18px"
    fontWeight: 400
    lineHeight: 1.5
  input:
    fontFamily: "Plus Jakarta Sans, sans-serif"
    fontSize: "21px"
    fontWeight: 400
    lineHeight: 1.4
  functional-label:
    fontFamily: "Plus Jakarta Sans, sans-serif"
    fontSize: "15px"
    fontWeight: 400
    lineHeight: 1.5
rounded:
  field: "6px"
  action: "8px"
  option: "10px"
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
    backgroundColor: "{colors.copper}"
    textColor: "{colors.cream}"
    typography: "{typography.action}"
    rounded: "{rounded.field}"
    padding: "15px 23px"
  button-dark-hover:
    backgroundColor: "{colors.blue-hover}"
    textColor: "{colors.cream}"
  link-subtle:
    textColor: "{colors.muted}"
    padding: "8px 0"
  option:
    backgroundColor: "{colors.cream}"
    textColor: "{colors.ink}"
    typography: "{typography.option}"
    rounded: "{rounded.option}"
    padding: "17px 20px"
  option-hover:
    backgroundColor: "{colors.soft-paper}"
  option-selected:
    backgroundColor: "{colors.accent-soft}"
    textColor: "{colors.ink}"
  word-choice:
    backgroundColor: "{colors.cream}"
    textColor: "{colors.ink}"
    rounded: "{rounded.field}"
    padding: "11px 20px"
  optional-input:
    backgroundColor: "{colors.cream}"
    textColor: "{colors.ink}"
    typography: "{typography.input}"
    rounded: "{rounded.field}"
    padding: "15px 18px"
  textarea:
    backgroundColor: "{colors.cream}"
    textColor: "{colors.ink}"
    rounded: "{rounded.field}"
    padding: "14px 15px"
  workbook:
    backgroundColor: "{colors.soft-paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.container}"
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

**Creative North Star: "Do sinal interrompido ao estúdio claro"**

A identidade construída apresenta material óptico, sinal interrompido e campo escuro, seguido por superfícies claras de leitura com azul e verde. Montserrat dá forma geométrica aos títulos, principalmente em caixa alta; Plus Jakarta Sans sustenta leitura e controles. A logo serif44 mantém sua geometria e seu pequeno acento laranja, separado da paleta funcional.

Este registro de 08/09/2026 descreve a 8.2 e substitui as prescrições visuais V5–8.1 para home, quiz e VSL. O titular rejeitou a adaptação laranja da 8.1 e pediu fidelidade ao RTF e referências de imagem no Pinterest. A descrição acima sintetiza essa direção fixada; não houve nova seleção criativa, seed aleatória ou comp aprovado. A copy e o funcionamento 8.1 permanecem.

A autoridade é a cascata de `funnel.css`, `funnel-v5.css`, `funnel-v8.css` no quiz e, por último, `signal-identity.css`, junto dos componentes atuais. O [contrato 8.2](docs/IDENTIDADE-8.2-PINTEREST.md) registra o briefing, as referências observadas e a proveniência. As composições pertencem aos briefs de [home](.impeccable/surfaces/src-pages-index-astro.md), [quiz](.impeccable/surfaces/src-pages-quiz-astro.md) e [VSL/prática](.impeccable/surfaces/src-pages-vsl-astro.md). A [V4 documental](.impeccable/surfaces/src-pages-quiz-v4-astro.md) e o checkout permanecem legados.

**Key Characteristics:**

- Marca serif44 preservada; laranja restrito à marca e ao legado.
- Deep Void e CRT Gray com mint nas ações e crimson nas interrupções.
- Studio White, Pacific Blue, Hyper Green e Ink Black para leitura clara.
- Montserrat geométrica em títulos e Plus Jakarta Sans em leitura e controles.
- Imagem óptica original, scanlines leves e sinal SVG ligados à navegação.
- Superfícies planas, controles estáveis e efeitos finitos dispensáveis à compreensão.

## Colors

A paleta muda por conjunto semântico. Os valores normativos estão no frontmatter; a associação de cada conjunto às telas está no brief do quiz. Os azuis intermediários são interpolações implementadas, registradas como tais.

### Primary

No campo claro, Hyper Green (`accent`) preenche ações e progresso; `accent-hover` é sua resposta de hover. Core Pacific Blue (`copper`) destaca títulos, links, seleção e foco, além de preencher a ação secundária. `blue-hover` escurece essa ação.

No escuro, Phosphor Mint (`dark-accent`) reúne ação, destaque de leitura e foco. Seu hover usa `dark-accent-hover`; a seleção usa `dark-accent-soft`. O nome CSS histórico `copper` continua no código como papel de destaque; seu valor atual é azul no claro e mint no escuro, sem significado de cobre ou laranja.

### Secondary

Glitch Crimson (`glitch-crimson`) marca fragmentos de interrupção na arte de sinal. O rosa claro `dark-error` dá legibilidade às mensagens de erro sobre fundo escuro. Esses papéis não substituem a ação mint/verde.

### Neutral

Studio White (`paper`), branco de campo (`cream`) e apoio claro (`soft-paper`) distinguem página, entrada e agrupamento. Ink Black (`ink`), leitura secundária e texto auxiliar (`reading-ink`, `muted`) sustentam a leitura. Divisórias (`line`) e trilho (`sand`) usam neutros azulados.

Deep Void (`deep-void`) inicia o conjunto escuro. CRT Gray (`dark-muted`) é texto auxiliar e traço secundário da arte. As variantes `focus-*` e `settle-*` mudam fundo, campo, apoio, linha, trilho e leitura em conjunto. O texto principal dos três temas escuros usa Studio White.

O token `logo-orange` documenta somente o ativo de marca existente. Ele não é a cor de CTA, progresso, foco ou sinal da interface atual.

**The Semantic Contrast Rule.** Troque fundo, texto, campo, contorno, seleção e foco em conjunto. Preserve Ink Black sobre ações mint/verde e branco sobre a ação azul.

Rampas do sidecar são visualizações sintéticas do painel, sem status de tokens implementados ou novas cores aprovadas. A paleta quente, o cobre laranja e os antigos aliases de tema permanecem históricos.

## Typography

**Display Font:** Montserrat, com fallback sans-serif.
**Body Font:** Plus Jakarta Sans, com fallback sans-serif.

As fontes são locais, com preload, `font-display: swap` e licenças OFL no projeto. Montserrat declara pesos 100–900; Plus Jakarta Sans, 200–800. O layout seleciona essas fontes nas superfícies atuais e conserva Manrope/Source Sans 3 no legado. A marca serifada é contorno SVG, não uma terceira família de leitura.

Títulos h1, h2 e legends das perguntas usam caixa alta, peso 650 e tracking −0,025em. Títulos h3/h4 conservam caixa do conteúdo, tracking −0,02em e entrelinha 1,3. Algumas labels e h2 funcionais mantêm a família de corpo definida por seu componente; não transformar toda informação auxiliar em display.

- **Display:** faixa extraída da home, até 59 px e entrelinha 1,1.
- **Headline:** títulos de seção em clamp(29px,2.7vw,39px)/1,2; mobile 30 px.
- **Question:** Montserrat 650, 29 px/1,28; mobile 25 px.
- **Body / option:** base 18 px/1,5; mobile 17 px/1,5. Parágrafos têm máximo global de 70ch.
- **Lead:** 21 px/1,55; mobile 19 px, com o texto de abertura da home preservado em 21 px/1,5.
- **Action:** Plus Jakarta Sans 600, 19 px/1,3; avanço do quiz e download usam 17 px no mobile.
- **Input:** idade e nome em 21 px/1,4; escrita longa em 18 px/1,45.
- **Functional label:** contagem e metadados entre 14 e 17 px; notas inline têm título subordinado de 20 px/1,35.

Os tamanhos próprios da introdução, resultado e VSL estão nos briefs. O frontmatter descreve a hierarquia real, sem impor escala modular única.

**The Mark and Reading Rule.** Preserve a marca em vetor e use Montserrat/Plus Jakarta Sans para a interface atual. Não reconstrua o monograma digitando dois algarismos.

## Layout

Container máximo de 1280 px, largura `calc(100% - 112px)`; até 1100 px, margem total de 64 px; até 760 px, 40 px. Largura mínima de 320 px. Header de 108 px, reduzido a 82 px no mobile.

Grades assimétricas aproximam texto e apoio visual, passando a uma coluna até 760 px. Fluxos de perguntas têm até 640 px e largura `calc(100% - 40px)`. A ordem móvel mantém conteúdo e ação antes do apoio visual. Texto longo fica sobre campo claro, com resumo lateral nas larguras que o comportam.

Intervalos e insets recorrentes estão no frontmatter. Opções têm gap de 11 px. A arte compacta fica separada da contagem real e da barra de respostas; sua dimensão e cada composição estão nos briefs.

## Elevation & Depth

Containers são planos: tonalidade, espaço e regras criam agrupamento. Exemplo, resultado e prática não usam sombra estrutural ou rotação. A profundidade óptica pertence ao raster original; não é uma sombra de container ou uma textura física simulada por CSS.

**The Flat Container Rule.** Agrupe leitura e escrita com fundo, contorno e espaço. Preserve a profundidade da imagem óptica como material da imagem, sem convertê-la em elevação de todos os componentes.

A folha inclinada, sombras herdadas e os antigos fundos quentes não fazem parte das composições 8.2. Scanlines e feixe de varredura são materiais de sinal explícitos do briefing, não texturas genéricas para espalhar pelo site.

## Shapes

Ações primárias têm raio de 8 px. A ação secundária azul, campos e escolhas de palavras mantêm 6 px. Opções têm 10 px. Notas inline e a folha de prática usam 12 px. Exemplo e resumo de respostas mantêm forma retangular. O raster óptico não recebe raio de container; a fotografia contextual tem raio de 8 px.

Contornos geralmente têm 1 px. Radio usa aro de 22 px e ponto de 10 px; checkbox mantém essas dimensões, com raio externo de 4 px e interno de 1 px. Setas são SVG. FAQ usa duas linhas CSS de 14 × 1,5 px: cruz fechada e linha horizontal aberta.

O sinal é geometria de linhas interrompidas e depois organizadas. Ele não termina no quadrado laranja da versão anterior e não redesenha o monograma da marca.

## Components

### Buttons

Ação principal mint no escuro e Hyper Green no claro, sempre com Ink Black, mínimo de 58 px, raio e padding do frontmatter. A variante de classe histórica `button-dark` agora é azul/branco e mantém raio de 6 px. Hover muda cor em 180 ms. Em dispositivos com hover, a seta avança 4 px em 200 ms. Disabled usa opacidade 0,5.

Ações textuais têm sublinhado, mínimo de 44 px, texto de 16 px e padding de 8 px vertical; hover usa o destaque do tema. Voltar tem mínimo de 48 px. O estado ativo persistente só existe onde há seleção; não foi inventado um novo efeito pressionado.

### Choices and fields

Radio e checkbox nativos ficam em labels dentro de fieldset/legend. Opções têm mínimo de 68 px inclusive no mobile, padding de 17 × 20 px ou 16 px no mobile, texto de 18/17 px e entrelinha 1,5. Seleção combina indicador, contorno e fundo. Hover usa o apoio e o destaque do tema, sem deslocamento.

Escolhas de palavras da atividade opcional usam `aria-pressed`, raio de 6 px, mínimo de 46 px e texto de 18 px/1,4. Não são o seletor direto de foco V5.

Idade e nome têm campos de até 420 px, raio de 6 px e padding de 15 × 18 px. Borda e caret usam papéis semânticos; erro de campo destaca o contorno. Mensagens de erro usam azul no claro e `dark-error` no escuro. Placeholders usam o texto auxiliar do tema com opacidade 1.

A prática tem textareas de no mínimo 102 px, limite de 1200 caracteres, resize vertical, padding de 14 × 15 px e raio de 6 px. Foco global: outline de 3 px e offset de 5 px; opções transferem o anel ao label com offset de 3 px; textarea usa 4 px. Exemplo e continuação preservam foco em tinta. Títulos/legends focados programaticamente não desenham anel; controles mantêm foco visível.

### Containers and disclosure

Folha de prática: apoio claro, raio 12 px e padding 36 × 38 px, ou 26 × 22 px no mobile. Exemplo interativo: campo branco retangular, contorno de 1 px e botões nativos, com sublinhado azul no selecionado. Notas inline: apoio do tema, raio 12 px, padding 20 × 22 px e título de 20 px subordinado à pergunta.

Resumo de respostas: apoio claro, regra superior verde e composição descrita no brief do resultado. FAQ e exemplo completo usam `details/summary`. Botões do exemplo usam `aria-pressed`, `aria-controls` e painel nomeado; a troca é controlada pela pessoa. Primeiro painel e disclosures permanecem legíveis sem script.

### Navigation and brand

Logo à esquerda e um destino textual à direita. O arquivo de contraste claro aparece no fundo escuro; o arquivo em tinta aparece sobre Studio White. A geometria serif44 e o laranja incorporado aos ativos permanecem como escolhidos pelo titular.

Logo com largura de 236 px, 191 px até 760 px e 162 px até 360 px; link em 17/15/14 px e alvo de 44 px. Skip link aparece com foco. Não há menu expansível.

### Signal, progress and motion

A imagem óptica original e o SVG de sinal cumprem papéis distintos. A imagem mantém luz/material; o SVG representa visualmente interrupção e organização. Scanlines originais começam em 3% de opacidade e desaparecem conforme a navegação do quiz. O progresso visual segue a posição da tela no fluxo, nunca as respostas ou a pontuação.

O `progress` nativo tem altura de 4 px, máximo 10 e contagem textual de respostas. Acima dele há um sinal compacto, sem a antiga faixa recortada 8.1. Voltar, revisar ou restaurar sessão restaura os estados visuais correspondentes.

O traço da abertura é revelado em 1,8 s; o feixe sobre a imagem do hero percorre a arte uma vez em 2,1 s; o cursor da legenda pulsa duas vezes em ciclos de 1,2 s. Perguntas e reforços entram em 200 ms com deslocamento de 4 px. Grupos de página usam opacidade por 320 ms uma vez por observação, e a troca do exemplo usa 180 ms. Easing compartilhado: `cubic-bezier(.16,1,.3,1)`; cursor usa ease-in-out.

Conteúdo nasce visível e ações não aguardam efeitos. Movimento reduzido elimina animações/transições, retira o feixe e mantém o sinal completo; mudar a preferência cancela Web Animations ativas. O detalhe da progressão e dos limiares do SVG está no brief do quiz.

### Scope and provenance

As imagens usadas são originais gerados com proveniência no projeto. Os pins foram referências visuais, não arquivos baixados e publicados como próprios. A imagem óptica aparece nas aberturas e a fotografia humana ilustrativa foi movida para o exemplo cotidiano. Fonte, recortes e legendas pertencem aos briefs.

A 8.2 se aplica a `/`, `/quiz` e `/vsl`, identificados por `data-surface`. A V4 e o checkout conservam paleta, fontes e componentes históricos; laranja e Manrope/Source Sans nesses escopos não autorizam seu retorno à interface atual.

O [contrato 8.2](docs/IDENTIDADE-8.2-PINTEREST.md), as [capturas finais](.impeccable/review/v8.2/final) e a [revisão independente](.impeccable/review/v8.2/finish-review.md) sustentam o registro. A revisão encontrou somente documentação desatualizada como correção material. Este trabalho atualiza a persistência, sem nova execução de testes, detector, revisão visual ou aprovação comercial.

## Do's and Don'ts

### Do:

- **Do** preservar a geometria serif44 e restringir o laranja ao ativo de marca e ao legado.
- **Do** trocar o conjunto semântico completo entre Deep Void, intermediários e Studio White.
- **Do** usar mint/verde com Ink Black nas ações principais e azul/branco na ação secundária.
- **Do** preservar Montserrat e Plus Jakarta Sans e a escala subordinada dos títulos auxiliares.
- **Do** manter a imagem óptica original visível e a fotografia contextual identificada como ilustrativa.
- **Do** vincular ruído e clareza à navegação, com volta e retomada consistentes.
- **Do** usar controles nativos, seleção explícita, foco visível e movimento dispensável.
- **Do** preservar V4 e checkout nos seus escopos legados.

### Don't:

- **Don't** restaurar laranja funcional, papel quente ou as fontes V5–8.1 nas superfícies atuais.
- **Don't** reconstruir o monograma com texto ou substituir sua geometria por um novo símbolo.
- **Don't** tratar pins de referência como imagens incorporadas ou fotografias ilustrativas como depoimentos.
- **Don't** promover rampas sintéticas, CSS sem uso ou valores do legado a tokens 8.2.
- **Don't** aplicar a transição escuro/claro a toda página ou apresentá-la como medida psicológica.
- **Don't** exigir animação para leitura, navegação ou acesso à prática.
- **Don't** apresentar reflexão como diagnóstico ou material em preparação como entregue.
- **Don't** converter revisão visual em prova de eficácia, conversão ou aprovação de publicação.
