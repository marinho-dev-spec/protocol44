# Lógica dos dois eixos e matriz de testes

07/09/2026. Auditoria dos arquivos `ADEQUAÇÃO COPY/BRIEF_ADEQUACAO_SITE.md` e `ADEQUAÇÃO COPY/funnel-content.json`, versão de origem 1.0. Documento técnico de recomendação para a implementação. Não altera os originais, o código nem a publicação.

## Decisão recomendada

Preservar os pesos declarados nesta migração, calcular os eixos separadamente e apresentar **um foco de reflexão calculado**, com uma cena opcional. O cálculo organiza respostas; não identifica doença, causa psicológica, origem na infância, probabilidade de melhora ou mecanismo invisível.

O resultado continua calculado. Retirar a troca direta de resultado e manter “Review my answers”, que volta ao quiz e recalcula tudo. Um empate não resolvido e ausência de pontuação precisam de uma apresentação neutra no mesmo componente de resultado. Não atribuir `internal_block` por falta de informação.

## 1. Problemas encontrados e resoluções explícitas

| Item | Fonte / problema | Resolução recomendada |
|---|---|---|
| Desempate de persona | BRIEF §5 usa Q8; `axes._note` do JSON usa copy base em qualquer empate | Q8 desempata somente se tiver voto de persona e estiver entre os líderes. Sem isso, persona `null`, cena base. Registrar essa decisão no JSON revisado. |
| Desempate de contexto | BRIEF usa Q4, mas `fear` e `bored` não pontuam | Usar Q4 somente quando sua categoria estiver entre os líderes. Caso contrário, contexto `null`, estado `mixed`. |
| Zero de contexto | JSON só tem três resultados categóricos; zero é alcançável | Contexto `null`, estado `insufficient`; texto neutro sobre não haver um tema predominante nas respostas pontuadas. |
| Q3 sem alternativa neutra | Não há `none`, mínimo ou regra de exclusividade | Incluir uma alternativa neutra exclusiva ou permitir explicitamente “None of these”. Armazenar a resposta neutra como `[]`; diferenciar de Q3 não respondida. |
| “Previsão” Q5 | Quatro alternativas distintas têm exatamente a mesma categoria | Não alegar prever a frase escolhida. No máximo, explicar a consistência entre temas declarados, com fonte visível. |
| “Previsão” Q8 | `villain_signal` não tem função ou tabela definida | Remover esse acoplamento nesta versão. Comparar Q8 com a persona declarada em Q1 apenas; não mapear dinheiro para profissional. |
| Q9 / experiência | “Sort of”, “No”, Skip e mudança posterior de ramo não têm contrato completo | Estados normalizados, Skip sempre disponível, experiência sem pontos e limpeza do estado específico quando Q9 mudar. |
| Idade | Não há limites, obrigatoriedade nem tratamento de campo vazio | Tornar opcional e sem pontos; aceitar somente idade inteira dentro do intervalo de público adulto definido abaixo. |
| Resultados em português | `persona_scenes` contém instruções editoriais, não copy final | Não renderizar instruções literalmente; criar as nove cenas EN e uma cena base verificadas. |
| Corpos calculados pelo cliente | JSON define pesos, mas não contrato de persistência | Persistir IDs válidos/versionados e recalcular os resultados; não confiar em totais ou categorias salvos. |
| Dobrar pesos outra vez | Q4/Q8 já trazem `scores.weight: 2` | Usar o peso da alternativa uma única vez; `weight_note` é nota editorial. |
| “3-Sim” | O JSON diz que não existe caminho “No” | Não usar cliques retóricos para fabricar consentimento ou diagnóstico. Recapitulação informativa e link de revisão bastam. |

A palavra técnica `villain` pode continuar como chave interna por compatibilidade. Não precisa aparecer na interface. O mesmo vale para os IDs `internal_block` e `health_burnout`: mantê-los não obriga chamar a pessoa de bloqueada ou diagnosticá-la com burnout.

## 2. Pontuação efetiva do arquivo recebido

P = professional; F = family; R = relational. C = concrete_lack; H = health_burnout; I = internal_block.

| Campo | Alternativa | Efeito |
|---|---|---|
| Q1 | work / family / rel | P+1 / F+1 / R+1 |
| Q1 | money | C+1; nunca persona |
| Q1 | why | Nenhum |
| Q2 | Todas | Nenhum |
| Q3 | self / money / health | I+1 / C+1 / H+1 por opção distinta marcada |
| Q3 | rel | R+1 |
| Q3 | alone | Nenhum; não converter automaticamente em I |
| Q4 | pain / kid | I+2 |
| Q4 | money / wornout | C+2 / H+2 |
| Q4 | fear / bored | Nenhum; não completar a lacuna por interpretação |
| Q5 | enough / lose / same / alone | I+1 |
| Q5 | none | Nenhum |
| Q6 | close | F+1 |
| Q6 | online / alone | Nenhum |
| Q6 | alone | Apenas flag de resposta `isolation=true`; não altera contexto |
| Q7 | Idade | Nenhum |
| Q8 | career / love / rel | P+2 / F+2 / R+2 |
| Q8 | calm | I+2; nenhum voto de persona |
| Q9 | Todas | Nenhum; seleciona ramo da experiência |
| Q10 | Todas | Nenhum; só pode adaptar a hipótese de celebração |
| Experiência, nome, email | Qualquer valor | Nenhum |

Máximos por categoria: C=4, H=3, I=6; P=3, F=4, R=4. Isso revela assimetria de construção. Q5 inteira positiva favorece I; Q8 calm acrescenta outros dois pontos a I. A opção `close` mistura família e amigos próximos, embora seu voto seja F. Nada disso foi calibrado com dados de compradores ou um instrumento validado.

**Não normalizar pelos máximos durante a migração.** Dividir I por seis e H por três mudaria decisões, empates e sentido dos pesos sem validação. Também não transformar pontos em “% de bloqueio”, confiança do modelo ou chance de resultado. Preservar o contrato e testar o entendimento da saída; uma futura revisão dos pesos deve ter versão própria.

## 3. Contrato determinístico

### 3.1 Normalização e completude

1. Cada pergunta é identificada por ID; o estado guarda IDs de alternativas, não labels, frases, pesos ou categorias recebidos do usuário.
2. Validar os IDs contra as opções da configuração vigente. IDs desconhecidos tornam aquela resposta inválida e pedem revisão. Não continuar silenciosamente com um resultado aparentemente completo.
3. Q3 é um conjunto: eliminar duplicatas, validar membros e ordenar pela ordem da configuração para exibição. A ordem dos cliques não pode influenciar a pontuação.
4. Q3 neutra normalizada como `[]` é uma resposta válida e concluída. `undefined` significa não respondida. Não usar `answers.q3.length > 0` como único critério de completude.
5. Se o UI usar `none` como opção exclusiva: selecionar `none` limpa as demais; selecionar qualquer tema limpa `none`. Um estado restaurado com `none` e temas juntos deve exigir revisão, em vez de decidir arbitrariamente o que a pessoa quis dizer.
6. Respostas ausentes e dados inválidos são diferentes de eixos zerados. Não renderizar “sem tema predominante” para um quiz ainda incompleto.
7. Q2, Q9 e Q10 continuam necessárias para seu papel no fluxo, mesmo sem pontuar. Q7 pode ser explicitamente pulada.
8. Dados de nome/email não fazem parte da completude necessária para calcular o resultado. Se não houver captura funcional e condições definidas, permitir seguir sem enviá-los.
9. Salvar `schemaVersion`, versão da copy/lógica e IDs. Ao carregar estado antigo incompatível, explicar que o quiz foi atualizado e reiniciar/revisar as perguntas incompatíveis. Não converter silenciosamente o resultado da antiga Q10 em resposta nova.
10. Derivar a flag de isolamento da resposta vigente da Q6. Mudar de `alone` para `close` precisa removê-la. A flag não prova isolamento objetivo nem ausência de vínculos.

### 3.2 Agregação

Começar sempre com seis contadores zerados. Para Q1/Q3/Q4/Q5/Q6/Q8, localizar a alternativa e adicionar `scores.weight` uma única vez ao eixo indicado. `scores: null` soma zero. Recalcular a partir do estado atual em cada edição; não acumular pontos sobre totais anteriores.

Validar a configuração antes de publicar: eixos conhecidos; IDs únicos dentro de cada pergunta; pesos inteiros positivos e finitos; cada voto apontando para uma categoria válida; todos os ramos e destinos do fluxo existentes. Não iterar `_shared` como se fosse um quarto resultado.

### 3.3 Resolver um eixo

```ts
type Resolution<T> =
  | { value: T; status: "unique" | "tie_resolved"; leaders: T[] }
  | { value: null; status: "insufficient" | "mixed"; leaders: T[] };

function resolveAxis<T extends string>(
  scores: Record<T, number>,
  preferred: T | null,
): Resolution<T> {
  const max = Math.max(...Object.values(scores) as number[]);
  if (max === 0) return { value: null, status: "insufficient", leaders: [] };

  const leaders = (Object.keys(scores) as T[]).filter(k => scores[k] === max);
  if (leaders.length === 1) {
    return { value: leaders[0], status: "unique", leaders };
  }
  if (preferred !== null && leaders.includes(preferred)) {
    return { value: preferred, status: "tie_resolved", leaders };
  }
  return { value: null, status: "mixed", leaders };
}
```

Este pseudocódigo supõe scores já validados e seis contadores definidos. Não deve receber valores não finitos ou um objeto vazio.

- Contexto: `preferred` é a categoria de contexto da alternativa atual da Q4, ou `null`.
- Persona/cena: `preferred` é a categoria de persona da alternativa atual da Q8, ou `null`.
- Uma resposta de Q4/Q8 é desempate, **não sobreposição automática ao maior total**.
- Não usar a ordem dos objetos, a ordem das perguntas, `Math.random()`, idade, nome, dispositivo ou celebração como desempate.
- Empate sem preferência pertinente mantém todos os líderes apenas para explicar que há temas mistos; não escolher um “mais lucrativo”.
- É válido ter contexto definido e persona nula, ou contexto nulo e persona definida.

### 3.4 Apresentação sem diagnóstico

Resultado categórico: explicar que a configuração deu mais peso a um dos temas mencionados, oferecer exemplo e prática. Não chamar isso de causa raiz encontrada, origem herdada, doença ou previsão.

Resultado misto: “Your answers touched on more than one area. There isn't one clear starting theme in this reflection.” Mostrar atividade geral e revisão das respostas.

Resultado zero: “There isn't enough information in the scored answers to suggest one starting theme.” Mostrar atividade geral e revisão das respostas. Não dizer que a pessoa ocultou o bloqueio ou que o mecanismo é tão profundo que escapou ao quiz.

Persona nula: usar a copy base, sem inventar família, carreira, parceiros, filhos ou estado civil. Mesmo persona F não autoriza pressupor filhos. As nove combinações de contexto×persona precisam de cenas compatíveis, e cada um dos três contextos precisa de cena base.

O visitante pode revisar respostas para receber outro cálculo. Não oferecer um controle que muda apenas a categoria mantendo o estado antigo.

## 4. As duas telas de consistência

O arquivo não contém um modelo de previsão validado. Exibir somente os acertos torna a interface incapaz de revelar seus erros ao usuário; isso não demonstra precisão. Além disso, comparar uma categoria com Q5 não equivale a prever a frase específica entre quatro opções diferentes.

Recomendação: renomear internamente a função como `consistencyNote` e usar texto descritivo retrospectivo. Não publicar “we knew you'd pick that one”, “that confirms”, “not a coincidence” nem promessas de desligar permanentemente algo. Nenhuma nota precisa existir se não agregar clareza.

### Após Q5

- Fonte permitida: Q3+Q4 somente, usando seus votos de contexto originais.
- Calcular o maior total parcial.
- Se zerado ou empatado, abster-se.
- Obter a categoria de contexto da resposta real da Q5. `none` é nula.
- Nota opcional somente quando ambas forem não nulas e iguais.
- O único acerto possível é a categoria I. Não afirmar que a frase exata foi antecipada.
- A nota deve descrever relação entre respostas, sem inferir causa. Se isso não puder ser feito de maneira natural para `q5.alone`, omitir a nota.
- Não acrescentar pontos por consistência. Não premiar quem concordou.

### Após Q8

- `villain_signal` está indefinido; removê-lo da versão implementada.
- Usar somente o voto de persona da Q1, conhecido antes de Q8.
- Q1 money/why: sem previsão e sem nota.
- Q8 calm: sem voto de persona, portanto sem nota.
- Mostrar uma nota descritiva apenas quando Q1 e Q8 apontarem para a mesma persona.
- Não consultar a persona final que inclui Q8 para “prever” a própria Q8. Isso seria vazamento da resposta.
- Não mapear C→professional, H→family ou I→relational. Esse mapeamento não está no JSON e destruiria a independência dos eixos.

Alternativa futura possível: fontes `["q1","q3","q6"]` para uma comparação com todos os votos prévios do mesmo eixo. Isso exige alterar explicitamente `predict_from`, abster-se nos empates e criar fixtures próprias; não misturar silenciosamente com a regra acima.

Quando o usuário voltar e mudar uma resposta, recalcular ou remover as notas a partir das respostas atuais. Como a comunicação proposta é retrospectiva, não simular um registro de previsão anterior. Se futuramente houver avaliação de um preditor, registrar acertos, erros e abstenções; não avaliar apenas os casos exibidos.

## 5. Q7 — idade

Proposta de contrato para este produto destinado a adultos: pergunta opcional; entrada em anos inteiros entre 18 e 120, com limites definidos na configuração. O limite superior é uma validação operacional de entrada plausível, não uma inferência de saúde.

- Entrada vazia com Skip explícito → `null`.
- Espaços ao redor de dígitos podem ser removidos.
- Aceitar somente dígitos para uma idade inteira; não aceitar notação científica, frações, infinitos, sinais ou datas.
- Valor abaixo de 18 → informar que o percurso comercial foi preparado para adultos; não produzir uma leitura pessoal como se a idade não tivesse sido percebida.
- Valor acima do limite → pedir revisão do número, sem alterar qualquer pontuação.
- Não deduzir ano de nascimento, experiências da infância, maturidade, rendimento, estabilidade ou gravidade.
- Idade nunca participa de pontuação, desempate, preço, escassez, experiência ou linha de resultado.

Não usar `Number("")`, que vira zero, nem `parseInt("18abc")`, que aceita um prefixo e oculta entrada inválida. A UI deve manter o valor digitado para correção; a função de pontuação recebe somente idade válida ou nula e a ignora.

## 6. Q9 e as três experiências

Mapeamento explícito: `believer→priming_believer`; `doubter→priming_doubter`; `skeptic→priming_skeptic`. “No, this is new to me” é desconhecimento, não prova de ceticismo; os IDs podem permanecer técnicos, mas a copy não deve afirmar uma personalidade derivada disso.

Contrato de estado sugerido:

```ts
type ExperienceState = {
  branch: "priming_believer" | "priming_doubter" | "priming_skeptic";
  status: "not_started" | "skipped" | "completed";
  check: "yes" | "partly" | "no" | null;
  word: "money" | "fear" | "tired" | "empty" | null;
};
```

- Usar IDs estáveis, e não os textos “Yes”, “Sort of”, “No”, como valores persistidos.
- Skip sempre visível e utilizável, inclusive com teclado, sem aguardar 10–20 segundos.
- A experiência não altera nenhuma pontuação, categoria, preço ou acesso.
- Nenhum clique ou resposta pode ser preenchido automaticamente pelo fim de um timer.
- `skipped`, `not_started` e `completed/no`: nenhuma linha adicional de resultado.
- `completed/partly`: no máximo uma recapitulação que preserve a incerteza.
- `completed/yes`: pode lembrar a atividade feita, sem dizer que sentir cheiro/tensão prova mecanismo, suscetibilidade ou facilidade de melhora.
- No ramo de palavras, não afirmar “under two seconds” sem medição real. A recomendação é retirar a afirmação temporal.
- Não afirmar que a palavra coincide com o contexto: não existe mapeamento validado e a escolha não pontua.
- `word` deve ser nula nos ramos que não a pedem.
- Trocar Q9 limpa o check, palavra e status do ramo anterior. Voltar sem mudar Q9 pode preservar a experiência concluída, caso o usuário queira.
- Se houver outro ramo no estado restaurado, limpar apenas o estado dependente e pedir a experiência correspondente ou oferecer Skip. Nunca mostrar a linha de um ramo antigo.
- Q10 permanece independente; sua resposta válida pode ser preservada quando Q9 muda.

## 7. Q10, captura, carregamento e revisão

Q10 não decide o resultado. Se usada no texto, deve manter caráter hipotético: a pessoa imaginou uma celebração; o quiz não provou que a alcançará. `quiet` não deve expor uma celebração inventada. Usar um mapa de frases próprias, evitando encaixar um label como “I'd rather not say” no meio de uma promessa gramaticalmente quebrada.

Nome/email não alteram eixos nem experiência. Escape normal de texto para nome; nunca interpolar como HTML. Nome vazio usa tratamento genérico. Email válido não é email confirmado nem enviado. Não prometer envio sem integração.

Carregamento pode preparar a apresentação real. Não simular leitura clínica, busca de mecanismo ou cruzamento com milhares de relatos. Não precisa de espera mínima artificial para o cálculo determinístico local.

Em “Review my answers”, preservar respostas válidas e abrir o percurso editável. Depois de mudar uma resposta pontuada, os totais, contexto, cena e notas derivadas são recalculados. Evitar um resultado antigo em cache ou URL governando a tela atual.

## 8. Fixtures de pontuação com resultados esperados

Base para todas as linhas; cada teste sobrescreve somente os campos indicados:

```json
{
  "q1": "why",
  "q2": "first",
  "q3": [],
  "q4": "fear",
  "q5": "none",
  "q6": "online",
  "q7": 30,
  "q8": "career",
  "q9": "skeptic",
  "q10": "quiet"
}
```

Q3 `[]` representa a alternativa neutra recomendada, não uma pergunta faltante. C/H/I e P/F/R nas colunas são os totais, nesta ordem. `null (mixed)` usa apresentação de temas mistos; `null (insufficient)` usa ausência de base para escolher um tema.

| ID | Alterações sobre a base | C/H/I | P/F/R | Contexto esperado | Cena esperada |
|---|---|---|---|---|---|
| S01 | `{}` | 0/0/0 | 2/0/0 | null (insufficient) | P |
| S02 | `{"q1":"money","q3":["money"],"q4":"money"}` | 4/0/0 | 2/0/0 | C | P |
| S03 | `{"q3":["health"],"q4":"wornout"}` | 0/3/0 | 2/0/0 | H | P |
| S04 | `{"q3":["self"],"q4":"pain","q5":"enough","q8":"calm"}` | 0/0/6 | 0/0/0 | I | null (insufficient) |
| S05 | `{"q5":"alone"}` | 0/0/1 | 2/0/0 | I | P |
| S06 | `{"q1":"money","q3":["money"],"q4":"wornout"}` | 2/2/0 | 2/0/0 | H · Q4 | P |
| S07 | `{"q3":["self"],"q4":"wornout","q5":"enough"}` | 0/2/2 | 2/0/0 | H · Q4 | P |
| S08 | `{"q3":["self"],"q4":"money","q5":"enough"}` | 2/0/2 | 2/0/0 | C · Q4 | P |
| S09 | `{"q3":["self","money","health"]}` | 1/1/1 | 2/0/0 | null (mixed) | P |
| S10 | `{"q1":"money","q3":["self"],"q4":"bored"}` | 1/0/1 | 2/0/0 | null (mixed) | P |
| S11 | `{"q1":"money","q3":["money"],"q8":"calm"}` | 2/0/2 | 0/0/0 | null (mixed) | null (insufficient) |
| S12 | `{"q3":["self"],"q4":"wornout","q5":"enough","q8":"calm"}` | 0/2/4 | 0/0/0 | I | null (insufficient) |
| S13 | `{"q1":"family","q6":"close"}` | 0/0/0 | 2/2/0 | null (insufficient) | P · Q8 |
| S14 | `{"q1":"rel","q3":["rel"],"q8":"love"}` | 0/0/0 | 0/2/2 | null (insufficient) | F · Q8 |
| S15 | `{"q1":"family","q6":"close","q8":"rel"}` | 0/0/0 | 0/2/2 | null (insufficient) | R · Q8 |
| S16 | `{"q1":"work","q3":["rel"],"q6":"close","q8":"calm"}` | 0/0/2 | 1/1/1 | I | null (mixed) |
| S17 | `{"q1":"money","q6":"alone","q8":"calm"}` | 1/0/2 | 0/0/0 | I | null (insufficient) |
| S18 | `{"q1":"money","q3":["alone","self","money","health","rel"],"q4":"pain","q5":"lose","q6":"close","q8":"calm"}` | 2/1/6 | 0/1/1 | I | null (mixed) |
| S19 | `{"q3":["self","self","money","money"]}` | 1/0/1 | 2/0/0 | null (mixed) | P |

Leituras decisivas das fixtures:

- S05: um único voto positivo pode vencer, mas não autoriza chamar isso de resultado forte ou diagnóstico.
- S06–S08: Q4 resolve empate, não recebe novo peso.
- S09–S11: demonstram a necessidade da saída neutra/mista.
- S12: Q4 não sobrepõe o maior total de outra categoria.
- S13–S15: desempates de persona resolvidos por Q8.
- S16: empate triplo de persona, Q8 calm não resolve.
- S17: nenhuma persona e flag de isolamento sem voto adicional.
- S18: Q3 completa soma três pontos de contexto e um de persona, não cinco de contexto.
- S19: deduplicação; equivale a Q3 self+money uma única vez.

### Enumeração matemática executada nesta auditoria

Foi executado um modelo independente em JavaScript, em memória, usando os pesos extraídos do JSON recebido e as regras propostas. Enumerou Q1×32 conjuntos de Q3×Q4×Q5×Q6×Q8 = **57.600 combinações**. Os 32 conjuntos incluem a resposta neutra `[]` proposta. Q2/Q7/Q9/Q10 não entram na enumeração porque não pontuam.

| Saída de contexto | Combinações |
|---|---:|
| I | 33.480 |
| C | 9.480 |
| H | 8.328 |
| Misto sem desempate válido | 6.024 |
| Pontuação zero | 288 |

| Saída de persona | Combinações |
|---|---:|
| P | 15.360 |
| F | 17.280 |
| R | 18.720 |
| Mista sem desempate válido | 4.320 |
| Pontuação zero | 1.920 |

Essa enumeração comprova possibilidades e assimetria da regra sob combinações artificiais. **Não é distribuição de pessoas, prevalência, acurácia, taxa esperada ou validação do quiz.** Todas as alternativas foram combinadas, inclusive perfis contraditórios. Não houve teste de navegador/site ou teste com usuários por este agente.

## 9. Matriz complementar de testes da implementação

### Entrada e pontuação

| ID | Caso | Critério de aprovação |
|---|---|---|
| V01 | Q3 desmarcada e Continue neutro | Armazena `[]` e avança; zero é resposta, não erro de ausência |
| V02 | Q3 ainda não apresentada | Não permite calcular resultado completo |
| V03 | Mesmo conjunto Q3 em todas as ordens | Mesmos totais, contexto, cena e ordem de exibição |
| V04 | Clicar duas vezes no mesmo checkbox | Volta ao estado anterior; nenhum ponto residual |
| V05 | Selecionar todos e depois remover health | Somente H cai um ponto |
| V06 | Somar alone em Q3 | Nenhum contador muda |
| V07 | raw Q3 contém ID desconhecido | Solicita revisão; não calcula resultado completo silenciosamente |
| V08 | raw Q3 contém duplicatas conhecidas | Dedupe; no máximo um voto por opção |
| V09 | none e self juntos em estado restaurado | Trata conflito de exclusividade; não interpreta arbitrariamente |
| V10 | Q4 pain versus kid | Mesmos scores; texto de resumo pode mudar sem inventar causa |
| V11 | Q4 fear versus bored | Mesmos scores nulos para Q4 |
| V12 | Q5 troca entre as quatro frases pontuadas | Mesmo total de I; nota não diz ter previsto frase específica |
| V13 | Q5 troca para none | I cai exatamente um |
| V14 | Q2 many/once/first, demais iguais | Resultado idêntico |
| V15 | Q6 online versus alone | Resultado idêntico; somente flag derivada muda |
| V16 | Q6 alone→close | Remove isolamento e adiciona exatamente F+1 |
| V17 | Q8 calm→career | Remove exatamente I+2 e adiciona P+2 |
| V18 | Q4 e Q8 em peso duplo | Opção soma 2, nunca 4 |
| V19 | Q9 qualquer ramo, demais iguais | Mesmo resultado |
| V20 | Q10 todas as quatro opções | Mesmo resultado |
| V21 | Idade, nome, email variados | Mesmo resultado |
| V22 | Falta uma resposta necessária | Retorna ao campo; não usa zero/default como substituto |
| V23 | URL/cache contém outra categoria | Resultado deriva das respostas, não da URL/cache |
| V24 | Estado de versão anterior do quiz | Revisão/reinício explícito; antiga Q10 não determina resultado |
| V25 | Configuração com eixo/peso/destino inválido | Falha de configuração detectada antes de publicação |

### Consistência Q5 / Q8

| ID | Caso | Critério de aprovação |
|---|---|---|
| R01 | Q3 self, Q4 pain, Q5 enough | Nota opcional de tema comum; nenhum diagnóstico ou “previ a frase” |
| R02 | Mesmo parcial, Q5 none | Sem nota |
| R03 | Q3 money, Q4 money, Q5 enough | Sem nota; não reinterpretar o erro como acerto |
| R04 | Q3 self+money, Q4 fear | Parcial empatado; sem nota para qualquer Q5 |
| R05 | Q3 neutra, Q4 bored | Parcial zero; sem nota |
| R06 | Mudar Q5 mantendo Q3/Q4 | Previsão/tema prévio não muda com a resposta que seria comparada |
| R07 | Editar Q3/Q4 após concluir | Nota recalculada ou removida; nada de resultado antigo |
| R08 | Q1 work, Q8 career | Nota opcional sobre objetivo de trabalho mencionado |
| R09 | Q1 work, Q8 love | Sem nota |
| R10 | Q1 money, Q8 career | Sem nota; dinheiro não vira professional |
| R11 | Q1 why, qualquer Q8 | Sem nota |
| R12 | Qualquer Q1, Q8 calm | Sem nota de persona |
| R13 | Alterar somente votos de contexto anteriores | Nota Q8 não muda se Q1/Q8 não mudarem |
| R14 | Nota visível versus omitida | Nenhum efeito em score, preço, acesso ou possibilidade de continuar |

### Idade

| ID | Entrada | Esperado |
|---|---|---|
| A01 | Vazio e Skip | null; avança sem pontuar |
| A02 | “18” / “120” | Limites válidos; sem efeito no resultado |
| A03 | “17” / “0” | Fora do público adulto; orientação de escopo, nenhum diagnóstico |
| A04 | “121” | Pedir revisão |
| A05 | “18.5” / “18,5” | Rejeitar fração |
| A06 | “2e1” / “18abc” / “Infinity” / “NaN” | Rejeitar formato |
| A07 | “ 30 ” | Normaliza para 30 |
| A08 | “-20” / “+20” / data de nascimento | Rejeitar formato |
| A09 | Somente espaços | Vazio; não converter em zero |
| A10 | Colar número muito longo | Rejeitar; nenhum overflow nem travamento |
| A11 | Mudar 30→60 | Mesmos eixos, ramo, preço e resultado |

### Ramos, Skip e revisão

| ID | Caso | Critério de aprovação |
|---|---|---|
| B01 | believer / doubter / skeptic | Mostra exclusivamente o ramo mapeado |
| B02 | Skip imediatamente | Avança sem timer mínimo, check ou palavra |
| B03 | Skip com teclado | Mesmo comportamento; foco vai ao próximo destino |
| B04 | Check No | Nenhuma linha adicional; compra/resultado não penalizados |
| B05 | Check Sort of | Recapitulação qualificada, sem afirmar sensação plena ou eficácia |
| B06 | Check Yes | Pode lembrar a experiência; não vira prova do mecanismo |
| B07 | skeptic escolhe palavra após 10 segundos | Nenhuma alegação de resposta em menos de dois segundos |
| B08 | skeptic escolhe Money com resultado H | Nenhuma afirmação de correspondência exata; score não muda |
| B09 | believer completado→Q9 doubter | Limpa experiência anterior; não reaproveita Yes do cheiro como tensão |
| B10 | Q9 sem mudança e voltar | Pode preservar estado do mesmo ramo |
| B11 | Ramo de palavras→ramo visual | Palavra antiga não aparece no resultado |
| B12 | Concluir e depois optar por Skip | Estado skipped prevalece; nenhuma linha adicional |
| B13 | Refresh durante experiência | Restaura apenas estado válido do ramo, com Skip acessível |
| B14 | Timer concluído sem resposta | Não inventa Yes, check, duração ou conclusão |
| B15 | Revisar Q4 a partir do resultado | Recalcula categoria e cena; volta ao resultado atualizado |
| B16 | Persona muda mas contexto não | Atualiza somente a cena correspondente |
| B17 | Contexto calculado vira null | Mostra template neutro; não fica preso no resultado anterior |
| B18 | Captura email/nome pulada | Resultado calculado continua acessível |
| B19 | Nome com markup | Renderiza como texto; não executa HTML |
| B20 | Duplo clique em Continue/Back | Uma transição por vez; nenhuma pergunta pulada ou resposta duplicada |
| B21 | Direct link ao resultado sem estado | Retoma o início/primeira pergunta necessária; não mostra diagnóstico default |
| B22 | Erro de storage / navegação privada | Quiz continua em memória ou informa limite de retomada; não inventa resultado |

## 10. Ordem de validação sugerida ao implementador

1. Validar schema/configuração e normalização.
2. Implementar funções puras de contagem e resolução; executar fixtures S01–S19.
3. Executar invariantes V03/V08/V14/V19/V20/V21 e os empates/zeros.
4. Implementar o fluxo a partir do JSON, com notas/experiências opcionais que não somam pontos.
5. Verificar mudança de ramo, retorno, refresh e estado antigo.
6. Testar nove cenas, três cenas base, estado misto e estado zero no mesmo layout.
7. Conferir no navegador mobile/desktop o percurso inteiro, inclusive teclado e Skip imediato.
8. Só então publicar o conteúdo revisado e registrar que os testes são funcionais; não houve validação psicométrica, eficácia ou teste de conversão.
