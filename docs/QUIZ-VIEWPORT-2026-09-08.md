# Quiz: ler, selecionar e avançar na mesma tela

Pedido do titular: eliminar a necessidade de rolar para ler a pergunta, marcar a opção e avançar.

## Composição

Mantidos logo 44, paleta escuro → claro, fontes Montserrat/Plus Jakarta Sans e perguntas/pesos atuais. Os enunciados passam a leitura normal em vez de caixa alta para ocupar menos linhas. Cabeçalho e privacidade ficam compactos; o grafismo decorativo deixa de ocupar espaço entre cabeçalho e progresso. A barra de ações ocupa o final do quadro de perguntas, depois de todas as opções, sem sobreposição fixa.

O espaçamento se adapta à altura real e ao volume de texto. Até três densidades, com limites de leitura: opções das perguntas de 15px ou mais, alvos de seleção com pelo menos 44px. Não há truncamento, redução por transform/scale nem overflow:hidden no conteúdo do quiz.

Na abertura mobile, removido o painel fotográfico secundário; mensagem e CTA ficam juntos. A terceira explicação foi distribuída em duas telas curtas, com seus textos completos, cartões e referências preservados. Voltar/avançar percorre as duas partes; os eixos de pontuação, perguntas e respostas não mudaram. A atividade de associação usa quatro palavras numa linha em telas pequenas, e as respostas curtas têm indicadores acima do rótulo.

Quadro:

~~~
logo                                 programa
pergunta X de 10                     progresso
enunciado
orientação
[ opção completa                           ]
[ opção completa                           ]
[ opção completa                           ]

voltar                              continuar
              sobre suas respostas
~~~

## Limites de apresentação

O resultado é uma página de leitura, fora do quadro de perguntas. Referências e privacidade podem ser expandidas voluntariamente. Zoom de texto, teclado aberto e alturas extremas conservam rolagem como recurso de acesso; o texto não é cortado para forçar encaixe.

## Verificação

scripts/verify-quiz-viewport.cjs: 105 combinações de telas/ramificações e viewports 390×844, 375×667, 360×640, 320×568 e 1366×768. Inclui abertura, dez perguntas, notas condicionais, reforços, as duas partes da explicação longa, três atividades, nome e resumo. Verifica altura da página, posição do enunciado/opções/CTA e texto integral dentro das opções. Verifica também ida/volta das duas partes sem mudança nas respostas.

Relatórios e capturas locais: .impeccable/review/quiz-viewport/. O script geral verify-v8.cjs continua verificando o funil completo. Não se declara teste de todos os navegadores ou certificação de acessibilidade.
