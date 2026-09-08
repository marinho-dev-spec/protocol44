# Validação da adequação V8

7 de setembro de 2026. Build Astro concluído. **59 testes de lógica passaram**, em cinco suítes, incluindo 19 fixtures independentes de pontuação.

## Lógica

Pesos dos dois eixos, empate resolvido por Q4/Q8 apenas entre líderes, pontuação zero, fallback neutro, deduplicação e exclusividade de Q3, notas de consistência sem uso de respostas futuras, idade, sessão corrompida, retomada, revisão e descarte de atividade antiga ao trocar Q9. Teste reproduzível: `npm test`.

## Navegador local

**13 grupos passaram, sem erros de execução.** Percursos completos de dinheiro, capacidade, pensamentos, empate e zero; três atividades opcionais e saídas Yes/Somewhat/No/Skip; escolha múltipla, validação, voltar, recarregar, nome com marcação tratado como texto, reflexão e contexto na prática, download real e ausência de persistência do texto escrito.

Verificadas home, quiz, resultado e prática em 1440 e 390 pixels, sem rolagem horizontal. Testados movimento reduzido, indisponibilidade de storage, fallback sem JavaScript, limpeza e ausência de envio das respostas durante os percursos. A V4 não foi reescrita.

O detector de design retornou observações sobre tamanhos de fonte, cor de borda e raios. São valores do sistema existente ou dos novos controles de seleção múltipla, conferidos nas capturas; não motivaram redesenho. Não se declara auditoria integral por leitor de tela, compatibilidade com todos os navegadores ou conformidade certificada.

Evidência local: `.work/books-copy/qa-v8-local/report.json` na raiz do projeto maior. Script portátil no repositório: `scripts/verify-v8.cjs`, com as mesmas variáveis de ambiente da documentação.

## Conteúdo

Percentual individual e corpus não reproduzido não aparecem como prova. Os DOIs conferem; estudos são descritos como contexto. Não há vídeo fictício, checkout novo, captura de email ou venda ativa. O nome opcional é local. Nenhum teste de software demonstra eficácia, taxa de conversão ou viabilidade da meta comercial.

## Produção

A confirmação do commit, deploy e teste no endereço público é registrada em `DEPLOYMENT.md` após a publicação. Esta validação local não presume que a versão já esteja no ar.
