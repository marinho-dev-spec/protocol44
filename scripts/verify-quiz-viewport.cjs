const { chromium } = require(process.env.P44_PLAYWRIGHT_MODULE || 'playwright');
const fs = require('node:fs');
const assert = require('node:assert/strict');
const base = process.env.P44_BASE_URL || 'http://127.0.0.1:4322';
const out = process.env.P44_REVIEW_DIR || '.impeccable/review/quiz-viewport';
fs.mkdirSync(out, { recursive: true });
const answers = { q1:'work', q2:'many', q3:['money'], q4:'money', q5:'none', q6:'online', q7:'skip', q8:'career', q9:'doubter', q10:'trip' };
const scenes = [
  {screen:'screen_0'},
  ...Array.from({length:10}, (_, i) => ({screen:'q'+(i+1)})),
  {screen:'q6',name:'q6-with-note',answers:{q3:['self'],q4:'pain',q5:'enough'}},
  {screen:'reinforcement_1'},{screen:'reinforcement_2'},{screen:'reinforcement_3'},
  {screen:'reinforcement_3',name:'reinforcement_3-part-2',part:2},
  ...['believer','doubter','skeptic'].map(branch=>({screen:'priming_2',name:'activity-'+branch,answers:{q9:branch}})),
  {screen:'loading'},{screen:'gate_name'},
];
(async()=>{
  const browser = await chromium.launch({executablePath:process.env.P44_CHROME_PATH,headless:true});
  const report=[],errors=[];
  for (const viewport of [{width:390,height:844},{width:375,height:667},{width:360,height:640},{width:320,height:568},{width:1366,height:768}]) {
    const context = await browser.newContext({viewport,reducedMotion:'reduce'});
    const page = await context.newPage(); page.on('pageerror',e=>errors.push(e.message));
    await page.goto(base+'/quiz');
    for (const scene of scenes) {
      await page.evaluate(state=>sessionStorage.setItem('protocol44-quiz-v8',JSON.stringify(state)),{version:8,screen:scene.screen,answers:{...answers,...scene.answers},name:'',priming:null});
      await page.reload();
      await page.locator('#quiz-app[data-screen="'+scene.screen+'"]').waitFor();
      if(scene.part===2)await page.locator('#next-screen').click();
      await page.evaluate(()=>document.fonts.ready);
      await page.evaluate(()=>new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r))));
      const m = await page.evaluate(()=>{
        const root=document.getElementById('quiz-app');
        const controls=Array.from(root.querySelectorAll('.q5-option,.q5-title,.question-hint,.q8-inline-note,.question-actions,#start-quiz,.q8-intro-copy')).filter(el=>el.getClientRects().length);
        const clipped=controls.filter(el=>{const b=el.getBoundingClientRect();return b.top < -1 || b.bottom > innerHeight+1 || b.left<0 || b.right>innerWidth+1;}).map(el=>el.className||el.id);
        root.querySelectorAll('.q5-option').forEach(option=>{
          const label=option.querySelector('span:last-child'); if(!label)return;
          const box=option.getBoundingClientRect(),range=document.createRange();range.selectNodeContents(label);
          const text=range.getBoundingClientRect();
          if(text.left<box.left||text.right>box.right+1||text.bottom>box.bottom+1)clipped.push('option text');
        });
        return {viewport:innerHeight,pageHeight:document.documentElement.scrollHeight,width:document.documentElement.scrollWidth,clipped,density:root.dataset.density||null};
      });
      const record={screen:scene.name||scene.screen,size:viewport.width+'x'+viewport.height,...m};
      record.pass=m.pageHeight<=viewport.height+1&&m.width<=viewport.width+1&&m.clipped.length===0;
      report.push(record);
      if (!record.pass || scene.part===2 || ['q1','q3','q5','q9','priming_2','screen_0'].includes(scene.screen)) await page.screenshot({path:out+'/'+record.screen+'-'+record.size+'.png'});
    }
    await context.close();
  }
  const navigation=await browser.newContext({viewport:{width:375,height:667},reducedMotion:'reduce'});
  const page=await navigation.newPage();await page.goto(base+'/quiz');
  await page.evaluate(state=>sessionStorage.setItem('protocol44-quiz-v8',JSON.stringify(state)),{version:8,screen:'reinforcement_3',answers,name:'',priming:null});
  await page.reload();
  const current=()=>page.locator('[data-reading-page]:visible').getAttribute('data-reading-page');
  assert.equal(await current(),'0');
  await page.locator('#next-screen').click();assert.equal(await current(),'1');
  await page.locator('#back').click();assert.equal(await current(),'0');
  await page.locator('#next-screen').click();await page.locator('#next-screen').click();
  assert.equal(await page.locator('#quiz-app').getAttribute('data-screen'),'q10');
  await page.locator('#back').click();assert.equal(await current(),'1');
  assert.deepEqual(await page.evaluate(()=>JSON.parse(sessionStorage.getItem('protocol44-quiz-v8')).answers),answers);
  await browser.close();
  const failures=report.filter(r=>!r.pass);
  fs.writeFileSync(out+'/report.json',JSON.stringify({base,total:report.length,failures,errors,readingNavigation:'pass',report},null,2));
  console.log(JSON.stringify({total:report.length,failures,errors,readingNavigation:'pass'},null,2));
  if(!process.env.P44_LAYOUT_AUDIT){assert.deepEqual(errors,[]);assert.deepEqual(failures,[]);}
})().catch(e=>{console.error(e);process.exit(1)});
