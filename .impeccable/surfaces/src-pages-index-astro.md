---
version: 1
slug: "src-pages-index-astro"
primary_target: "src/pages/index.astro"
related_targets:
  - "src/components/SignalVisual.astro"
  - "src/components/BrandHeader.astro"
  - "src/components/BrandFooter.astro"
  - "src/lib/page-motion.ts"
  - "src/content/funnel-content.json"
  - "src/styles/funnel.css"
  - "src/styles/funnel-v5.css"
  - "src/styles/signal-identity.css"
---

# Protocol 44 — institucional 8.2

Mode: Persuade. Rota `/`, EN/EUA. Registro de 08/09/2026. A visita compreende o programa planejado e encontra o quiz ou a prática escrita. A identidade 8.2 substitui a adaptação laranja 8.1; copy e comportamento continuam.

## Direction contract

THESIS: Apresentar uma decisão concreta sobre dinheiro ou trabalho, usando a metáfora de sinal interrompido e um próximo passo utilizável.

OWN-WORLD: Aplicação do RTF e das referências observadas no Pinterest, conforme docs/IDENTIDADE-8.2-PINTEREST.md. Deep Void, CRT Gray, mint e crimson na abertura; Studio White, azul e verde na leitura. Montserrat e Plus Jakarta Sans locais. Serif44 preservado, laranja somente na marca. Implementação por código de direção explícita, sem seed ou comp aprovado.

STORY: Promessa, contexto e disponibilidade → reconhecimento cotidiano → três fases planejadas → exemplo fictício com fotografia ilustrativa → adequação → FAQ → convite ao quiz. A amostra escrita tem acesso direto.

FIRST VIEWPORT: Header e abertura escuros. Logo de contraste claro, título em caixa alta, explicação, status e CTA mint antes da imagem no celular. Desktop: texto à esquerda e material óptico à direita, grade 1.15fr/.85fr, gap 72 px; até 1100 px, gap 40 px. Mobile: uma coluna, gap 36 px. Padding vertical 56/72 px, ou 38/42 px no mobile.

FORM: Raster óptico original em SignalVisual; scanlines SVG em 3% e feixe finito sobre a imagem. Corpo da página claro, títulos azuis e ação verde. Exemplo controlado por três botões nativos; fotografia humana contextual, com legenda explícita de ilustração.

FINISH: .impeccable/review/v8.2/final e finish-review.md registram as capturas e a revisão independente. A única correção material foi a documentação desatualizada. Este brief registra o estado final, sem nova execução da revisão.

## Built composition

Título da abertura: Montserrat 650, caixa alta, clamp(43px,4.1vw,59px)/1,1, tracking −0,025em. Até 1100 px: 43 px. Até 760 px: clamp(31px,8.1vw,46px). Introdução 21 px/1,5, máximo 39ch; descrição máximo 48ch. Corpo base 18 px, 17 px no mobile.

Títulos h2 de seção: Montserrat 650 em caixa alta, clamp(29px,2.7vw,39px)/1,2, 30 px no mobile. Azul nos h2 das seções claras. Reconhecimento usa 85 px verticais, 44 px no mobile; fechamento 76/88 px, ou 42/54 px. As demais grades se empilham até 760 px.

Raster óptico `public/brand/signal-glass-v8.2.webp`, 1536 × 1024, aproximadamente 78 KB. Recorte 1,2 no desktop e 1,65 no mobile, object-fit cover, width 100%, height auto, sem raio de container. Legenda de 15/14 px abaixo de regra de 1 px. Material original gerado com image_gen, prompt no JSON adjacente e PNG original em ../../03-MARCA/signal-glass-v8.2.png.

O feixe percorre a imagem uma vez em 2,1 s; sua posição final fica fora do quadro. Scanlines decorativas começam em 3%, somente na abertura. Reduced-motion elimina o feixe. Sem espera para clicar ou ler.

## Contextual photograph and example

`public/brand/quiet-practice-v5.webp` foi removida do hero e aparece junto ao exemplo, com loading lazy. É uma cena gerada fictícia, identificada pela legenda “Illustrative image.”; proveniência adjacente preservada.

Figura com máximo de 480 px e margem superior 28 px. Imagem width 100%, height auto, proporção 2, object-fit cover, posição 40% 55% e raio 8 px. A altura automática é parte da correção final da proporção. Legenda 14 px/1,5, margem superior 10 px.

O exemplo usa apoio claro, folha branca retangular e CTA secundário azul/branco de raio 6 px. Os três passos são controlados pela pessoa, com seleção azul explícita. Primeiro painel e FAQ nativa continuam legíveis sem script; troca de painel depende de JavaScript.

## References and limits

As referências de material óptico, CRT, LUNORA e EVOLVE foram inspecionadas no Pinterest e registradas no contrato 8.2. Seus arquivos não foram incorporados ao site. A fotografia não representa cliente; a narrativa é fictícia.

Header e CTA principal levam a /quiz; exemplo leva a /vsl#first-practice. Programa completo, gravações e filme seguem em preparação; prática escrita disponível, vendas fechadas e noindex. Publicação fica em DEPLOYMENT.md. /quiz-v4 e checkout conservam o legado.
