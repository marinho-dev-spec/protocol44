# Adequação aplicada — V8

Fonte recebida: `../ADEQUAÇÃO COPY/BRIEF_ADEQUACAO_SITE.md` e `funnel-content.json`. Os dois originais foram preservados. A cópia implementada está em [funnel-content.publicado.json](../src/content/funnel-content.json); a fonte executada pelo site é `../src/content/funnel-content.json`.

O pedido do titular autoriza correções, melhorias e publicação. A identidade aprovada foi mantida: papel, laranja, tipografia local e logo 44. O nome **Protocol 44** segue a decisão explícita do titular, apesar da nota de nome pendente no briefing.

## O que foi aplicado

| Pedido | Implementação |
|---|---|
| Copy como dados e nomes por tokens | Home, quiz, resultados, VSL, prática, navegação e mensagens saem do mesmo JSON. Marca, mecanismo e produto separados |
| Dez perguntas e dois eixos | Opções, IDs e pesos originais conservados; Q1 inclui família; Q3 é múltipla; Q4/Q8 têm peso 2 nas respostas especificadas |
| Idade, ceticismo e futuro | Q7 numérica opcional; Q9 altera a atividade; Q10 contextualiza pergunta final. Não somam pontos fora do contrato |
| Três resultados calculados | Dinheiro/estabilidade, energia/capacidade, pensamentos/expectativas; desempate por Q4/Q8 entre líderes. Empate não resolvido/zero usa saída neutra |
| Persona muda a cena | Profissional, familiar ou relacional; zero/empate sem desempate não inventa cena |
| Abertura com movimento | Sinal em SVG, entrada de 2,4s, botão disponível imediatamente e movimento reduzido respeitado. Nome do mecanismo só aparece depois |
| Três reforços | Textos e variante densa com três pontos práticos e referências expansíveis |
| Duas notas de consistência | Inline em Q6/Q9 somente quando há correspondência. Não fingem previsão anterior nem influência de um eixo no outro |
| Três atividades opcionais | Imaginação, percepção de sensação e associação de palavra. Skip sempre disponível; No/Skip não gera alegação de sensação no resultado |
| Resultado em duas colunas | Reflexão à esquerda; significado, base e explicação do cálculo à direita; responsivo |
| Comparação visual | Sinal/estática como ilustração do exercício, sem eixo de renda, energia, probabilidade ou semanas inventadas |
| Nome e email | Nome opcional apenas na aba. Email não coletado: não existe integração informada. Nada finge cadastro ou envio |
| Loading | Resumo imediato com ação para abrir a reflexão; sem espera artificial ou processamento fictício |
| Fechamento | Convite à prática e revisão das respostas. Não há sequência obrigatória de “sim” nem checkout sem oferta disponível |

## Alterações editoriais e razões

As frases de Q5 foram preservadas como alternativas de autorreflexão. A atribuição a citações literais de 12.783 relatos foi retirada porque os exports não permitem confirmá-la. Acrescentei a opção exclusiva “None of these fits right now” em Q3 para não exigir um problema que a pessoa não reconhece. Q7 deixa de dizer “última coisa” quando ainda há três perguntas; Q8 pergunta pela mudança desejada sem afirmar que o problema será resolvido.

O percentual 97,87% tem origem documentada como sugestão numérica, sem cálculo. As contagens do corpus divergem. Nenhum dos artigos valida o quiz, a eficácia do produto ou um bloqueio instalado antes dos oito anos. Por isso foram retiradas probabilidade individual, cura/remoção permanente, autobiografia sem autor e prova social apresentada como resultado do produto. [Auditoria e fontes](./FONTES_E_ALEGACOES_V8.md).

“Blocked Signal” foi mantido como metáfora explícita. A analogia não transforma Wi-Fi/Tesla em explicação do comportamento. Os três artigos permanecem acessíveis como contexto, com resumos limitados ao que estudaram. O termo “Burnout Pattern” passou a uma descrição de energia/capacidade, sem diagnóstico. O sidebar explica o que foi selecionado e o que isso permite explorar.

O JSON recebido contradizia o próprio briefing no desempate de persona e não definia o sinal indireto `villain_signal`. Adotou-se Q8 entre líderes; consistência de persona compara Q1 com Q8. O fallback neutro cobre casos reais da regra. [Contrato e 19 fixtures](./LOGICA_V8.md).

## Disponibilidade e revisão futura

O site oferece a prévia escrita; o programa completo e o vídeo continuam em produção. A publicação desta revisão não abre venda. A hipótese US$97/C$129 e demais condições estão na [oferta consolidada](./OFERTA_ESCALAVEL.md), separadas da copy pública.

Texto público exportado: [COPY_V8_EN.md](./COPY_V8_EN.md). Evidências de teste e publicação: `../docs/VALIDACAO_V8.md` e `../DEPLOYMENT.md`. Datas, commit e confirmação remota são registrados após a execução, não presumidos pelo nome deste arquivo.

Para próximas alterações, editar o JSON do site e atualizar esta cópia de revisão. O script de migração `.work/books-copy/build_adequacao.py` documenta esta rodada; não o executar cegamente depois de novas edições manuais, pois recria a versão a partir do original.
