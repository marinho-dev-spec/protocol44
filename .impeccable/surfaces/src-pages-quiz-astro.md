---
version: 1
slug: "src-pages-quiz-astro"
primary_target: "src/pages/quiz.astro"
related_targets:
  - "src/components/Quiz.astro"
  - "src/components/BrandHeader.astro"
  - "src/lib/quiz-v5.ts"
  - "src/lib/quiz-v5-controller.ts"
  - "src/styles/funnel-v5.css"
  - "src/styles/funnel.css"
---

# Protocol 44 — quiz V5 EN

Mode: Operate. Rota `/quiz`, EN/EUA. Registro de 07/09/2026. A pessoa deve responder, entender a reflexão, escolher/trocar foco e acessar a prática. V4 literal permanece em /quiz-v4.

## Direction contract

THESIS: Dar um ponto de partida compreensível e revisável a partir das escolhas da pessoa.

OWN-WORLD: Papel, tinta, laranja vivo, serif44 escolhido e duas fontes locais. Ficha HTML preenchida com exemplo fictício; regras globais em DESIGN.md.

STORY: Abertura → dez perguntas → pontes após perguntas 4 e 7 → reflexão → troca de foco/revisão → /vsl#first-practice. A escolha final lidera. Para sugestão, contam-se temas das perguntas 3–5; empate/ausência mantém resultado aberto. O critério é explicado.

FIRST VIEWPORT: Proposta, ação, número de perguntas, gratuidade e ausência de email antes da ficha no mobile. Abertura e resultado em colunas; perguntas em até 640 px; grades empilham até 760 px.

FORM: Radios nativos, labels, fieldset/legend, avanço explícito e back. Ponto/contorno/fundo mostram escolha. Progresso nativo com contagem, sem transição de largura. Entrada breve de 200 ms, 4 px e sem blur, removida com movimento reduzido. Navegação leva foco ao título/legend e volta ao topo.

FINISH: Capturas quiz-intro, quiz-question e quiz-result em 1440/390, VERIFICACAO-V5.json e revisão final do conjunto em .impeccable/review/v5. O ship cobre os três fixes pontuados.

## Built behavior and limits

Pergunta 32 px/1,24, ou 28 px no mobile. Radios têm alvo de 68/65 px, aro 22 px e ponto 10 px. Foco chega ao label. Resposta é salva ao escolher, sem autoavanço. Sem resposta, role=alert e foco no primeiro radio.

Resultado tem folha plana com dl, details explicativo e focos em botões aria-pressed. Estado em sessionStorage, chave protocol44-quiz-v5, sem nome/email ou envio. Restauração filtra valores inválidos; falha de storage mantém uso em memória. Limpar remove a chave. Foco persiste até a prática quando storage está disponível.

A ficha mostra três respostas ilustrativas e acesso direto ao exercício. Não é depoimento. Sem JavaScript, noscript oferece prática escrita. A reflexão não mede causas ocultas nem prevê resultado.

Testes existentes cobrem dez perguntas, pontes, validação, voltar/restaurar, três focos/resultado aberto, limpeza e continuidade na prática. Prévia local noindex; sem backend, auditoria integral por leitor de tela ou validação de eficácia.


## Refinamento V5.1

Direção vigente em NATURAL-REFINEMENT.md. Copy mais conversada, laranja nas ações e superfícies de apoio em papel. Evidência atual em .impeccable/review/natural: 13 grupos, dez capturas e zero erros de execução. A revisão anterior permanece histórica.
