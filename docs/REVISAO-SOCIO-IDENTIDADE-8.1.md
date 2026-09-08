# Protocol 44 — revisão do sócio e identidade 8.1

Data: 8 de setembro de 2026. Fonte pública de copy: `src/content/funnel-content.json` (8.1). Motor e sessão V8 preservados, pois os IDs, pesos, tipos e temas das dez perguntas não mudaram.

## Fontes e decisões do titular

- [Funil enviado pelo sócio](https://claude.ai/code/artifact/a2c46e46-d4cd-4bbb-81b5-21e246e96a40): HTML completo lido, incluindo perguntas, roteamento, reforços, resultados e proposta de preço. Hash do arquivo consultado em `source.partnerReview` no JSON.
- `IDENTIDADE VISUAL.rtf`: lido integralmente. A ideia aproveitada é reduzir o ruído da composição ao longo do percurso.
- Resposta explícita do titular: **“Começar escuro e revelar um resultado claro, com menos ruído.”** Logo 44 e laranja mantidos.
- Escolha anterior de transformação central: **destravar decisões sobre dinheiro e trabalho**. A home e a abertura do quiz adotam esse foco, mantendo os outros contextos do questionário do sócio.
- Pedido posterior: pesquisar no Pinterest referências de imagens, paletas e ideias para o site.

## Referências visuais consultadas

1. [Orange and Black Color Palette](https://www.pinterest.com/pin/orange-and-black-color-palette--13159023904326298/): contraste entre preto, laranja e branco. A combinação orienta a hierarquia; não substitui o laranja já aprovado da marca.
2. [Orange and Grey Color Palette](https://www.pinterest.com/pin/orange-and-grey-color-palette--555279829067698574/): neutros para dar espaço ao acento, sem introduzir uma segunda cor de ação.
3. [Light & Shadow](https://www.pinterest.com/aileenplk/light-shadow/): direção de imagem baseada em luz natural, enquadramento e áreas de respiro.
4. [Pinterest Palette 2026, fonte oficial](https://newsroom.pinterest.com/pdf/pinterest-palette-2026-pdf/): consulta contextual; não é evidência de preferência do nosso público ou de conversão.

O Pinterest exigiu login ao abrir um pin no navegador. As referências públicas foram encontradas pela pesquisa e pelos resultados de imagens. Não houve acesso a painéis privados, nem download ou republicação de imagens dos pins. A fotografia existente da marca foi preservada. O desenho de sinal é geometria SVG original no código.

## O que foi aplicado ou adaptado

| Referência do sócio | Implementação |
|---|---|
| Dez perguntas, dois eixos, reforços e resultado contextual | Estrutura mantida. Perguntas com linguagem mais natural e menos acusatória; IDs e pesos iguais. |
| Identificação antes de apresentar o mecanismo | Abertura com dinheiro, trabalho e conversa adiada; mecanismo aparece depois. |
| Revelações em Q5 e Q8 | Conexões entre respostas reais, sem previsão encenada. Aparecem junto à próxima pergunta. |
| Três tipos de resultado | Dinheiro/estabilidade, energia/capacidade e pensamentos/expectativas. Empate ou ausência de sinais permanece aberto. |
| Experiência sensorial | Atividade opcional com Yes, Somewhat, No e Skip; não vira teste de sensibilidade nem altera pontuação. |
| Comparação visual entre antes e depois | Duas ilustrações do exercício, explicitamente sem dados de eficácia ou progresso previsto. |
| Persona e futuro desejado | Exemplos condicionados às respostas selecionadas, sem presumir biografia, causa ou renda. |
| Convite ao produto no resultado | Explicação do programa, formato planejado e link para a oferta. CTA para a prática também no início do resultado. |
| Texto pessoal em primeira pessoa | Conversa direta com o visitante, sem inventar a história de um fundador. |
| 97,87%, gráfico de oito semanas e depoimentos com estrelas | Não publicados: nenhuma base de cálculo, experimento ou depoimento de cliente foi fornecido. O corpus serve como pesquisa de linguagem. |
| Nome, email e checkout | Nome opcional local. Sem promessa de envio por email ou pagamento inexistente. |
| CAD$57.99 | Registrado como proposta comercial do sócio. Difere da hipótese anterior C$129/US$97 e não foi apresentado como preço final validado. Vendas continuam fechadas. |

## Oferta apresentada

**Stop putting your next move on hold.**

The money decision. The career move. The conversation you keep rehearsing. Give one of them a next step you can actually take.

Programa de desenvolvimento pessoal em preparação, com 22 vídeos e 22 práticas em áudio planejados em três fases:

1. **The Reading:** descrever a situação e distinguir o que aconteceu do que a pessoa supôs.
2. **The Move:** preparar uma pergunta, limite ou ação que caiba nas circunstâncias reais.
3. **The Hold:** revisar a tentativa e encontrar uma maneira de retomar depois de um contratempo.

A prova disponível na página é uma amostra escrita utilizável e um exemplo identificado como fictício. Não há promessa de renda, cura, transformação garantida, prazo universal ou eficácia validada. Vídeo, gravações, suporte, prazo de acesso, garantia e preço final precisam estar definidos antes da abertura de vendas.

## Contrato visual implementado

**Modo:** home persuade; quiz opera com narrativa; resultado e prática priorizam leitura.

**Primeiro viewport:** logo 44, título principal, situação concreta, CTA laranja e status de disponibilidade. Home com fotografia humana em luz natural. Quiz com linhas que se organizam em direção ao quadrado laranja da marca.

**Paleta:** grafite `#141619`, intermediários `#20272B` e `#303A3D`, resultado em papel `#F5F3EE`, ação `#FF4D17`. Texto escuro `#1C2022`; acento de texto `#B73510` sobre papel e `#FF754F` sobre escuro.

**Tipografia:** Manrope e Source Sans 3 locais. Hierarquia editorial, sem importar as fontes sugeridas no RTF ou criar nova logo. Botões estáveis, sem flashes, contagem artificial, cronômetros ou animação compulsória.

**Assinatura:** linhas SVG originais convergem para uma direção. Uma animação de traço na abertura, com duração finita; movimento reduzido mostra a composição completa. Os estágios visuais seguem a tela atual, nunca a pontuação ou uma suposta melhora psicológica. Revisar respostas e voltar restaura o estágio correspondente.

**Responsividade:** duas colunas na abertura desktop, uma coluna no celular; opções grandes com radio/checkbox nativos; resultado claro com resumo das respostas e CTA para a amostra. Papel nos textos longos do site e na prática.

**Escopo de compatibilidade:** páginas `/`, `/quiz`, `/vsl`. A variante documental V4 e o checkout legado não recebem a nova paleta.

## Verificação

Build Astro e 61 testes de lógica passaram. Treze grupos de navegador passaram localmente: caminhos completos, empate e zero, resposta obrigatória, seleção múltipla, idade, nome escapado, revisão, reload, prática, download, privacidade, armazenamento indisponível, JavaScript desativado e movimento reduzido. Evidência em `.impeccable/review/v8.1`.

Os testes demonstram funcionamento do software. Não medem vendas, eficácia do produto ou preferência do mercado.
