/**
 * Copy oficial do funil — fonte única: melhorias/QUIZ_V4_PROPOSTA.md + melhorias/RESULTADO_V2_PROPOSTA.md
 * Regra: NÃO editar texto aqui sem editar o documento correspondente (e vice-versa).
 * Nomes de trabalho: "Acorde" (marca) e "Protocolo de Resintonização" (solução) — decisão dos sócios pendente.
 */

export type Vilao = 'FaltaConcreta' | 'SaudeEsgotamento' | 'TravamentoInterno';
export type Persona = 'Profissional' | 'Familia' | 'Relacional';
export type PrimingTipo = 'crente' | 'duvida' | 'cetica';

export interface Opcao {
  id: string;
  emoji?: string;
  label: string;
  persona?: Persona;
  vilao?: Vilao;
  /** sinal indireto pro motor (capado, nunca pontua eixo) */
  indireto?: { vilao?: Vilao; persona?: Persona };
  /** flag de copy (isolamento/apoio) — zero ponto */
  flag?: 'isolamento' | 'familia' | 'online';
  /** opção exclusiva em múltipla escolha ("Nenhuma dessas") */
  exclusiva?: boolean;
}

export interface Pergunta {
  id: string;
  numero: number; // 1..10 (progresso)
  titulo: string;
  multipla?: boolean;
  opcoes: Opcao[];
}

export const PERGUNTAS: Record<string, Pergunta> = {
  p1: {
    id: 'p1',
    numero: 1,
    titulo: 'O que mais te motiva a resolver isso agora?',
    opcoes: [
      { id: 'p1-carreira', emoji: '💼', label: 'Destravar minha carreira ou meu trabalho', persona: 'Profissional' },
      { id: 'p1-familia', emoji: '👨‍👩‍👧', label: 'Estar mais presente pra minha família', persona: 'Familia' },
      { id: 'p1-relacoes', emoji: '💔', label: 'Parar de sabotar meus relacionamentos', persona: 'Relacional' },
      { id: 'p1-dinheiro', emoji: '💰', label: 'Parar de sentir que o dinheiro nunca sobra', persona: 'Profissional', indireto: { vilao: 'FaltaConcreta' } },
      { id: 'p1-entender', emoji: '🧠', label: 'Entender por que nada do que eu tento funciona' },
    ],
  },
  p2: {
    id: 'p2',
    numero: 2,
    titulo: 'Você já tentou manifestar antes — e sentiu que não funcionou?',
    opcoes: [
      { id: 'p2-varias', label: 'Já. Mais de uma vez.' },
      { id: 'p2-uma', label: 'Uma vez, pra valer.' },
      { id: 'p2-primeira', label: 'Não — essa é minha primeira tentativa séria.' },
    ],
  },
  p3: {
    id: 'p3',
    numero: 3,
    titulo: 'Onde isso mais aparece na sua vida hoje? Pode marcar mais de uma.',
    multipla: true,
    opcoes: [
      { id: 'p3-isolamento', label: '"Sinto que ninguém em volta entende de verdade."', flag: 'isolamento' },
      { id: 'p3-confianca', label: '"Minha confiança em mim foi pro chão."', vilao: 'TravamentoInterno' },
      { id: 'p3-dinheiro', label: '"O dinheiro nunca dá folga, faça o que eu fizer."', vilao: 'FaltaConcreta' },
      { id: 'p3-corpo', label: '"Meu corpo e minha cabeça vivem no limite."', vilao: 'SaudeEsgotamento' },
      { id: 'p3-relacoes', label: '"Minhas relações andam estremecidas ou distantes."', flag: 'isolamento' },
    ],
  },
  p4: {
    id: 'p4',
    numero: 4,
    titulo: 'No fundo, o que você acha que está travando você de verdade?',
    opcoes: [
      { id: 'p4-dor', emoji: '😔', label: 'Uma dor emocional ou trauma que carrego', vilao: 'TravamentoInterno' },
      { id: 'p4-ansiedade', emoji: '😰', label: 'Ansiedade ou medo constante' },
      { id: 'p4-dinheiro', emoji: '💸', label: 'Falta de dinheiro ou instabilidade no trabalho', vilao: 'FaltaConcreta' },
      { id: 'p4-esgotamento', emoji: '🏥', label: 'Esgotamento físico ou emocional', vilao: 'SaudeEsgotamento' },
      { id: 'p4-heranca', emoji: '🧬', label: 'Algo que aprendi/herdei desde criança', vilao: 'TravamentoInterno' },
      { id: 'p4-tedio', emoji: '😴', label: 'Tédio ou falta de propósito' },
    ],
  },
  p5: {
    id: 'p5',
    numero: 5,
    titulo: 'Alguma dessas frases já passou pela sua cabeça?',
    multipla: true,
    opcoes: [
      { id: 'p5-suficiente', emoji: '🙁', label: '"Eu não sou suficiente, por isso não dá certo."', vilao: 'TravamentoInterno' },
      { id: 'p5-medo', emoji: '😨', label: '"Tenho medo de conseguir e perder de novo."', vilao: 'TravamentoInterno' },
      { id: 'p5-mesmolugar', emoji: '😞', label: '"Não importa o que eu faça, sempre volto pro mesmo lugar."', vilao: 'TravamentoInterno' },
      { id: 'p5-sozinho', emoji: '🫥', label: '"Mesmo cercado(a) de gente, me sinto sozinho(a) nisso."', flag: 'isolamento' },
      { id: 'p5-nenhuma', emoji: '🤷', label: 'Nenhuma dessas, sinceramente não sei o que é', exclusiva: true },
    ],
  },
  p6: {
    id: 'p6',
    numero: 6,
    titulo: 'E apoio? Você tem alguém de verdade do seu lado nisso?',
    opcoes: [
      { id: 'p6-familia', label: 'Tenho — família e amigos próximos', flag: 'familia', indireto: { persona: 'Familia' } },
      { id: 'p6-online', label: 'Tenho, mas é mais online — grupos e comunidades', flag: 'online' },
      { id: 'p6-sozinho', label: 'Apoio de verdade? Não. Nisso eu tô por minha conta', flag: 'isolamento' },
    ],
  },
  p7: {
    id: 'p7',
    numero: 7,
    titulo: 'Rapidinho, só pra calibrar: qual a sua idade?',
    opcoes: [
      { id: 'p7-1824', label: '18–24' },
      { id: 'p7-2534', label: '25–34' },
      { id: 'p7-3544', label: '35–44' },
      { id: 'p7-4554', label: '45–54' },
      { id: 'p7-5564', label: '55–64' },
      { id: 'p7-65', label: '65+' },
    ],
  },
  p8: {
    id: 'p8',
    numero: 8,
    titulo: 'Se isso se resolvesse de verdade, o que mais mudaria na sua vida?',
    opcoes: [
      { id: 'p8-carreira', emoji: '🚀', label: 'Finalmente avançar na carreira que eu quero', persona: 'Profissional' },
      { id: 'p8-amor', emoji: '❤️', label: 'Estar mais presente e conectado(a) com quem eu amo', persona: 'Familia' },
      { id: 'p8-relacoes', emoji: '💑', label: 'Ter relacionamentos mais saudáveis, sem repetir os mesmos padrões', persona: 'Relacional' },
      { id: 'p8-paz', emoji: '🧘', label: 'Sentir paz e confiança em mim mesmo(a) de novo', indireto: { vilao: 'TravamentoInterno' } },
    ],
  },
  p9: {
    id: 'p9',
    numero: 9,
    titulo: 'Me conta uma coisa: você já tinha ouvido falar em reprogramação do subconsciente?',
    opcoes: [
      { id: 'p9-crente', label: 'Já — e acredito que funciona' },
      { id: 'p9-duvida', label: 'Já ouvi, mas tenho minhas dúvidas' },
      { id: 'p9-cetica', label: 'Não, é novidade pra mim' },
    ],
  },
  p10: {
    id: 'p10',
    numero: 10,
    titulo: 'Imagine que isso já foi resolvido. Como você comemoraria?',
    opcoes: [
      { id: 'p10-jantar', emoji: '🎉', label: 'Um jantar especial comigo mesmo(a)' },
      { id: 'p10-viagem', emoji: '✈️', label: 'Aquela viagem que sempre adiei' },
      { id: 'p10-presente', emoji: '🎁', label: 'Um presente que simboliza essa virada' },
      { id: 'p10-segredo', emoji: '🤐', label: 'Prefiro não dizer, mas já sei o que seria' },
    ],
  },
};

/* ── Tela 0 ── */
export const TELA0 = {
  texto:
    'Eu preciso te confessar uma coisa antes de começar: eu também travei assim. Existe uma pergunta que você provavelmente ainda não se fez — e daqui a alguns minutos, acho que você vai reconhecer ela na hora.',
  cta: 'Toque pra começar',
};

/* ── Reforços ── */
export const REFORCO1 = {
  feel: 'Eu sei como é sentir que você fez tudo certo e mesmo assim nada mudou.',
  felt: 'Milhares de pessoas chegaram nesse mesmo ponto sentindo a mesma coisa. E o que elas descobriram foi isso:',
  found: '"Isso não é falta de esforço."',
  corpo:
    'Quando você tenta e não funciona, a explicação mais fácil é "eu devo estar fazendo algo errado". Mas o que os dados mostram, repetido relato após relato, quase com as mesmas palavras: não é a técnica que falha — é algo interferindo ANTES da técnica ter chance de funcionar.',
  fecho: 'Sem julgamento, sem culpa.',
  prova: 'Baseado na análise de milhares de relatos públicos reais',
  cta: 'Entendi',
};

export const REFORCO2 = {
  headline: 'Uma coisa que você precisa saber agora: você não está só nisso — literalmente.',
  corpo:
    'Nos milhares de relatos que a gente leu, essa mesma sensação aparece de novo e de novo, quase com as mesmas palavras: fazer tudo certo e mesmo assim sentir que algo invisível trava o resultado. Se isso soa familiar demais pra ser coincidência, é porque não é.',
  cta: 'Continuar',
};

export const REFORCO3 = {
  headline: 'Isso não é teoria.',
  sinal1:
    'Eu passei por esse padrão antes de conseguir dar nome ao que estava acontecendo. Foi por isso que liderei a análise, relato por relato — até ver que não era só comigo.',
  sinal2:
    'E o que encontramos conversa com décadas de pesquisa sobre como aquilo que se aprende cedo continua rodando na vida adulta.',
  sinal2Fontes: 'Dweck 1988 · Seligman 1975 · Ainsworth 1970 — toque pra ver as fontes',
  sinal3:
    'Foram milhares de relatos reais, com checagem cruzada de viés. O padrão se repete de um jeito consistente demais pra ser acaso.',
  candid:
    '<b>Uma coisa que preciso deixar clara:</b> isso não é sobre força de vontade, e também não é instantâneo — é sobre remover uma interferência específica. Não prometemos milagre, prometemos identificar exatamente o que trava você.',
  fontes: [
    '<b>Carol Dweck (Stanford University)</b> — Dweck, C. S., & Leggett, E. L. (1988). <i>A Social-Cognitive Approach to Motivation and Personality.</i> Psychological Review, 95(2), 256-273. — crenças aprendidas cedo travam desempenho mesmo sem falta de esforço.',
    '<b>Martin Seligman (University of Pennsylvania)</b> — Hiroto, D. S., & Seligman, M. E. P. (1975). <i>Generality of Learned Helplessness in Man.</i> Journal of Personality and Social Psychology, 31(2), 311-327. — um padrão de "nada que eu faço muda o resultado" pode ser condicionado e persistir mesmo quando a situação já mudou.',
    '<b>Mary Ainsworth (Johns Hopkins University)</b> — Ainsworth, M. D. S., & Bell, S. M. (1970). <i>Attachment, Exploration, and Separation.</i> Child Development, 41(1), 49-67. — padrões formados na infância se repetem na vida adulta sem a pessoa perceber a origem.',
  ],
  cta: 'Continuar',
};

/* ── Motor de autoconsistência — camada de copy (v4) ── */
export const MOTOR = {
  p5: {
    fff: "Talvez pareça estranho a gente 'acertar' isso — várias pessoas sentem o mesmo estranhamento aqui. Mas é esse padrão, esse mesmo, que a gente vem estudando.",
    revelacao: 'Alguma coisa aqui... a gente meio que já sabia que você ia marcar essa.',
    barnum: 'E não foi sorte de palpite — esse tipo de acerto só acontece com quem está vivendo isso de verdade.',
  },
  p8: {
    revelacao: 'Isso confirma o que a gente vinha suspeitando desde a primeira pergunta.',
    futurePacing:
      'E se a gente já consegue perceber isso com tão pouca informação, imagina o que vai ser possível quando a gente localizar o que está te travando — e desligar isso de vez.',
  },
};

/* ── P9 — buffers (The Ledge) ── */
export const P9_BUFFERS: Record<PrimingTipo, string> = {
  crente: 'Eu imaginei que sim — isso já faz sentido pra você.',
  duvida: 'Faz sentido ter dúvida — a maioria tem, no começo.',
  cetica: 'Tudo bem duvidar. Prova errado hoje mesmo — se amanhã a dúvida continuar igual, você não perdeu nada.',
};

/* ── Priming 2 — 3 versões ── */
export const PRIMING2 = {
  crente: {
    texto:
      'Antes de continuar, feche os olhos por um instante. Imagine acender um incenso. Observe a fumaça subindo devagar. Tente sentir o aroma — floral, suave, do jeito que fizer sentido pra você. Não precisa ser perfeito, só perceber.',
    checagem: 'Você conseguiu sentir o aroma?',
  },
  duvida: {
    intro:
      'Faz sentido você ainda ter dúvida sobre isso — a maioria das pessoas que a gente estudou também tinha, no início. O que elas descobriram foi que dava pra perceber isso primeiro no corpo, antes de qualquer crença.',
    texto:
      'Feche os olhos por um instante. Perceba sua respiração, sem tentar mudar nada nela. Repare se existe alguma tensão em algum lugar — nos ombros, na mandíbula, no peito. Não precisa fazer nada com isso agora, só perceber.',
    checagem: 'Você conseguiu perceber alguma tensão?',
  },
  cetica: {
    texto: "Sem pensar muito — toque na primeira palavra que vier à cabeça quando você ler essa: <b>'travado'</b>.",
    palavras: ['Dinheiro', 'Medo', 'Cansaço', 'Vazio'],
    depois:
      'Interessante — você escolheu isso em menos de 2 segundos, sem pensar. Isso não foi aleatório: é o tipo de resposta automática que a gente vem estudando nos relatos que analisamos.',
    checagem: 'Achou estranho ter saído tão rápido, sem pensar?',
  },
  checagemOpcoes: ['Sim', 'Mais ou menos', 'Não'],
};

/** Linha condicional do Priming 2 — texto aprovado, sincronizado com QUIZ_V4 + RESULTADO_V2 (2b) */
export const PRIMING2_LINHA: Record<PrimingTipo, string> = {
  crente:
    'Durante a mentalização, quando você tentou sentir o aroma — repare numa coisa: não tinha incenso nenhum. A percepção veio inteira de você. Quem constrói uma imagem assim, com essa facilidade, costuma responder bem a trabalho guiado — e é por esse caminho que a interferência se desliga.',
  duvida:
    'Você não é do tipo que aceita qualquer coisa sem sentir de verdade — e isso ajuda, não atrapalha. Aquela tensão que você percebeu agora há pouco não foi coincidência: é onde esse tipo de bloqueio costuma aparecer primeiro, antes mesmo da mente aceitar.',
  cetica:
    'Lembra daquele teste rápido de agora há pouco? Você respondeu em menos de dois segundos, sem pensar. É assim que a interferência aparece: automática, antes da razão chegar. Você não precisou acreditar em nada — e mesmo assim aconteceu.',
};

/* ── Loading ── */
export const LOADING = {
  linhas: ['Analisando suas respostas...', 'Identificando seu padrão de Sinal Bloqueado...', 'Preparando seu diagnóstico personalizado...'],
  citacao: {
    original: '"Thank you for sharing your experience to let me know that im not alone, i wish you all will find peace."',
    traducao: 'Tradução livre: "Obrigado por compartilhar sua experiência e me mostrar que não estou só. Desejo que todos encontrem paz."',
    tag: 'relato público analisado no estudo — não é avaliação do produto',
  },
};

/* ── Gate ── */
export const GATE = {
  emailTitulo: 'Seu diagnóstico está pronto.',
  emailTexto: 'Coloca seu melhor e-mail pra ele ficar guardado pra você — e pra gente conseguir te entregar o resultado completo.',
  emailPlaceholder: 'seu@email.com',
  emailCta: 'Ver meu diagnóstico',
  nomeTitulo: 'Última coisa: como você quer ser chamado?',
  nomePlaceholder: 'Seu primeiro nome',
  nomeCta: 'Abrir diagnóstico',
};

/* ── Fragmentos (RESULTADO_V2, seção 1) ── */
export const FRAG_P4: Record<string, { a: string; b: string; c: string }> = {
  'p4-dor': {
    a: 'que existe uma dor antiga que você ainda carrega',
    b: 'essa dor antiga que você ainda carrega',
    c: 'essa dor antiga',
  },
  'p4-ansiedade': {
    a: 'que a ansiedade e o medo não te dão trégua',
    b: 'essa ansiedade que não te dá trégua',
    c: 'esse medo constante',
  },
  'p4-dinheiro': {
    a: 'que a falta de dinheiro e a instabilidade no trabalho estão no centro de tudo',
    b: 'essa instabilidade de dinheiro e trabalho',
    c: 'a instabilidade que você vive hoje',
  },
  'p4-esgotamento': {
    a: 'que você chegou no limite do corpo e da cabeça',
    b: 'esse esgotamento físico e emocional',
    c: 'esse esgotamento',
  },
  'p4-heranca': {
    a: 'que tem algo aí desde a infância — algo que você não escolheu',
    b: 'esse padrão que você carrega desde criança',
    c: 'o que foi plantado lá atrás',
  },
  'p4-tedio': {
    a: 'que falta um propósito de verdade puxando você',
    b: 'essa falta de propósito',
    c: 'esse vazio de direção',
  },
};

export const FRAG_P3_SIM2: Record<string, string> = {
  'p3-confianca': 'é a sua confiança que segue pagando o preço',
  'p3-dinheiro': 'é o seu bolso que segue pagando a conta, mês após mês',
  'p3-corpo': 'é a sua energia que segue sendo drenada, dia após dia',
};

export const FRAG_P3_FALLBACK: Record<Vilao, string> = {
  FaltaConcreta: 'é o dinheiro que segue sem sobrar, mês após mês',
  SaudeEsgotamento: 'é a sua energia que segue indo embora sem repor',
  TravamentoInterno: 'é a sua confiança que segue pagando o preço',
};

export const FRAG_P8_RECAP: Record<string, string> = {
  'p8-carreira': 'finalmente avançar na sua carreira',
  'p8-amor': 'estar presente de verdade com quem você ama',
  'p8-relacoes': 'relacionamentos saudáveis, sem repetir os padrões de sempre',
  'p8-paz': 'sentir paz e voltar a confiar em você',
};

export const FRAG_P10: Record<string, string> = {
  'p10-jantar': 'aquele jantar especial, só seu, finalmente acontecendo — e você brindando ao que mudou',
  'p10-viagem': 'a mala aberta na cama, passagem comprada — aquela viagem que você vinha adiando saindo do papel',
  'p10-presente': 'aquele presente que simboliza a virada, finalmente comprado — e você sabendo o que ele significa',
  'p10-segredo': 'aquela comemoração que você não contou pra ninguém — você sabe qual é — finalmente acontecendo',
};

export const FRAG_P2_BARNUM: Record<string, string> = {
  'p2-varias': 'Você já tentou mais vezes do que as pessoas ao seu redor imaginam.',
  'p2-uma': 'Você já tentou antes — e uma tentativa que não vinga dói mais do que você admite.',
  'p2-primeira': 'Você esperou até ter certeza de que valia a pena tentar de verdade. E chegou até aqui.',
};

/* ── Blocos compartilhados do resultado (RESULTADO_V2, seção 2) ── */
export const WIFI_REVERSAL = [
  'E antes que a dúvida apareça: você não precisa "acreditar" em nada disso pra essa interferência ser real.',
  'Sinais invisíveis já controlam coisas reais na sua vida, todos os dias. O Wi-Fi da sua casa enche cada cômodo de internet sem nenhum fio te ligando ao roteador — e você já deve ter dito "aqui não pega sinal" um monte de vezes, sem nunca duvidar de que o sinal existia. Ele só não estava chegando direito naquele ponto.',
  'O controle remoto liga sua TV do mesmo jeito, sem fio nenhum. Ninguém questiona esses sinais — só porque já foram nomeados e explicados.',
  'O seu caso é essa mesma coisa: um sinal real que ainda não estava chegando direito. Só que agora tem nome. <i>(E isso nem é ideia nova: em 1898, Nikola Tesla apresentou o primeiro barco controlado à distância da história — na época pareceu mágica; hoje a gente só chama de "controle remoto".)</i>',
];

export const CAMADA34 = {
  intro: 'Você já viu, ali atrás, que isso não é teoria. Agora olha de onde a interferência vem.',
  corpo:
    'Você não nasceu com esse ruído. Ele foi instalado por repetição, antes dos seus 7-8 anos, por adultos que também estavam rodando o próprio ruído sem saber. Não é caráter, é condicionamento herdado.',
  extraV3: ' — o mesmo tipo de coisa que ninguém escolhe, mas todo mundo carrega até alguém mostrar que dá pra desligar.',
  fecho:
    'Eu vi esse mesmo padrão se repetir, quase com as mesmas palavras, em milhares de relatos de pessoas tentando exatamente o que você está tentando agora. E, se serve de alguma coisa: você não está só nessa.',
};

export const AUTORIDADE = {
  corpo:
    'Eu passei por esse padrão antes de conseguir dar nome ao que estava acontecendo — e liderei a análise de um corpus de milhares de relatos reais até ver que não era só comigo. E ele conversa com o que Stanford, UPenn e Johns Hopkins documentam há décadas: o que você aprende antes dos 8 anos continua decidindo resultados adultos.',
  fontesLabel: 'Dweck 1988 · Seligman 1975 · Ainsworth 1970 — toque pra ver as fontes',
  extraV3: 'A de Ainsworth, aliás, é a que mais dialoga com o seu padrão: como o que se forma na infância se repete na vida adulta sem a pessoa notar a origem.',
};

export const FECHO_3SIM = {
  sim1: {
    pergunta: (fragB: string) =>
      `Você me contou o que acha que trava você de verdade. E baseado em tudo que apareceu aqui: <b>${fragB}</b> é o que mais pesa em você hoje. Faz sentido?`,
    botao: 'Faz sentido',
    objecao: 'Tudo bem — diagnóstico bom não pede fé, pede leitura. Vem ver o resto e tira a prova você mesmo.',
    objecaoBotao: 'Continuar',
  },
  sim2: {
    pergunta: (frag: string) => `E enquanto essa interferência continua ligada, <b>${frag}</b>. Também faz sentido, né?`,
    botao: 'Sim',
    objecao: 'Justo. Só repara numa coisa: quem marcou essa área lá atrás foi você — eu só estou lendo de volta.',
    objecaoBotao: 'Continuar',
  },
  sim3: {
    pergunta:
      'Então a pergunta final: se existisse um processo com nome, começo e fim — o <b>Protocolo de Resintonização</b> — feito pra localizar a interferência que bloqueia o seu sinal e desligá-la, passo a passo, sem exigir mais esforço seu… era isso que você estava procurando?',
    botao: 'Era isso',
    objecao: 'Sem problema. É pra isso que a garantia existe: você entra, testa, e quem decide se fez sentido é você — não eu.',
    objecaoBotao: 'Ver como funciona',
  },
  recap: (fragP8: string, fragP4C: string) =>
    `Você quer <b>${fragP8}</b> — e ainda não tem porque <b>${fragP4C}</b> segue alimentando a interferência que bloqueia o seu sinal. O Protocolo de Resintonização foi montado pra desligar essa interferência — começando hoje.`,
  candid:
    'E vale repetir o que eu disse lá atrás: aqui não tem mágica instantânea. São 8 semanas pra remover uma interferência específica — com começo, meio e fim.',
  cta: 'Quero começar minha Resintonização',
  posClique: 'Ao tocar, você vai pra página de escolha do plano — pagamento em ambiente seguro, acesso no seu e-mail em poucos minutos.',
  saida: 'Prefiro reler meu diagnóstico',
};

/* ── Variações do resultado (RESULTADO_V2, seções 3-5) ── */
export interface Variacao {
  nome: string;
  barnumL1: string;
  barnumL2: string;
  coda: string;
  mecanizacao: (fragA: string) => string;
  metafora: string[];
  diagrama: { p1De: string; p1Bloco: string; p1Para: string; p2Texto: string };
  futurePacingFecho: string;
  prova: { intro: string; original: string; traducao: string };
}

export const VARIACOES: Record<Vilao, Variacao> = {
  FaltaConcreta: {
    nome: 'Padrão de Escassez',
    barnumL1: 'você se cobra mais do que demonstra.',
    barnumL2: 'Quando entra um dinheiro, o alívio dura pouco — a pergunta "quanto tempo até acabar?" chega antes de você conseguir aproveitar.',
    coda: 'Mesmo assim, você não desistiu — só cansou de tentar por conta própria.',
    mecanizacao: (fragA) =>
      `Traduzindo: no seu caso, o bloqueio aparece com mais força bem onde dinheiro e estabilidade deveriam estar. E esforço não explica isso. Por trás, existe uma interferência instalada cedo — antes de você poder escolher — cortando o pedido antes de ele ser recebido de verdade. Você me contou ${fragA}. E os relatos que analisamos contam essa mesma história por milhares de bocas diferentes: gente fazendo tudo certo e vendo o dinheiro nunca sobrar.`,
    metafora: [
      'É meio que um rádio sintonizado numa estação com estática: a música — o dinheiro, a estabilidade — está lá, tentando chegar até você. Mas a interferência distorce o sinal antes de ele virar resultado.',
      'O problema nunca foi a música. Foi a sintonia.',
    ],
    diagrama: {
      p1De: 'Você — o pedido',
      p1Bloco: 'A interferência (instalada cedo)',
      p1Para: 'O resultado — dinheiro, estabilidade',
      p2Texto: 'A mesma linha, sem a interferência — o sinal chegando inteiro.',
    },
    futurePacingFecho: 'não porque você "ficou mais motivado", mas porque a interferência que impedia o dinheiro de sobrar não está mais lá.',
    prova: {
      intro: 'Entre os relatos do estudo, os que descrevem o Padrão de Escassez falam de perda concreta, uma atrás da outra — como este:',
      original: '"Lost my job, my brand new car got totaled while being parked, my 7 year relationship ended..."',
      traducao: '"Perdi meu emprego, meu carro zero foi destruído estacionado, meu relacionamento de 7 anos acabou..."',
    },
  },
  SaudeEsgotamento: {
    nome: 'Padrão de Esgotamento',
    barnumL1: 'você dá muito mais do que recebe de volta.',
    barnumL2: 'Tem uma parte de você que sabe que precisa parar, mas não se permite.',
    coda: 'Mesmo no limite, você ainda está aqui — isso já diz muito.',
    mecanizacao: (fragA) =>
      `Traduzindo: no seu caso, o bloqueio aparece como um ciclo de esforço sem reposição. Você tenta, gasta energia — e o resultado não volta na mesma proporção, porque a interferência consome o que devia ser reposto. Você me contou ${fragA}. E esse ciclo se repete de forma consistente no corpus que analisamos: gente exausta por dentro e por fora, mesmo fazendo "tudo certo".`,
    metafora: [
      'É meio que um rádio sintonizado numa estação com estática: o sinal está tentando passar, mas a interferência consome a energia antes de ela virar resultado — por isso o cansaço não passa, mesmo com tudo feito certo.',
      'O problema nunca foi o esforço. Foi a sintonia.',
    ],
    diagrama: {
      p1De: 'Você — o esforço',
      p1Bloco: 'A interferência (consome antes de repor)',
      p1Para: 'O resultado — sempre menor que o esforço',
      p2Texto: 'O esforço chega inteiro — e a reposição volta.',
    },
    futurePacingFecho: 'não porque você "achou energia de onde não tinha", mas porque a interferência que consumia a sua energia não está mais lá.',
    prova: {
      intro: 'Entre os relatos do estudo, os que descrevem o Padrão de Esgotamento falam de perda em cima de perda — com a energia indo junto. Como este:',
      original: '"2022 has been very hard, I\'ve lost some family members, some have gotten some grim diagnosis, and I\'ll be losing a second job due to covid pay issues."',
      traducao: '"2022 foi muito difícil. Perdi familiares, outros receberam diagnósticos sombrios, e vou perder um segundo emprego por questões de pagamento na pandemia."',
    },
  },
  TravamentoInterno: {
    nome: 'Padrão Herdado',
    barnumL1: 'você se cobra mais do que demonstra.',
    barnumL2: 'Você reconhece o padrão se repetindo — de longe, antes de todo mundo — e é isso que mais cansa.',
    coda: 'Mesmo assim, você não desistiu — só cansou de carregar isso por conta própria.',
    mecanizacao: (fragA) =>
      `Traduzindo: no seu caso, a interferência foi instalada por dentro, cedo, antes de você poder escolher — herdada de quem veio antes. Você me contou ${fragA}. E esse é o padrão mais recorrente do corpus inteiro: uma crença herdada aparecendo em relato atrás de relato — "eu não sou suficiente", "tenho medo de conseguir e perder de novo" — agindo antes mesmo de a tentativa começar.`,
    metafora: [
      'É meio que um rádio que saiu da fábrica sintonizado numa estação com estática: ninguém escolheu essa estática, ela já veio configurada. E estática não é defeito do aparelho — um rádio assim só precisa ser resintonizado.',
      'O problema nunca foi você. Foi a sintonia.',
    ],
    diagrama: {
      p1De: 'Você — o pedido',
      p1Bloco: 'A interferência (herdada, instalada cedo)',
      p1Para: 'O resultado — escapando no último passo',
      p2Texto: 'A interferência fora do caminho — o resultado chegando inteiro.',
    },
    futurePacingFecho: 'não porque você "decidiu acreditar mais em si", mas porque a interferência que plantava a dúvida não está mais lá.',
    prova: {
      intro: 'Entre os relatos do estudo, os que descrevem o Padrão Herdado falam menos do que falta fora — e mais do que pesa dentro. Como este:',
      original: '"Even if I\'m in company, I feel completely alone, and like I don\'t \'fit in\'."',
      traducao: '"Mesmo acompanhado, me sinto completamente só — como se eu não \'me encaixasse\'."',
    },
  },
};

export const RESULTADO_ABERTURA = {
  titulo: (nome: string) => `${nome}, seu diagnóstico está pronto.`,
  dado:
    'Antes de abrir, de onde ele veio: nos milhares de relatos reais que analisamos, a mesma experiência de base se repete — fazer tudo certo e, ainda assim, ver algo invisível travar o resultado. Esse padrão tem nome. E o seu aparece logo abaixo.',
  barnumIntro: 'Primeiro, três coisas que a gente percebeu em você:',
};

export const OPEN_LOOP = 'E sintonia se corrige. Existe um processo pra isso — e ele tem nome. Eu chego lá antes do fim desta página.';

export const FUTURE_PACING_INTRO =
  'Antes de imaginar qualquer coisa, um lembrete: motivação você sempre teve — o que está em jogo aqui é tirar uma interferência do caminho. Agora imagine daqui a algumas semanas:';

export const DIAGRAMA_LEGENDA = 'Ilustração conceitual do mecanismo — não são dados de usuários.';
export const PROVA_TAG = 'relato público analisado no estudo — não é avaliação do produto';
export const CARD_MOTIVACAO = {
  titulo: 'Sua motivação, nas suas palavras:',
  rodape: 'Foi isso que você marcou — e este diagnóstico foi montado em cima disso.',
};
