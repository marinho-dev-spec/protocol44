# Protocol 44

Site institucional, quiz em inglês e prática escrita. Adequação V8: copy centralizada em JSON, resultado calculado por dois eixos e identidade visual preservada.

## Stack atual

As rotas atuais são páginas Astro estáticas, com Tailwind CSS v4 como camada de utilitários (`src/styles/tailwind.css`) e as folhas da identidade para os componentes do funil. GSAP controla as entradas curtas da home, VSL e quiz; `prefers-reduced-motion` desliga o movimento sem esconder conteúdo ou bloquear a navegação. O bundle continua sem backend e sem captura de email.

## Rotas e estado

| Rota | Conteúdo |
|---|---|
| `/` | Apresentação, três fases, exemplo interativo e FAQ |
| `/quiz` | Dez perguntas, três reforços, atividade opcional e reflexão calculada |
| `/vsl` | Apresentação e prática escrita com download local |
| `/quiz-v4` | Versão documental anterior em português |
| `/checkout` | Página legada, sem pagamento ativo |

O vídeo e o programa completo estão em preparação. A primeira unidade própria e materiais de aplicação estão escritos; as gravações não estão disponíveis. `salesOpen=false`. Sem backend de leads ou captura de email. A publicação mantém `noindex,nofollow`. Respostas e nome opcional ficam na aba; a escrita da prática só é guardada se a pessoa baixar o arquivo.

## Executar

Node.js 22 ou 24 e npm.

```sh
npm ci
npm run dev -- --host 127.0.0.1 --port 4322
```

```sh
npm test
npm run build
npm run preview -- --host 127.0.0.1 --port 4322
```

O teste de lógica usa esbuild, já presente na árvore de dependências do Astro. Para teste de navegador, disponibilize Playwright e seu navegador, ou use `P44_PLAYWRIGHT_MODULE` e `P44_CHROME_PATH` da estação.

```sh
node scripts/verify-v8.cjs
```

Variáveis opcionais: `P44_BASE_URL`, `P44_REVIEW_DIR`, `P44_PLAYWRIGHT_MODULE`, `P44_CHROME_PATH`. A compilação de produção não depende de Playwright. Scripts V4/V5 permanecem históricos e não verificam o contrato atual.

## Fonte de conteúdo e lógica

Editar `src/content/funnel-content.json`: textos das páginas, perguntas, opções, pesos, resultados, mensagens, referências e tokens de marca. O arquivo é importado pela interface. Não editar frases nos componentes. A marca gráfica continua sendo um ativo SVG: uma eventual troca de marca exige atualizar também os arquivos de logo, além do token.

`src/lib/quiz-v8.ts` implementa pontuação, empate e validação de sessão. Persona só adapta a cena; tema define a reflexão. Empate não resolvido/zero fica aberto. Q3 é múltipla, idade/nome são opcionais, Q9 escolhe a atividade pulável. A pessoa pode revisar respostas. “Blocked Signal” é uma metáfora; não há probabilidade individual, diagnóstico ou efeito clínico alegado.

`src/lib/funnel-config.ts` define vídeo, legendas, transcrição, URL de checkout e abertura de vendas. Não abrir vendas sem entrega e condições disponíveis.

## Documentação

- [Adequação e decisões](docs/ADEQUACAO_V8.md)
- [Copy pública](docs/COPY_V8_EN.md)
- [Lógica](docs/LOGICA_V8.md)
- [Fontes e alegações](docs/FONTES_E_ALEGACOES_V8.md)
- [Oferta e escala](docs/OFERTA_ESCALAVEL.md)
- [Página de venda e checkout — rascunho](docs/V8_VENDA-E-CHECKOUT-EN.md)
- [VSL — roteiro](docs/V8_VSL-EN.md)
- [Campanhas — rascunhos](docs/V8_CAMPANHAS-EN.md)
- [Validação](docs/VALIDACAO_V8.md)
- [Publicação](DEPLOYMENT.md)

Documentos V5/V6 são históricos. Estudos completos e fontes locais continuam no acervo do projeto maior; os livros, cursos de referência e comentários brutos não são distribuídos neste repositório.

## Vercel

Repositório conectado: `marinho-dev-spec/protocol44`, branch `main`, raiz `./`. `vercel.json` configura Astro, `npm run build` e `dist`. O push na main aciona a integração. Datas, commit e verificação pública ficam em DEPLOYMENT.md. Credenciais, arquivos de ambiente, caches e capturas locais são ignorados pelo Git.
