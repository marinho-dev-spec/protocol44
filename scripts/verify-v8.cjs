const {chromium}=require(process.env.P44_PLAYWRIGHT_MODULE||'playwright');
const fs=require('fs');const path=require('path');const assert=require('assert/strict');const {pathToFileURL}=require('url');
const base=process.env.P44_BASE_URL||process.argv[2]||'http://127.0.0.1:4322';
const out=process.env.P44_REVIEW_DIR||path.join(__dirname,'../.impeccable/review/v8');fs.mkdirSync(out,{recursive:true});
const checks=[];const errors=[];
(async()=>{
 const browser=await chromium.launch({executablePath:process.env.P44_CHROME_PATH||undefined,headless:true});
 const context=await browser.newContext({viewport:{width:1440,height:1000},acceptDownloads:true});
 const page=await context.newPage();page.on('pageerror',e=>errors.push(e.message));
 const external=[];page.on('request',r=>{if(!r.url().startsWith(base)&&/^https?:/.test(r.url()))external.push(r.url());});
 const screen=()=>page.locator('#quiz-app').getAttribute('data-screen');
 const pick=async value=>page.locator(`label:has(input[name="answer"][value="${value}"])`).click();
 const overflow=async label=>{const x=await page.evaluate(()=>({width:innerWidth,scroll:document.documentElement.scrollWidth}));assert(x.scroll<=x.width+1,label+JSON.stringify(x));};
 async function start(){await page.goto(base+'/quiz');await page.locator('#quiz-app[data-screen]').waitFor();if(await screen()!=='screen_0'){await page.locator('.site-footer summary').click();await page.locator('#clear-v8').click();}await page.locator('#start-quiz').click();}
 async function walk(answers,experience='skip',name=''){
  let safeguard=0;
  while(await screen()!=='result'){
   assert(++safeguard<40,'flow must finish');const id=await screen();
   if(/^q\d+$/.test(id)){
    if(id==='q7'){if(answers.q7==='skip'){await page.locator('#skip-age').click();continue;}await page.locator('#age-input').fill(String(answers.q7));}
    else{for(const value of (Array.isArray(answers[id])?answers[id]:[answers[id]]))await pick(value);}
    await page.locator('#next-question').click();
   }else if(id==='priming_2'){
    if(experience==='skip')await page.locator('#skip-priming').click();
    else{if(answers.q9==='skeptic')await page.locator('[data-word="Money"]').click();await page.locator(`label:has(input[name="experience"][value="${experience}"])`).click();await page.locator('#priming-form button[type="submit"]').click();}
   }else if(id==='gate_name'){
    if(name){await page.locator('#name-input').fill(name);await page.locator('#name-form button[type="submit"]').click();}else await page.locator('#skip-name').click();
   }else await page.locator('#next-screen').click();
   await overflow(id);
  }
 }
 await page.goto(base+'/');assert.match(await page.locator('h1').innerText(),/Stop putting your/);assert.equal(await page.locator('meta[name="p44-content-version"]').getAttribute('content'),'8.1');
 await page.locator('[data-example-step="2"]').click();assert(await page.locator('[data-example-panel="2"]').isVisible());await overflow('home desktop');
 await page.screenshot({path:path.join(out,'home-desktop.png'),fullPage:true});checks.push('home, sample tabs, version marker');
 await page.goto(base+'/quiz');await page.locator('#quiz-app h1').waitFor();assert(!(await page.locator('#quiz-app').innerText()).includes('Blocked Signal'));await page.screenshot({path:path.join(out,'quiz-intro-desktop.png')});
 await page.locator('#start-quiz').click();await page.locator('#next-question').click();assert(await page.locator('#answer-error').isVisible());
 assert(await page.locator('input[value="family"]').count());await pick('family');await page.locator('#next-question').click();await page.reload();assert.equal(await screen(),'q2');
 await page.locator('#back').click();assert(await page.locator('input[value="family"]').isChecked());await page.locator('#next-question').click();await pick('first');await page.locator('#next-question').click();
 await pick('money');await pick('health');assert.equal(await page.locator('input:checked').count(),2);await pick('none');assert.equal(await page.locator('input:checked').count(),1);await pick('money');assert(!(await page.locator('input[value="none"]').isChecked()));
 await page.screenshot({path:path.join(out,'q3-desktop.png')});checks.push('required answer, family, back/reload, multi-select and exclusive none');
 const common={q1:'work',q2:'many',q3:['money'],q4:'money',q5:'none',q6:'online',q7:35,q8:'career',q9:'believer',q10:'dinner'};
 const cases=[
  {name:'concrete',a:common,topic:'concrete_lack',persona:'professional',experience:'yes'},
  {name:'capacity',a:{...common,q1:'family',q3:['health'],q4:'wornout',q6:'alone',q7:'skip',q8:'love',q9:'doubter',q10:'quiet'},topic:'health_burnout',persona:'family',experience:'no'},
  {name:'thoughts',a:{...common,q1:'rel',q3:['self'],q4:'pain',q5:'enough',q6:'close',q8:'rel',q9:'skeptic'},topic:'internal_block',persona:'relational',experience:'some'},
  {name:'mixed',a:{...common,q1:'why',q3:['health','money'],q4:'fear',q8:'career',q9:'skeptic'},topic:'mixed',persona:'professional',experience:'skip'},
  {name:'zero',a:{...common,q1:'why',q3:['none'],q4:'fear',q8:'career',q9:'doubter'},topic:'mixed',persona:'professional',experience:'skip'}
 ];
 for(const c of cases){
  await start();await walk(c.a,c.experience,c.name==='concrete'?'<img src=x onerror=alert(1)>':'');
  assert.equal(await page.locator('#quiz-app').getAttribute('data-topic'),c.topic);assert.equal(await page.locator('#quiz-app').getAttribute('data-persona'),c.persona);
  assert.equal(await page.locator('#priming-reflection').count(),['yes','some'].includes(c.experience)?1:0);
  assert.equal(await page.locator('[data-refocus]').count(),0);assert.equal(await page.locator('img[src="x"]').count(),0);
  const text=await page.locator('#quiz-app').innerText();assert(!/97\.87|12,783|\{\{|shut it off for good|chance of finding/.test(text));
  await page.reload();assert.equal(await screen(),'result');assert.equal(await page.locator('#quiz-app').getAttribute('data-topic'),c.topic);
  if(c.name==='concrete')await page.screenshot({path:path.join(out,'result-desktop.png'),fullPage:true});
  checks.push('full path '+c.name+' / '+c.experience);
 }
 await page.locator('#review-answers').click();assert.equal(await screen(),'q1');
 await walk(cases[2].a,'some');await page.locator('.q5-result-copy a[href="/vsl#first-practice"]') .first().click();
 await page.locator('#practice-focus').waitFor({state:'visible'});await page.locator('#first-practice-form button').click();assert.match(await page.locator('#practice-status').innerText(),/at least one/);
 await page.locator('#practice-event').fill('A test plan was interrupted.');await page.locator('#practice-next').fill('Return to one step after lunch.');
 const [download]=await Promise.all([page.waitForEvent('download'),page.locator('#first-practice-form button').click()]);await download.saveAs(path.join(out,'reflection.txt'));assert.match(fs.readFileSync(path.join(out,'reflection.txt'),'utf8'),/Return to one step/);
 await page.reload();assert.equal(await page.locator('#practice-event').inputValue(),'');assert.equal(await page.locator('video').count(),0);checks.push('review, practice context, blank validation, actual download, no persistence, no fake video');
 await page.setViewportSize({width:390,height:844});await page.goto(base+'/');await overflow('home mobile');await page.screenshot({path:path.join(out,'home-mobile.png'),fullPage:true});
 await start();await page.locator('#back').click();await page.screenshot({path:path.join(out,'quiz-intro-mobile.png'),fullPage:true});await page.locator('#start-quiz').click();
 await walk(cases[2].a,'skip');await overflow('result mobile');await page.screenshot({path:path.join(out,'result-mobile.png'),fullPage:true});await page.locator('.q5-result-copy a[href="/vsl#first-practice"]') .first().click();await overflow('practice mobile');await page.screenshot({path:path.join(out,'practice-mobile.png'),fullPage:true});checks.push('390px full flow and key pages without horizontal overflow');
 await start();await pick('work');await page.locator('#next-question').click();await pick('many');await page.locator('#next-question').click();await pick('money');await page.locator('#next-question').click();await pick('money');await page.locator('#next-question').click();await page.locator('#next-screen').click();await pick('none');await page.locator('#next-question').click();assert.equal(await page.locator('.q8-inline-note').count(),0);await pick('online');await page.locator('#next-question').click();await page.locator('#next-screen').click();
 await page.locator('#age-input').fill('17');await page.locator('#next-question').click();assert(await page.locator('#answer-error').isVisible());await page.locator('#age-input').fill('32.5');await page.locator('#next-question').click();assert(await page.locator('#answer-error').isVisible());await page.locator('#skip-age').click();await pick('career');await page.locator('#next-question').click();assert.equal(await page.locator('.q8-inline-note').count(),1);
 await pick('believer');await page.locator('#next-question').click();await page.locator('#skip-priming').click();await page.screenshot({path:path.join(out,'reinforcement-mobile.png'),fullPage:true});checks.push('age invalid/fractional/skip and conditional consistency notes');
 await page.emulateMedia({reducedMotion:'reduce'});await start();await page.locator('#back').click();assert.equal(await page.locator('.q8-signal-intro .signal-thread').evaluate(e=>getComputedStyle(e).animationName),'none');
 if(!await page.locator('#clear-v8').isVisible())await page.locator('.site-footer summary').click();await page.locator('#clear-v8').click();assert.equal(await page.evaluate(()=>sessionStorage.getItem('protocol44-quiz-v8')),null);checks.push('reduced motion and clear answers');
 const noStorage=await browser.newContext();await noStorage.addInitScript(()=>{Storage.prototype.getItem=()=>{throw Error('unavailable')};Storage.prototype.setItem=()=>{throw Error('unavailable')};});const ns=await noStorage.newPage();await ns.goto(base+'/quiz');await ns.locator('#start-quiz').click();await ns.locator('label:has(input[value="work"])').click();await ns.locator('#next-question').click();assert.equal(await ns.locator('#quiz-app').getAttribute('data-screen'),'q2');await noStorage.close();checks.push('storage unavailable graceful fallback');
 const noJs=await browser.newContext({javaScriptEnabled:false});const nj=await noJs.newPage();await nj.goto(base+'/quiz');assert(await nj.locator('noscript a').isVisible());await noJs.close();checks.push('no-JS link to written practice');
 assert.deepEqual(external,[],'no quiz/notes transmitted');assert.deepEqual(errors,[]);await browser.close();
 const report={status:'pass',base,checks,errors,scope:'Browser behaviour and layout; not commercial conversion or product efficacy.'};fs.writeFileSync(path.join(out,'report.json'),JSON.stringify(report,null,2));console.log(JSON.stringify(report,null,2));
})().catch(e=>{console.error(e);fs.writeFileSync(path.join(out,'failure.txt'),String(e.stack));process.exit(1);});
