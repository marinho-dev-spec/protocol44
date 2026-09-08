# Identidade 8.2 — aplicação fiel do briefing

Atualizado em 8 de setembro de 2026. Esta decisão substitui a adaptação visual laranja da 8.1; a copy e o funcionamento da 8.1 permanecem.

## Autoridade e público

O titular pediu: “Use a risca a ideia de idvisual - que ele enviou”, “pesqui no pintrest e pegue referencias imagens para usar no site”, “correspondente com nosso publico alvo” e “conforme indicado na id visual”. A preferência confirmada foi começar escuro e revelar um resultado claro, com menos ruído. Fonte: `../../IDENTIDADE VISUAL.rtf`, extraída em `../../.work/partner-2026-09-08/identidade-visual.txt`.

O público de trabalho são adultos de língua inglesa, com foco inicial no Canadá/EUA, familiarizados com desenvolvimento pessoal, manifestação ou hipnose e que se sentem travados. A comunicação atual se concentra em decisões sobre dinheiro e trabalho. Essa descrição orienta a criação; não constitui validação de preferência visual ou conversão no mercado canadense.

A logo 44 escolhida pelo titular tem prioridade sobre as sugestões de redesenhar o símbolo no RTF. O pequeno acento laranja permanece na marca. A interface adota a última paleta explícita do documento.

## Paleta e sequência implementadas

| Etapa | Aplicação |
| --- | --- |
| Abertura, Q1 e Q2 | Deep Void `#0D0E11`, CRT Gray `#A0A5B5`, Glitch Crimson `#FF2A54` nas interrupções, Phosphor Mint `#00F0A8` nas ações e sinal |
| Q3 a Q6 e seus reforços | Azul escuro `#111A29`, menos ruído, mesma ação mint |
| Q7 em diante até o resultado | Azul `#1B3049`, sinal quase limpo, desaparecimento dos fragmentos vermelhos |
| Resultado, corpo da oferta e prática | Studio White `#F8F9FA`, Core Pacific Blue `#0052FF`, Hyper Green `#05C46B`, Ink Black `#0F172A` |

Os dois azuis intermediários são interpolações de implementação. Títulos em Montserrat, principalmente em caixa alta; leitura e controles em Plus Jakarta Sans. Fontes hospedadas no projeto, com licenças OFL. Azul em textos de destaque sobre fundo claro; verde em preenchimento de CTA com texto escuro.

Scanlines originais em SVG, com opacidade inicial de 3%. A opacidade acompanha o avanço da tela até zero no resultado. O sinal SVG contém uma interrupção central e fragmentos crimson; a linha se organiza com a navegação. Voltar restaura o estágio daquela tela. A metáfora não mede estado mental, efeito do produto, nem a pontuação do quiz.

Um feixe passa pela arte da abertura uma vez; o cursor luminoso pulsa suavemente duas vezes. Movimento reduzido desativa esses efeitos. Botões, textos e respostas permanecem legíveis e estáveis.

## Pesquisa real no Pinterest

Consultas na interface autenticada do Pinterest: “Biohacking brand identity”, “Tech forward wellness branding” e “CRT signal glitch graphic design”. Pins inspecionados em 8 de setembro de 2026:

| Referência | Observação visual | Aplicação própria |
| --- | --- | --- |
| [Guillaume Chapuis](https://br.pinterest.com/pin/88383211433939356/) | Macro de material orgânico translúcido verde; origem indicada: perfil do autor no Instagram | Material óptico da imagem original, sem reproduzir a marca ou a composição do pin |
| [CRT TV Textures](https://br.pinterest.com/pin/168885054774265861/) | Traço luminoso interrompido sobre preto e textura de varredura | Linhas de sinal e scanlines leves, desenhadas no projeto |
| [LUNORA — Sleep-Tech / Wellness](https://in.pinterest.com/pin/824862488037346554/) | Contraste entre superfícies escuras e claras, azul e geometria na apresentação da marca | Continuidade de identidade entre entrada escura e leitura clara; [origem no Behance](https://www.behance.net/gallery/228385095/LUNORA-%28Sleep-TechWellness-Brand-Identity%29) |
| [EVOLVE](https://br.pinterest.com/pin/351912466540157/) | Presença humana e composição contemplativa combinadas a linhas geométricas | Fotografia humana junto a um exemplo cotidiano de escrita, sem alegação de depoimento |

Os pins são referências, não arquivos licenciados incorporados ao site. A imagem de vidro e sinal foi gerada originalmente com a ferramenta integrada `image_gen`. A fotografia ilustrativa existente foi reposicionada para o exemplo da oferta.

## Arquivos visuais

- `public/brand/signal-glass-v8.2.webp`: imagem original usada no hero e na abertura do quiz, 1536 × 1024, aproximadamente 78 KB. Prompt exato em `public/brand/signal-glass-v8.2.webp.json`.
- Original PNG preservado em `../../03-MARCA/signal-glass-v8.2.png`.
- `public/brand/quiet-practice-v5.webp`: cena fictícia de escrita em ambiente doméstico, identificada como ilustrativa; prompt existente preservado.
- `public/brand/scanlines.svg` e `src/lib/signal-art.ts`: geometria original, decorativa.

## Contrato de composição e revisão

Implementação guiada por código dentro do briefing explícito, sem comp aprovado ou sorteio de uma identidade nova. Home: promessa à esquerda, imagem de sinal à direita no desktop; primeira ação antes da imagem no celular. Quiz: conteúdo com foco único, opções nativas e sinal compacto acima do progresso verdadeiro. Resultado: título azul, ação verde, leitura clara e respostas revisáveis. Prática: formulário legível e download funcional.

Referência de qualidade: manter a integridade dos materiais ópticos e a coerência de paleta vistas nos pins, com prioridade para leitura e navegação. A estética do documento orienta o trabalho; não autoriza diagnósticos, garantias de renda, falsas taxas de sucesso ou prova social inventada.

Escopo: `/`, `/quiz`, `/vsl`. A V4 e o checkout histórico permanecem fora desta atualização. VSL em vídeo e programa completo continuam em preparação; a amostra escrita está disponível.

## Verificação local

Build Astro e 62 testes de lógica passaram. Os 13 grupos do teste de navegador passaram, incluindo todos os resultados, revisão, retomada, opções neutras, idade/nome opcionais, prática, download, privacidade, ausência de armazenamento e JavaScript desativado. Capturas desktop 1440 px e celular 390 px cobrem sete cenas em cada tamanho, sem overflow horizontal. Evidências em `.impeccable/review/v8.2/`.

A revisão visual corrigiu a proporção da fotografia no exemplo e reduziu os títulos auxiliares para que não competissem com as perguntas. A revisão independente inspecionou as 20 capturas e não solicitou correções visuais ou de copy. A única correção material foi atualizar DESIGN.md; o revisor a classificou como resolvida no parecer final, com disposição `ship` nesse escopo. A publicação é registrada em DEPLOYMENT.md.
