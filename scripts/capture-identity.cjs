const {chromium}=require(process.env.P44_PLAYWRIGHT_MODULE||'playwright');
const fs=require('node:fs');
const path=require('node:path');
const assert=require('node:assert/strict');
const base=process.env.P44_BASE_URL||'http://127.0.0.1:4322';
const out=process.env.P44_REVIEW_DIR||'.impeccable/review/v8.2/final';
fs.mkdirSync(out,{recursive:true});
const answers={q1:'work',q2:'many',q3:['money'],q4:'money',q5:'none',q6:'online',q7:'skip',q8:'career',q9:'doubter',q10:'trip'};
const report=[];
(async()=>{
 const browser=await chromium.launch({executablePath:process.env.P44_CHROME_PATH,headless:true});
 for(const viewport of [{width:1440,height:1000},{width:390,height:844}]){
  const device=viewport.width===1440?'desktop':'mobile';
  for(const scene of [
   {name:'home',route:'/'}, {name:'quiz-intro',route:'/quiz',screen:'screen_0',stage:'noise'},
   {name:'question',route:'/quiz',screen:'q1',stage:'noise'},
   {name:'focus',route:'/quiz',screen:'q5',stage:'focus'},
   {name:'settle',route:'/quiz',screen:'q9',stage:'settle'},
   {name:'result',route:'/quiz',screen:'result',stage:'clear'}, {name:'practice',route:'/vsl'}
  ]){
   const context=await browser.newContext({viewport,reducedMotion:'reduce'});
   if(scene.screen){
    const limit=/^q\d+$/.test(scene.screen)?Number(scene.screen.slice(1)):scene.screen==='screen_0'?0:11;
    const selected=Object.fromEntries(Object.entries(answers).filter(([key])=>Number(key.slice(1))<limit));
    const state={version:8,screen:scene.screen,answers:selected,name:scene.screen==='result'?'Alex':'',priming:null};
    await context.addInitScript(state=>sessionStorage.setItem('protocol44-quiz-v8',JSON.stringify(state)),state);
   }
   const page=await context.newPage();await page.goto(base+scene.route);await page.evaluate(()=>document.fonts.ready);
   if(scene.screen)await page.locator(`#quiz-app[data-screen="${scene.screen}"]`).waitFor();
   if(scene.stage)assert.equal(await page.locator('body').getAttribute('data-signal-stage'),scene.stage);
   await page.evaluate(async()=>{
    document.querySelectorAll('img[loading="lazy"]').forEach(image=>image.loading='eager');
    await Promise.all(Array.from(document.images).map(image=>image.decode().catch(()=>{})));
    window.scrollTo({top:0,behavior:'instant'});
    await new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve)));
   });
   const metrics=await page.evaluate(()=>({viewport:innerWidth,width:document.documentElement.scrollWidth,background:getComputedStyle(document.body).backgroundColor,foreground:getComputedStyle(document.body).color}));
   assert(metrics.width<=metrics.viewport+1,'Overflow: '+scene.name+' '+device);
   await page.screenshot({path:path.join(out,`${scene.name}-${device}.png`),fullPage:true});
   if(['home','result','practice'].includes(scene.name))await page.screenshot({path:path.join(out,`${scene.name}-${device}-viewport.png`)});
   report.push({scene:scene.name,device,...metrics});await context.close();
  }
 }
 await browser.close();fs.writeFileSync(path.join(out,'capture-report.json'),JSON.stringify({base,report},null,2));console.log('Captured and checked 14 page/viewport combinations.');
})().catch(error=>{console.error(error);process.exit(1)});
