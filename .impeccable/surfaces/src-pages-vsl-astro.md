---
version: 1
slug: "src-pages-vsl-astro"
primary_target: "src/pages/vsl.astro"
related_targets:
  - "src/components/FirstPractice.astro"
  - "src/components/BrandHeader.astro"
  - "src/components/BrandFooter.astro"
  - "src/lib/page-motion.ts"
  - "src/lib/quiz-v8.ts"
  - "src/lib/funnel-config.ts"
  - "src/content/funnel-content.json"
  - "src/styles/funnel.css"
  - "src/styles/funnel-v5.css"
  - "src/styles/signal-identity.css"
---

# Protocol 44 — VSL e prática 8.2

Mode: Persuade na apresentação, Operate na prática. Rota `/vsl`, EN/EUA. Registro de 08/09/2026. Amostra escrita utilizável e programa em preparação. Este contrato substitui a paleta e as fontes anteriores, conservando copy e comportamento 8.1.

## Direction contract

THESIS: Experimentar uma parte real: descrever um momento, distinguir interpretação e preparar uma ação possível.

OWN-WORLD: Studio White, Pacific Blue, Hyper Green e Ink Black; Montserrat e Plus Jakarta Sans locais. Serif44 preservado. Aplicação clara da identidade do RTF, descrita em docs/IDENTIDADE-8.2-PINTEREST.md, sem nova seleção ou comp aprovado. A página não repete a transição escura ou scanlines do quiz.

STORY: Introdução contextual quando há resultado válido → aviso compacto do filme e acesso à prática → contexto do exercício → três campos e exemplo fictício em disclosure → download pessoal → programa em preparação → FAQ.

FIRST VIEWPORT: Logo em tinta, título azul em caixa alta, introdução e acesso à prática sobre Studio White. Título com máximo 850 px, clamp(40px,4.2vw,60px), Montserrat 650/1,17 e tracking −0,025em; mobile 38 px. Padding 66/44 px, ou 38/34 px. Lead 21 px/1,55, mobile 19 px. Sem URL de filme, aviso compacto.

FORM: Campos de tarefa claros, exemplo em details/summary e download local. Colunas empilham até 760 px. Folha clara arredondada; CTA principal verde e convite secundário azul. Animação breve, dispensável à leitura.

FINISH: Capturas finais e finish-review.md em .impeccable/review/v8.2. O parecer apontou apenas documentação desatualizada. Este brief não executa nova revisão ou teste funcional.

## Type and layout

h2 em Montserrat 650, caixa alta, clamp(29px,2.7vw,39px)/1,2 e 30 px no mobile. Corpo base Plus Jakarta Sans 18/17 px; cada trecho conserva seu tamanho de leitura próprio.

Resultado V8 válido adapta a introdução e exibe pergunta correspondente ao tema. Prática com grade .85fr/1.15fr, gap 90 px, reduzido a 45 px até 1100 px; mobile em uma coluna com gap 30 px.

Folha em apoio claro, sem sombra, raio 12 px, padding 36 × 38 px, ou 26 × 22 px no mobile. h3 de Montserrat 600, 28/26 px, entrelinha 1,3 e tracking −0,02em. Labels de Plus Jakarta Sans 600, 20/19 px.

Textareas: limite 1200 caracteres, resize vertical, 18 px/1,45, mínimo 102 px, raio 6 px e padding 14 × 15 px. Borda e placeholder usam o tema; placeholder tem opacidade 1. Foco azul de 3 px/offset 4 px. Download: Hyper Green com Ink Black, raio 8 px; mobile em 17 px.

## Behavior and availability

Ao menos um campo permite baixar a reflexão. Formulário vazio informa role=status e foca o primeiro campo. Blob local produz Protocol-44-my-first-reflection.txt; campos abertos são indicados. Escrita não é enviada nem persistida após recarregar. Download depende de JavaScript.

Sem URL de filme, permanece aviso de preparação. A ramificação configurável usa vídeo nativo 16:9, legendas/transcrição quando fornecidas e estado de falha. O CTA de compra exige salesOpen e URL válida; atualmente, o convite azul/branco leva a /#inside.

A prática escrita está disponível; filme, gravações, programa completo, preço final, termos e matrícula permanecem em preparação. Exemplo fictício identificado, vendas fechadas e noindex. Publicação em DEPLOYMENT.md. /quiz-v4 e checkout conservam paleta/fontes legadas.
