# Protocol 44

Site institucional, quiz em inglês e primeira prática escrita do Protocol 44. Construído com Astro 5, TypeScript e fontes locais. Copy V6: Stop starting over. Make your progress last. Oferta e perguntas mais diretas, mantendo a identidade natural V5.1 e a lógica do quiz V5.

## Rotas

| Rota | Conteúdo |
|---|---|
| `/` | Apresentação do programa, exemplo interativo e FAQ |
| `/quiz` | Dez perguntas, duas pontes, resultado transparente e escolha de foco |
| `/vsl` | Primeira prática utilizável, formulário e download local da reflexão |
| `/quiz-v4` | Versão documental anterior em português |
| `/checkout` | Página legada, sem integração de pagamento |

O vídeo e os áudios estão em preparação. Apenas a primeira unidade escrita existe. `salesOpen=false`; não há cobrança ou backend de leads. A publicação mantém `noindex,nofollow` enquanto o produto é preparado. Respostas do quiz ficam no `sessionStorage`; a escrita do exercício só é guardada se a pessoa baixar o arquivo. A fotografia e o exemplo são ilustrativos.

## Executar

Node.js 22 ou 24, npm.

```sh
npm ci
npm run dev -- --host 127.0.0.1 --port 4322
```

Build e prévia da compilação:

```sh
npm run build
npm run preview -- --host 127.0.0.1 --port 4322
```

Use desenvolvimento ou preview por vez na mesma porta. Execute o build antes dos testes, sem fazê-los simultaneamente no servidor de desenvolvimento.

## Vercel

Importe `marinho-dev-spec/protocol44`, branch `main`, raiz `./`. O arquivo `vercel.json` define Astro, `npm run build` e saída `dist`. Não são necessárias variáveis de ambiente ou adaptador de servidor para esta compilação estática.

Com a CLI autenticada, `vercel --prod` publica o projeto. Os estados e URLs confirmados devem ser registrados em `DEPLOYMENT.md`. O Git não inclui `node_modules`, `dist`, credenciais, caches ou capturas locais.

## Configuração do produto

`src/lib/funnel-config.ts` centraliza `videoUrl`, `captionsUrl`, `transcript`, `checkoutUrl` e `salesOpen`. A URL de vídeo deve ser MP4/WebM direta ou arquivo local; embeds precisam de componente próprio. Sem vídeo, aparece um aviso compacto e a prática escrita fica disponível.

`src/lib/quiz-v5.ts` contém perguntas e regras. A escolha explícita de foco lidera; se a pessoa pede sugestão, contam-se os temas das perguntas 3–5. Empate ou ausência mantém o resultado aberto. A pessoa pode revisar respostas e mudar de foco.

## Verificação

Build aprovado. A revisão local V5.1 passou em 13 grupos, dez capturas, larguras de 320 a 1440 px e zero erros de execução. Inclui percurso completo, retomada, limpeza, três focos e resultado aberto, contexto escolhido/sugerido, teclado, movimento reduzido, formulário e conteúdo do download.

O teste usa Playwright e esbuild. Instale Playwright na sua estação para executá-lo; a compilação da Vercel não depende dele. Com navegador do Playwright instalado:

```sh
node scripts/verify-v5.cjs
```

Variáveis opcionais: `P44_BASE_URL` (padrão `http://127.0.0.1:4322`), `P44_REVIEW_DIR`, `P44_PLAYWRIGHT_MODULE` e `P44_CHROME_PATH`. Evidência local em `.impeccable/review/natural`, ignorada no Git. O teste antigo `verify-funnel.cjs` refere-se à V4 histórica.

## Referências do projeto

- `PRODUCT.md`: propósito, público e limites de disponibilidade.
- `DESIGN.md`: sistema visual atual; sidecar em `.impeccable/design.json`.
- `NATURAL-REFINEMENT.md`: direção da V5.1 e revisão visual.
- `docs/FUNIL_V6_OFERTA_EN.md`: copy consolidada atual.
- `docs/OFERTA_PRINCIPAL_V6.md`: promessa, benefícios e composição da oferta.
- `docs/FUNIL_V5_1_NATURAL_EN.md`: copy da revisão anterior.
- `FUNNEL-V5-BRIEF.md` e `FUNNEL-BRIEF.md`: etapas anteriores, mantidas como histórico.

O repositório contém o projeto do site, ativos e documentação correspondente. O acervo bruto de pesquisa, cursos de referência, áudios e notas privadas do projeto maior permanece fora desta distribuição.
