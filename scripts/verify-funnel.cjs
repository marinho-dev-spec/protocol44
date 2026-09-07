const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const esbuild = require('esbuild');
const {chromium} = require('C:/Users/User/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const out = path.resolve('.impeccable/review');fs.mkdirSync(out,{recursive:true});
esbuild.buildSync({stdin:{contents:"export * from './src/lib/quiz-v4-copy'; export * as E from './src/lib/quiz-v4-engine';",resolveDir:process.cwd(),loader:'ts'},bundle:true,platform:'node',format:'cjs',outfile:path.join(out,'test-lib.cjs')});
const D = require(path.join(out,'test-lib.cjs'));
const source = fs.readFileSync('../../02-COPY-FUNIL/QUIZ_V4_PROPOSTA.md','utf8');
const checks = [];
function check(name,fn) { fn();checks.push(name); }
check('10 perguntas e todas as opções literais da V4',()=>{
  assert.equal(Object.keys(D.PERGUNTAS).length,10);
  for(const q of Object.values(D.PERGUNTAS)) {
    assert(source.includes(q.titulo),q.titulo);
    for(const o of q.opcoes) assert(source.includes(o.label),o.label);
  }
});
check('Abertura, reforços e buffers documentais',()=>{
  for(const str of [D.TELA0.texto,D.TELA0.cta,D.REFORCO1.corpo,D.REFORCO1.prova,D.REFORCO3.sinal3,...Object.values(D.P9_BUFFERS),...D.LOADING.linhas]) assert(source.includes(str),str);
});
check('P5 limitada a um ponto; P4 com peso dois; flags sem pontos',()=>{
  assert.deepEqual(D.E.pontosVilao({respostas:{p3:['p3-isolamento'],p4:['p4-dinheiro'],p5:['p5-suficiente','p5-medo','p5-mesmolugar']}}),{FaltaConcreta:2,SaudeEsgotamento:0,TravamentoInterno:1});
});
check('Resultados Escassez, Esgotamento e Herdado',()=>{
  for(const [id,result] of [['p4-dinheiro','FaltaConcreta'],['p4-esgotamento','SaudeEsgotamento'],['p4-heranca','TravamentoInterno']]) assert.equal(D.E.vilaoFinal({respostas:{p4:[id]}}),result);
  assert.equal(D.E.vilaoFinal({respostas:{}}),'TravamentoInterno');
});
check('Persona respeita P8; motor não revela previsão divergente',()=>{
  assert.equal(D.E.personaFinal({respostas:{p1:['p1-carreira'],p8:['p8-amor']}}),'Familia');
  assert.equal(D.E.revelaP8({respostas:{p8:['p8-amor']}},'Profissional'),false);
  assert.equal(D.E.revelaP5({respostas:{p5:['p5-nenhuma']}},'TravamentoInterno'),false);
});
let store = null;global.sessionStorage={getItem:()=>store,setItem:(_,v)=>store=v};
check('Sessão malformada e salto incompleto tratados',()=>{
  store='bad json';assert.equal(D.E.restaurar(),null);
  store=JSON.stringify({estado:{respostas:{p4:['invalid']}},passo:18});assert.equal(D.E.restaurar().passo,1);
  store=JSON.stringify({estado:{respostas:{}},passo:-1});assert.equal(D.E.restaurar(),null);
});
const images = [], errors=[];
async function shot(page,name) {
  await page.evaluate(()=>document.fonts.ready);
  await page.screenshot({path:path.join(out,name+'.png'),fullPage:true,animations:'disabled'});
  const evidence=await page.evaluate(()=>({width:innerWidth,height:innerHeight,scrollWidth:document.documentElement.scrollWidth,fonts:document.fonts.check('600 20px Manrope'),images:[...document.images].every(i=>i.complete&&i.naturalWidth>0)}));
  assert(evidence.scrollWidth<=evidence.width,`${name}: overflow`);assert(evidence.images,`${name}: image`);images.push({name,...evidence});
}
async function optionalReveal(page,nextId) {
  await page.locator(`#btn-rv, [data-id="${nextId}"]`).first().waitFor();
  if(await page.locator('#btn-rv').count()) await page.locator('#btn-rv').click();
}
async function scenario(browser,type,p4,capture=false) {
  const ctx=await browser.newContext({viewport:{width:390,height:844},reducedMotion:'reduce'});
  const p=await ctx.newPage();p.on('pageerror',e=>errors.push(e.message));
  await p.goto('http://127.0.0.1:4322/quiz');
  if(capture){await shot(p,'v4-intro-mobile');await p.setViewportSize({width:1440,height:1000});await shot(p,'v4-intro-desktop');await p.setViewportSize({width:393,height:852});await shot(p,'v4-intro-user-393');await p.setViewportSize({width:390,height:844});}
  await p.locator('#btn-start').click();
  if(capture){await shot(p,'v4-question-mobile');await p.setViewportSize({width:1440,height:1000});await shot(p,'v4-question-desktop');await p.setViewportSize({width:390,height:844});}
  await p.locator('[data-id="p1-carreira"]').press('Enter');
  await p.locator('[data-id="p2-varias"]').click();
  await p.locator('#btn-multi').waitFor();assert.equal(await p.locator('#btn-multi').isDisabled(),true);
  await p.locator('[data-id="p3-confianca"]').click();
  await p.locator('#btn-multi').click();
  await p.locator(`[data-id="${p4}"]`).click();
  if(capture){await p.locator('#btn-ref').waitFor();await shot(p,'v4-reinforcement-mobile');}
  await p.locator('#btn-ref').click();
  await p.locator('[data-id="p5-suficiente"]').click();
  await p.locator('[data-id="p5-nenhuma"]').click();
  assert.equal(await p.locator('[data-id="p5-suficiente"]').getAttribute('aria-pressed'),'false');
  await p.locator('[data-id="p5-suficiente"]').click();
  assert.equal(await p.locator('[data-id="p5-nenhuma"]').getAttribute('aria-pressed'),'false');
  await p.locator('#btn-multi').click();await optionalReveal(p,'p6-familia');
  await p.locator('[data-id="p6-familia"]').click();await p.locator('#btn-ref').click();
  await p.locator('[data-id="p7-3544"]').click();await p.locator('[data-id="p8-carreira"]').click();await optionalReveal(p,'p9-crente');
  await p.locator(`[data-id="p9-${type}"]`).click();await p.locator('#btn-pular').waitFor();
  if(type==='cetica') await p.locator('[data-palavra="Dinheiro"]').click();
  if(type==='duvida') await p.locator('#btn-pular').click();
  else await p.locator('[data-chk="Sim"]').click();
  await p.locator('#btn-ref').click();await p.locator('[data-id="p10-jantar"]').click();
  await p.locator('#inp-email').fill('qa@example.com');await p.locator('#form-email button').click();
  // Harmless HTML-like text must stay literal in a personalized result.
  await p.locator('#inp-nome').fill(capture?'<b>Teste</b>':'Teste');await p.locator('#form-nome button').click();
  await p.locator('#fecho').waitFor();assert.equal(await p.locator('h1 b').count(),0);
  assert((await p.locator('h1').innerText()).includes(capture?'<b>Teste</b>':'Teste'));
  if(capture) {
    await p.reload();await p.locator('#fecho').waitFor();
    await shot(p,'v4-result-mobile');await p.setViewportSize({width:1440,height:1000});await shot(p,'v4-result-desktop');
    await p.setViewportSize({width:390,height:844});
  }
  for(const n of [1,2,3]) {await p.locator(`[data-sim-obj="${n}"]`).click();await p.locator(`[data-sim-btn2="${n}"]`).click();}
  assert.equal(await p.locator('#cta-final').getAttribute('href'),'/vsl');
  await p.locator('#cta-final').click();await p.locator('#vsl-title').waitFor();assert.equal(await p.locator('video').count(),0);
  await ctx.close();checks.push(`Fluxo integral: ${type}; seleção, priming, gate, resultado, 3 SIM e VSL`);
}
(async()=>{
 const browser=await chromium.launch({headless:true,executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe'});
 try {
  await scenario(browser,'crente','p4-dinheiro',true);
  await scenario(browser,'duvida','p4-esgotamento');
  await scenario(browser,'cetica','p4-heranca');
  const p=await browser.newPage({reducedMotion:'reduce'});p.on('pageerror',e=>errors.push(e.message));
  for(const width of [1440,390,393,1280]){await p.setViewportSize({width,height:width<500?844:1000});await p.goto('http://127.0.0.1:4322/vsl');await shot(p,`vsl-${width}`);}
  await p.getByText('What is Protocol 44?',{exact:true}).click();assert(await p.locator('.faqs details').first().getAttribute('open')!==null);
  assert.deepEqual(errors,[]);checks.push('VSL: 4 larguras, FAQ e ausência honesta de vídeo');
 } finally {await browser.close();}
 fs.writeFileSync(path.join(out,'VERIFICACAO.json'),JSON.stringify({date:new Date().toISOString(),checks,images,errors},null,2));console.log(JSON.stringify({checks:checks.length,screenshots:images.length,errors},null,2));
})().catch(e=>{console.error(e);process.exit(1)});
