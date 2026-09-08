# Quiz ajustado à altura da tela — 8 de setembro de 2026

**Publicado e verificado em produção.** [Abrir quiz](https://protocol44.vercel.app/quiz).

Commit da aplicação: 9ba59c96bb4df2a1c953f836c98fed21e142c199. [Deploy Vercel](https://vercel.com/odairmarinho2019-5298s-projects/protocol44/CVxgvwFmnP7xtAwqiqyzbEmJ78bk), status success. HTTP 200 e marcador data-layout=viewport conferidos no domínio público.

Perguntas, opções completas e ação de avançar se ajustam à mesma tela. Cabeçalho/progresso compactos, espaço adaptado ao conteúdo, introdução mobile simplificada e terceira explicação em duas etapas. Pontuação e texto das perguntas preservados. Voltar percorre as duas etapas; limpar respostas fecha o painel de privacidade.

105 combinações de tela e viewport passaram localmente e **105 em produção, sem falhas**: 390×844, 375×667, 360×640, 320×568 e 1366×768. Cobertura inclui os dez enunciados, notas condicionais, atividades, reforços, nome e introdução, limites do texto dentro de cada opção e navegação entre as partes. O teste geral do funil passou nos 13 grupos locais. [Resumo público](docs/verification-quiz-viewport-production.json). [Decisões e limites](docs/QUIZ-VIEWPORT-2026-09-08.md).

O resultado e os detalhes expandidos são páginas de leitura; zoom e teclado conservam acesso por rolagem quando necessário. O registro de documentação posterior não modifica a aplicação verificada.

---

## Histórico

# Publicação Canadá / Muse — 8 de setembro de 2026

**Publicado e verificado no domínio público.**

- [Site](https://protocol44.vercel.app/) · [Quiz](https://protocol44.vercel.app/quiz) · [Prática](https://protocol44.vercel.app/vsl).
- Commit da aplicação: `c49a94412661c148af40d8929fb0adc167869780`, publicado na main do repositório marinho-dev-spec/protocol44.
- [Deploy Vercel](https://vercel.com/odairmarinho2019-5298s-projects/protocol44/9pGGifvXav9uyRwTSVGNgCxzACpH), status `success`.
- Três rotas com HTTP 200 e marcador `p44-visual-revision=canada-muse-2026-09-08`; imagem responsiva nova também servida com HTTP 200.

O titular escolheu [Muse](https://choosemuse.com/) como referência de estilo após pedir referências para o público canadense. A revisão substitui a abstração óptica do hero por fotografia ilustrativa original em grande escala, reorganiza a apresentação das fases, destaca a prática real e aplica a mesma linguagem ao quiz e à página de prática. Logo e paleta final do sócio preservadas; entrada escura, resultado claro. Stack Astro, Tailwind CSS e GSAP.

Validação: build; 62 testes de lógica; 13 grupos de navegador local e **13 em produção, sem erros**. Inclui percursos completos, retomada, revisão, opções neutras, atividades opcionais, download real e ausência de envio de respostas. [Relatório desta produção](docs/verification-canada-muse-production.json). Também conferidos 320/768/1024px nas três rotas, sete cenas em desktop/celular, controles por teclado e mudança de movimento reduzido durante animações.

Vídeo e programa integral continuam em preparação; prática escrita disponível, vendas fechadas. Não há resultado de conversão medido. Referências, decisões e revisão visual: [direção Canadá / Muse](docs/DESIGN-CANADA-MUSE-2026-09-08.md).

O registro de documentação posterior não modifica a aplicação verificada.

---

## Histórico

# Publicação 8.2 + polida visual + stack Astro/Tailwind/GSAP — 8 de setembro de 2026

**Publicado e verificado em produção.**

- [Site](https://protocol44.vercel.app/)
- [Quiz](https://protocol44.vercel.app/quiz)
- [Apresentação e prática](https://protocol44.vercel.app/vsl)
- [Repositório](https://github.com/marinho-dev-spec/protocol44)
- Commit da aplicação visual verificado: `4133876ea9c6e9bd6bdbbe313910c288db8e2601`.
- Commit da integração Astro/Tailwind/GSAP verificado: `ce73fc092ddf2a8de6b355d769ce796d54fc3f31`.
- [Deploy Vercel](https://vercel.com/odairmarinho2019-5298s-projects/protocol44/9GHi78noHJdfJeJefoRTtXqTmncy), status `success` nos contextos `Vercel – protocol44` e `Vercel – acorde-quiz`.
- HTTP 200 e `p44-content-version=8.2` confirmados nas três rotas. Nova imagem WebP respondeu HTTP 200 com tipo `image/webp`.

A aplicação segue a última paleta explícita de IDENTIDADE VISUAL.rtf: Deep Void/mint/crimson no início, branco/azul/verde no resultado, Montserrat e Plus Jakarta Sans. Pesquisa no Pinterest documentada; imagem óptica original na abertura, fotografia ilustrativa junto ao exemplo. A logo escolhida permanece. A polida acrescenta uma moldura fina, raio de 16 px no desktop/12 px no mobile e halo mint discreto somente na arte óptica do herói, sem alterar a copy 8.2 ou o funcionamento do quiz.

**Validação:** build Astro com Tailwind v4; 62 testes de lógica; 13 grupos de navegador locais e os mesmos 13 no endereço público, sem erros. Cobertura: resultados, opções neutras, revisão/retomada, múltipla seleção, idade/nome opcionais, atividades, prática, download, privacidade, armazenamento indisponível, JavaScript desativado e movimento reduzido. [Relatório público](docs/verification-v8.2-production.json). Capturas locais de sete cenas em desktop/celular, 20 imagens, conferidas após a polida. A revisão de acabamento classificou a alteração como `ship`; as entradas de página e de tela do quiz usam GSAP com fallback de movimento reduzido.

Vídeo e programa completo seguem em preparação; amostra escrita disponível, vendas fechadas, páginas com noindex. A atualização não constitui comprovação de eficácia ou conversão comercial.

O commit posterior de documentação registra esta conferência e não altera a aplicação verificada. [Fontes visuais, aplicação e ativos](docs/IDENTIDADE-8.2-PINTEREST.md).

---

## Histórico de publicações anteriores

# Publicação V8 — 7 de setembro de 2026

**Publicado e verificado em produção.**

- Site: https://protocol44.vercel.app/
- Quiz: https://protocol44.vercel.app/quiz
- Apresentação e prática: https://protocol44.vercel.app/vsl
- Repositório: https://github.com/marinho-dev-spec/protocol44
- Commit da aplicação verificado: `c0e4ccc9f7fbc3664a06426a3f611d760c517fb9`.
- Publicação via push na `main` e integração automática existente com a Vercel.
- HTTP 200 e marcador `p44-content-version=8.0` conferidos no domínio público.
- Script público do quiz: `Quiz.astro_astro_type_script_index_0_lang.qDbsXt5h.js`.

A adequação centraliza a copy em JSON, restaura os dois eixos ponderados, acrescenta seleção múltipla, três reforços, atividade opcional, nome local opcional e três reflexões com fallback neutro. Identidade visual preservada. O mecanismo é apresentado como metáfora; percentuais sem cálculo, autobiografia sem autor e gráficos de eficácia sem dados não integram a oferta pública.

**Validação:** build concluído; 59 testes de lógica; 13 grupos de navegador no endereço público, sem erros. Foram percorridas as três linhas de resultado, empate e zero, atividades Yes/Somewhat/No/Skip, contexto na prática, download, retomada, limpeza, movimento reduzido, storage indisponível e fallback sem JavaScript. O teste aguarda o contexto da prática carregar ao navegar pela rede. Capturas em `.impeccable/review/v8-production`; relatório distribuído em [docs/verification-v8-production.json](docs/verification-v8-production.json).

A publicação mantém a prévia gratuita, `noindex,nofollow` e vendas fechadas. Vídeo e programa completo estão em produção. Não existe coleta de email ou pagamento novo. Nome e respostas ficam na aba; a escrita da prática só fica com a pessoa se ela baixar o arquivo. Preços e condições em documentos de venda são propostas para a entrega completa.

O commit posterior de documentação registra esta conferência e a sincronização do teste de navegador; não modifica a aplicação verificada.

---

## Histórico anterior

# Publicação — 7 de setembro de 2026

Atualização editorial V6: promessa, apresentação da oferta, perguntas, resultados e VSL revisados com base no acervo e nos comentários. Build local e 13 grupos de verificação aprovados; dez capturas em .impeccable/review/offer-v6. Motor do quiz e configuração comercial preservados. A atualização segue pelo deploy automático da main.

Vercel: **READY**, produção.

- Site: https://protocol44.vercel.app
- Quiz: https://protocol44.vercel.app/quiz
- Prática/VSL: https://protocol44.vercel.app/vsl
- Deploy inicial: `dpl_7XP2GjhochmdR1vkWbw9MBXt8TV1`
- Deploy automático confirmado após primeiro push: `dpl_7TLmB2J89MquaRyMAN4zurdJc73i`, **READY**, com alias `protocol44.vercel.app`.
- Projeto: `protocol44`, na equipe `odairmarinho2019-5298s-projects`.
- Repositório conectado: https://github.com/marinho-dev-spec/protocol44
- Build remoto: Astro, `npm run build`, saída estática `dist`.

O deploy inicial foi enviado pela CLI. O primeiro commit `11f7801` foi publicado na branch `main`; o hash remoto foi conferido. A integração com o GitHub gerou automaticamente um segundo deploy de produção, confirmado como READY. Novos pushes na `main` acionam a Vercel.

Verificação contra o endereço público: **13 grupos aprovados, dez capturas, zero erros**. Inclui o percurso completo do quiz, contexto na prática, download, retorno, retomada, limpeza de sessão, mobile e movimento reduzido. Evidência local: `.impeccable/review/production/VERIFICACAO-V5.json`.

A publicação mantém `noindex,nofollow` e vendas desativadas. Vídeo, áudios e restante do programa continuam em preparação. Nenhuma credencial ou arquivo `.env` integra o Git ou o upload da aplicação.
