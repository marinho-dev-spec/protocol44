# Protocol 44 — direção visual Canadá / Muse

Pedido: melhorar o site para o público canadense. Em 08/09/2026, o usuário escolheu explicitamente https://choosemuse.com/ como referência de estilo.

## Pesquisa e limites

- [Muse](https://choosemuse.com/): apresentação imersiva, fotografia em grande escala, superfícies escuras, espaço e demonstração do uso. Empresa InteraXon com endereço em Toronto. Adaptação: mostrar a reflexão escrita, sem importar aparelho, EEG, métricas, alegações clínicas ou depoimentos do Muse.
- [Wealthsimple Canadá](https://www.wealthsimple.com/en-ca): tipografia legível, hierarquia concisa, ambiente residencial fotografado e navegação compacta. Adaptação: contexto cotidiano de decisões; sem importar campanha de prêmio ou promessas financeiras.
- [Ownr](https://www.ownr.co/): pessoas em situações de trabalho, percurso do produto explícito. Adaptação: explicar as três fases e seu resultado prático; sem copiar identidades, fotografias ou números de clientes.
- [Statistics Canada, 15/08/2024](https://www150.statcan.gc.ca/n1/daily-quotidien/240815/dq240815b-eng.htm): pressões sobre despesas e decisões financeiras. Contexto histórico de pesquisa; não comprova preferência estética nem eficácia deste produto.

Persona de trabalho: adultos anglófonos no Canadá com decisões de dinheiro e trabalho adiadas. Mulheres de 30–49 anos são hipótese inicial de pesquisa, não público exclusivo ou perfil de compradores comprovado. Contexto urbano plausível, diversidade e vida comum; sem bandeiras ou clichês turísticos.

## Plano aprovado pelo contexto

Identidade do sócio e logo escolhida continuam como autoridade. Montserrat / Plus Jakarta Sans. Deep Void #0D0E11, Mint #00F0A8 e Glitch Crimson #FF2A54 na abertura; Studio White #F8F9FA, Core Pacific Blue #0052FF e Hyper Green #05C46B na clareza. Laranja apenas no detalhe original da marca. Títulos principais geométricos em caixa alta.

Composição:

1. Navegação discreta; hero fotográfico largo com texto legível sobre plano escuro, um CTA principal e nota de acesso gratuito.
2. Introdução do produto separada da promessa; percurso em três passos reais: perguntas, reflexão, prática.
3. Programa em três fases com saídas concretas, seguido de exemplo interativo da prática.
4. Bloco de identificação com imagem de rotina; FAQ com mais respiro; fechamento escuro com CTA mint.
5. Quiz com abertura humana e prévia honesta da reflexão; perguntas centradas, progresso compacto, opções confortáveis, resultado branco.
6. Página de prática mantém o resultado claro e destaca a atividade utilizável. Vídeo continua marcado como em preparação.

Antes: abstração óptica em posição de protagonista; excesso de parágrafos no hero; áreas inferiores com ritmo e tamanhos repetitivos. Depois: foto/contexto, hierarquia e alternância de escala; grafismo de sinal como assinatura secundária.

Movimento GSAP: entradas finitas de baixa amplitude e feedback curto. Conteúdo visível sem JavaScript nas páginas estáticas; controles independentes de animação; prefers-reduced-motion respeitado inclusive se alterado durante a visita. Sem parallax obrigatório, rolagem bloqueada, autoavanço ou flashes.

## Imagem e integridade

`public/brand/next-step-canada.webp`: fotografia ilustrativa original gerada com imagegen, não cliente ou depoimento. Derivados responsivos 768px e 480px. Prompt e origem em `public/brand/next-step-canada.provenance.md`. As imagens de referência não foram copiadas.

Conteúdo da oferta continua 8.2; nenhuma mudança em perguntas, pontuação, ramificações, disponibilidade, preço ou condição de venda. O programa integral e VSL ainda estão em preparação. Esta revisão não prova aumento de conversão; isso exige dados reais.

## Verificação de entrega

Build Astro concluído. 62 testes de lógica e 13 grupos de navegador local aprovados. Capturadas sete cenas em 1440px e 390px, com as etapas escura, intermediárias e clara verificadas. Mais nove combinações das rotas principais em 320px, 768px e 1024px, sem rolagem horizontal ou navegação cortada. Conferidos controles do exemplo via Enter/Space, troca de movimento reduzido durante a animação, navegação de teclado no quiz e acesso do hero à prática real. Imagens responsivas: 137KB / 51KB / 25KB aproximadamente.

Na segunda passagem de design, o título do celular foi recomposto para evitar palavra isolada, a prévia do quiz ganhou hierarquia secundária e o grafismo compacto passou a ocupar a largura prevista. Evidência visual local em `.impeccable/review/canada-muse/`. A verificação de produção está registrada em `DEPLOYMENT.md`. Escopo: comportamento e apresentação em Chrome; não certificação integral de acessibilidade nem resultado comercial.
