import {content,copy} from './funnel-content';
import {questions,SESSION_KEY,freshState,readState,flow,isAnswered,calculate,answerLabel,consistentAfterQ5,consistentAfterQ8} from './quiz-v8';
const root=document.getElementById('quiz-app')!;
const ui=content.ui;
let state=freshState();
try{state=readState(sessionStorage.getItem(SESSION_KEY));}catch{}
const esc=(value:unknown)=>String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]!));
const t=(value:string,values:Record<string,string|number>={})=>esc(copy(value,values));
const arrow='<svg width="21" height="21" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 12h15m-6-6 6 6-6 6" stroke="currentColor" stroke-width="1.7"/></svg>';
const signal=(quiet=false)=>`<svg class="signal-drawing ${quiet?'signal-clear':''}" viewBox="0 0 600 100" fill="none" aria-hidden="true"><path class="signal-axis" d="M0 50H600"/><path class="signal-wave" d="${quiet?'M0 50C30 50 30 20 60 20S90 80 120 80 150 20 180 20 210 80 240 80 270 20 300 20 330 80 360 80 390 20 420 20 450 80 480 80 510 20 540 20 570 50 600 50':'M0 50L20 50 28 35 36 66 47 19 55 73 65 45 79 55 94 30 107 70 118 46 132 60 145 24 158 77 170 50 181 43 196 63 210 27 225 75 240 41 254 55 266 19 280 80 295 38 310 57 320 26 335 70 350 45 365 54 380 24 395 72 410 41 425 55 440 30 455 68 470 44 485 53 500 40 515 60 530 45 545 54 563 47 581 50 600 50'}"/></svg>`;
function save(){try{sessionStorage.setItem(SESSION_KEY,JSON.stringify(state));}catch{}}
function commit(){save();render();window.scrollTo({top:0,behavior:'instant'});root.querySelector<HTMLElement>('h1,h2,legend')?.focus({preventScroll:true});}
function go(direction=1){const steps=flow(state);state.screen=steps[Math.max(0,Math.min(steps.length-1,steps.indexOf(state.screen)+direction))];commit();}
function actions(label=ui.continue){return `<div class="question-actions"><button type="button" class="back-button" id="back">${t(ui.back)}</button><button type="button" class="button button-primary" id="next-screen">${t(label)} ${arrow}</button></div>`;}
function wireActions(){document.getElementById('back')?.addEventListener('click',()=>go(-1));document.getElementById('next-screen')?.addEventListener('click',()=>go());}
function progress(){const n=Number(state.screen.replace('q',''));const count=Object.keys(questions).filter(id=>isAnswered(id,state.answers)).length;return `<div class="q5-progress"><span>${t(questions[state.screen]?ui.questionCount:ui.answeredCount,{current:n,count})}</span><span>${questions[state.screen]?t(questions[state.screen].section_label):''}</span><progress aria-label="${t(ui.progressLabel)}" max="10" value="${count}"></progress></div>`;}
function references(){return `<details class="q8-references"><summary>${t(ui.readingTitle)}</summary><p>${t(ui.readingNote)}</p>${content.citations.map(c=>`<article><h3><a href="${esc(c.url)}" target="_blank" rel="noopener noreferrer">${t(c.name)}</a></h3><p><strong>${t(c.title)}</strong></p><p>${t(c.body)}</p></article>`).join('')}</details>`;}
function render(){
  const id=state.screen;
  root.dataset.screen=id;
  root.className=id==='result'?'q5-result q8-result wrap':id==='screen_0'?'q8-intro wrap':'q5-flow';
  if(id==='screen_0'){
    const s=content.screens.screen_0;
    root.innerHTML=`<div class="q8-intro-copy"><h1 tabindex="-1">${t(s.title)}</h1>${s.body.map(p=>`<p class="lead">${t(p)}</p>`).join('')}<button class="button button-primary" id="start-quiz">${t(s.cta)} ${arrow}</button><p class="button-note">${t(s.note)}</p></div><div class="q8-signal-intro">${signal()}<button class="text-button" id="skip-intro">${t(ui.skipIntro)}</button></div>`;
    document.getElementById('start-quiz')!.onclick=()=>go();document.getElementById('skip-intro')!.onclick=()=>go();return;
  }
  if(questions[id]){
    const q=questions[id];const number=id==='q7';const multi=id==='q3';
    const value=state.answers[id];
    const connection=id==='q6'&&consistentAfterQ5(state.answers)?content.screens.engine_reveal_q5:id==='q9'&&consistentAfterQ8(state.answers)?content.screens.engine_reveal_q8:null;
    root.innerHTML=`${progress()}<form id="question-form" novalidate><fieldset><legend class="q5-title" tabindex="-1">${t(q.question)}</legend><p class="question-hint" id="question-hint">${t(q.hint||ui.singleHint)}</p>${number?`<label class="q8-input-label" for="age-input">${t(ui.ageLabel)}</label><input class="q8-input" id="age-input" name="age" type="number" inputmode="numeric" min="18" max="120" step="1" aria-describedby="question-hint answer-error" value="${typeof value==='number'?value:''}">`:`<div class="q5-options" role="group" aria-describedby="question-hint">${q.options!.map(o=>`<label class="q5-option"><input type="${multi?'checkbox':'radio'}" name="answer" value="${esc(o.id)}" ${(Array.isArray(value)?value.includes(o.id):value===o.id)?'checked':''}><span class="q5-radio ${multi?'q8-check':''}" aria-hidden="true"></span><span>${t(o.label)}</span></label>`).join('')}</div>`}</fieldset><p id="answer-error" class="form-error" role="alert" hidden>${t(number?ui.ageError:multi?ui.chooseMulti:ui.choose)}</p><div class="question-actions"><button class="back-button" type="button" id="back">${t(ui.back)}</button><button class="button button-primary" type="submit" id="next-question">${t(id==='q10'?ui.seeResult:ui.continue)} ${arrow}</button></div>${number?`<button type="button" class="text-button q8-skip" id="skip-age">${t(ui.skipAge)}</button>`:''}</form>`;
    if(connection)root.querySelector('form')?.insertAdjacentHTML('beforebegin',`<aside class="q8-inline-note"><h2>${t(connection.title)}</h2><p>${t(connection.body)}</p></aside>`);
    root.querySelectorAll<HTMLInputElement>('input[name="answer"]').forEach(input=>input.onchange=()=>{
      if(multi){
        if(input.value==='none'&&input.checked)root.querySelectorAll<HTMLInputElement>('input[name="answer"]').forEach(other=>{if(other!==input)other.checked=false;});
        if(input.value!=='none'&&input.checked){const none=root.querySelector<HTMLInputElement>('input[value="none"]');if(none)none.checked=false;}
        state.answers[id]=Array.from(root.querySelectorAll<HTMLInputElement>('input[name="answer"]:checked')).map(n=>n.value);
      }else{if(id==='q9'&&state.answers[id]!==input.value)state.priming=null;state.answers[id]=input.value;}
      save();document.getElementById('answer-error')!.hidden=true;
    });
    const age=document.getElementById('age-input') as HTMLInputElement|null;
    if(age)age.oninput=()=>{delete state.answers.q7;save();document.getElementById('answer-error')!.hidden=true;age.removeAttribute('aria-invalid');};
    document.getElementById('skip-age')?.addEventListener('click',()=>{state.answers.q7='skip';go();});
    document.getElementById('back')!.onclick=()=>go(-1);
    document.getElementById('question-form')!.onsubmit=e=>{e.preventDefault();
      if(number&&age&&age.value.trim()&&Number.isInteger(age.valueAsNumber)&&age.valueAsNumber>=18&&age.valueAsNumber<=120)state.answers.q7=age.valueAsNumber;
      if(!isAnswered(id,state.answers)){
        document.getElementById('answer-error')!.hidden=false;if(age)age.setAttribute('aria-invalid','true');root.querySelector<HTMLInputElement>('input')?.focus();return;
      }
      go();
    };return;
  }
  if(id==='priming_2'){
    const s=content.screens.priming_2;const branch=String(state.answers.q9) as keyof typeof s.variants;const v=s.variants[branch];
    const prev=state.priming?.branch===branch?state.priming:null;
    root.innerHTML=`${progress()}<div class="q5-bridge"><div class="q8-optional-row"><span>${t(ui.optional)}</span><button type="button" class="text-button" id="skip-priming">${t(ui.primingSkip)}</button></div><h2 tabindex="-1">${t(s.title)}</h2><p class="lead">${t(v.body)}</p><p class="q8-caption">${t(s.intro)}</p>${branch==='skeptic'?`<div class="q8-words" role="group" aria-label="${t(v.body)}">${s.variants.skeptic.words.map(word=>`<button type="button" data-word="${esc(word)}" aria-pressed="${prev?.word===word}">${t(word)}</button>`).join('')}</div>`:''}<form id="priming-form"><fieldset><legend class="q8-check-title">${t(v.question)}</legend><div class="q5-options">${s.options.map(o=>`<label class="q5-option"><input type="radio" name="experience" value="${o.id}" ${prev?.answer===o.id?'checked':''}><span class="q5-radio" aria-hidden="true"></span><span>${t(o.label)}</span></label>`).join('')}</div></fieldset><p id="priming-error" role="alert" class="form-error" hidden>${t(ui.checkQuestion)}</p><div class="question-actions"><button type="button" id="back" class="back-button">${t(ui.back)}</button><button type="submit" class="button button-primary">${t(ui.continue)} ${arrow}</button></div></form></div>`;
    let word=prev?.word||'';
    root.querySelectorAll<HTMLButtonElement>('[data-word]').forEach(button=>button.onclick=()=>{word=button.dataset.word!;root.querySelectorAll('[data-word]').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));});
    document.getElementById('skip-priming')!.onclick=()=>{state.priming={branch,answer:'skip',word:''};go();};
    document.getElementById('back')!.onclick=()=>go(-1);
    document.getElementById('priming-form')!.onsubmit=e=>{e.preventDefault();const answer=root.querySelector<HTMLInputElement>('input[name="experience"]:checked')?.value;if(!answer){document.getElementById('priming-error')!.hidden=false;root.querySelector<HTMLInputElement>('input[name="experience"]')?.focus();return;}state.priming={branch,answer,word};go();};return;
  }
  if(id==='gate_name'){
    const s=content.screens.gate_name;
    root.innerHTML=`${progress()}<div class="q5-bridge"><h2 tabindex="-1">${t(s.title)}</h2><p class="lead">${t(s.body)}</p><form id="name-form" novalidate><label class="q8-input-label" for="name-input">${t(s.label)}</label><input class="q8-input" id="name-input" type="text" autocomplete="given-name" maxlength="60" value="${esc(state.name)}" aria-describedby="name-error"><p id="name-error" class="form-error" role="alert" hidden>${t(ui.nameError)}</p><div class="question-actions"><button type="button" class="back-button" id="back">${t(ui.back)}</button><button class="button button-primary" type="submit">${t(s.cta)} ${arrow}</button></div><button class="text-button q8-skip" type="button" id="skip-name">${t(ui.skipName)}</button></form></div>`;
    document.getElementById('name-form')!.onsubmit=e=>{e.preventDefault();const input=document.getElementById('name-input') as HTMLInputElement;const name=input.value.trim();if(name.length>60){document.getElementById('name-error')!.hidden=false;input.focus();return;}state.name=name.replace(/[\u0000-\u001f\u007f]/g,'');go();};
    document.getElementById('skip-name')!.onclick=()=>{state.name='';go();};document.getElementById('back')!.onclick=()=>go(-1);return;
  }
  if(id==='result'){
    const result=calculate(state.answers);const r=content.results[result.topic];
    const scenes=r.scenes as Record<string,string>;const scene=result.persona?scenes[result.persona]:'';
    const p=state.priming;const branch=String(state.answers.q9) as keyof typeof content.screens.priming_2.result_lines;
    const extra=p&&p.branch===branch&&['yes','some'].includes(p.answer)&&(branch!=='skeptic'||Boolean(p.word))?content.screens.priming_2.result_lines[branch]:'';
    const future=r.future[state.answers.q10 as keyof typeof r.future];
    root.dataset.topic=result.topic;root.dataset.persona=result.persona||'';
    root.innerHTML=`<div class="q5-result-copy"><p class="q8-personal-intro">${t(state.name?ui.resultIntro:ui.resultIntroAnon,{Name:state.name})}</p><h1 tabindex="-1">${t(r.title)}</h1><p class="lead">${t(r.intro)}</p><p class="q5-result-context">${t(r.recognition)}</p><section class="q8-result-section"><h2>${t(content.tokens.MECHANISM)}: ${t(r.name)}</h2><p>${t(r.mechanism)}</p></section><section class="q8-result-section"><h2>${t(ui.metaphorTitle)}</h2><p>${t(r.metaphor)}</p><p class="q8-caption">${t(ui.metaphorLimit)}</p></section><section class="q8-comparison"><h2>${t(ui.compareTitle)}</h2><div><h3>${t(ui.compareBefore)}</h3>${signal()}<p>${t(r.before)}</p></div><div><h3>${t(ui.compareAfter)}</h3>${signal(true)}<p>${t(r.after)}</p></div><p class="q8-caption">${t(ui.compareNote)}</p></section>${scene?`<section class="q8-result-section"><h2>${t(ui.sceneTitle)}</h2><p>${t(scene)}</p></section>`:''}${extra?`<section class="q8-result-section" id="priming-reflection"><h2>${t(ui.primingTitle)}</h2><p>${t(extra)}</p></section>`:''}<section class="q8-result-section"><h2>${t(ui.futureTitle)}</h2><p>${t(future)}</p><p>${t(r.next)}</p></section><div class="q5-first-step"><h2>${t(ui.practiceTitle)}</h2><p>${t(r.prompt)}</p></div><a class="button button-primary" href="/vsl#first-practice">${t(ui.practiceCta)} ${arrow}</a><p class="button-note">${t(ui.practiceNote)}</p>${references()}</div><aside class="q5-answer-sheet"><h2>${t(ui.basisTitle)}</h2><dl><div><dt>${t(ui.basisTheme)}</dt><dd>${t(r.name)}</dd></div><div><dt>${t(ui.basisConcern)}</dt><dd>${t(answerLabel('q4',state.answers))}</dd></div><div><dt>${t(ui.basisChange)}</dt><dd>${t(answerLabel('q8',state.answers))}</dd></div></dl><p class="q8-caption">${t(ui.basisExplanation)}</p><details><summary>${t(ui.methodTitle)}</summary><p>${t(ui.method)}</p></details><button class="text-button" id="review-answers">${t(ui.review)}</button></aside><section class="q8-close"><h2>${t(ui.closeTitle)}</h2><p>${t(ui.closeBody)}</p><div class="q8-close-actions"><a class="button button-primary" href="/vsl#first-practice">${t(ui.practiceCta)} ${arrow}</a><button class="text-button" id="review-bottom">${t(ui.review)}</button></div></section>`;
    const review=()=>{state.screen='q1';commit();};document.getElementById('review-answers')!.onclick=review;document.getElementById('review-bottom')!.onclick=review;return;
  }
  const s=content.screens[id as keyof typeof content.screens] as {title:string;body:string[]|string;note?:string;cta?:string;cards?:{title:string;body:string}[]};
  root.innerHTML=`${progress()}<div class="q5-bridge ${id.startsWith('engine')?'q8-inline-reflection':''}"><h2 tabindex="-1">${t(s.title)}</h2>${(Array.isArray(s.body)?s.body:[s.body]).map(p=>`<p class="lead">${t(p)}</p>`).join('')}${s.cards?`<div class="q8-proof-points">${s.cards.map(c=>`<article><h3>${t(c.title)}</h3><p>${t(c.body)}</p></article>`).join('')}</div>`:''}${s.note?`<p class="q8-caption">${t(s.note)}</p>`:''}${id==='reinforcement_3'?references():''}${actions(s.cta||ui.continue)}</div>`;
  wireActions();
}
document.getElementById('clear-v8')!.onclick=()=>{state=freshState();try{sessionStorage.removeItem(SESSION_KEY);}catch{}render();window.scrollTo({top:0,behavior:'instant'});root.querySelector<HTMLElement>('h1')?.focus();};
render();
