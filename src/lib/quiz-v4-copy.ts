/**
 * V4 literal solicitada pelo titular em 07/09/2026.
 * Fontes: 02-COPY-FUNIL/QUIZ_V4_PROPOSTA.md e RESULTADO_V2_PROPOSTA.md.
 * O módulo data.ts já contém as perguntas literais. As diferenças abaixo restauram
 * os trechos documentais que a auditoria anterior havia suavizado no protótipo.
 * Os números da copy são transcrição do documento, não uma nova validação do corpus.
 */
export * from './data';
import * as original from './data';
export const REFORCO1 = { ...original.REFORCO1, prova: 'Baseado em 12.783 relatos reais analisados' };
export const REFORCO2 = { ...original.REFORCO2, corpo: 'Em mais de 12 mil relatos analisados, 97,87% descrevem a mesma sensação: fazer tudo certo e mesmo assim sentir que algo invisível trava o resultado. Se isso soa familiar demais pra ser coincidência, é porque não é.' };
export const REFORCO3 = { ...original.REFORCO3, sinal3: 'Foram 12,7 mil relatos reais, com checagem cruzada de viés. O padrão se repete de um jeito consistente demais pra ser acaso.' };
export const AUTORIDADE = { ...original.AUTORIDADE, corpo: 'Eu passei por esse padrão antes de conseguir dar nome ao que estava acontecendo — e liderei a análise de um corpus de 12,7 mil relatos reais até ver que não era só comigo. E ele conversa com o que Stanford, UPenn e Johns Hopkins documentam há décadas: o que você aprende antes dos 8 anos continua decidindo resultados adultos.' };
export const RESULTADO_ABERTURA = { ...original.RESULTADO_ABERTURA, dado: 'Antes de abrir, o dado que deu origem a ele: dos 12.783 relatos reais que analisamos, 97,87% descrevem a mesma experiência de base — fazer tudo certo e, ainda assim, ver algo invisível travar o resultado. Esse padrão tem nome. E o seu aparece logo abaixo.' };
