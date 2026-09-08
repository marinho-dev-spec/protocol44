import {content} from './funnel-content';
export type Persona='professional'|'family'|'relational';
export type Topic='concrete_lack'|'health_burnout'|'internal_block';
export type ResultKey=Topic|'mixed';
export type Answers=Record<string,string|string[]|number>;
export type Option={id:string;label:string;scores?:{persona?:Persona;villain?:Topic;weight:number}|null};
export type Question={type:string;section_label:string;question:string;hint?:string;options?:Option[]};
export const questions=Object.fromEntries(Array.from({length:10},(_,i)=>[`q${i+1}`,content.screens[`q${i+1}` as keyof typeof content.screens]])) as Record<string,Question>;
export const SESSION_KEY='protocol44-quiz-v8';
export type State={version:8;screen:string;answers:Answers;name:string;priming:{branch:string;answer:string;word:string}|null};
export const freshState=():State=>({version:8,screen:'screen_0',answers:{},name:'',priming:null});
function tally(answers:Answers, ids:string[]) {
  const persona={professional:0,family:0,relational:0};
  const villain={concrete_lack:0,health_burnout:0,internal_block:0};
  for(const id of ids){
    const value=answers[id];
    const selections=Array.isArray(value)?[...new Set(value)]:[value];
    for(const selection of selections){
      const score=questions[id]?.options?.find(o=>o.id===selection)?.scores;
      if(score?.persona)persona[score.persona]+=score.weight;
      if(score?.villain)villain[score.villain]+=score.weight;
    }
  }
  return {persona,villain};
}
function winner<T extends string>(scores:Record<T,number>,tie:T|undefined):T|null {
  const max=Math.max(...Object.values<number>(scores));
  if(max===0)return null;
  const leaders=(Object.keys(scores) as T[]).filter(k=>scores[k]===max);
  if(leaders.length===1)return leaders[0];
  return tie&&leaders.includes(tie)?tie:null;
}
export function calculate(answers:Answers) {
  const scores=tally(answers,['q1','q3','q4','q5','q6','q8']);
  const q4=questions.q4.options?.find(o=>o.id===answers.q4)?.scores?.villain;
  const q8=questions.q8.options?.find(o=>o.id===answers.q8)?.scores?.persona;
  return {topic:(winner(scores.villain,q4)||'mixed') as ResultKey,persona:winner(scores.persona,q8),scores};
}
export function consistentAfterQ5(answers:Answers):boolean {
  const prediction=winner(tally(answers,['q3','q4']).villain,undefined);
  const actual=questions.q5.options?.find(o=>o.id===answers.q5)?.scores?.villain;
  return Boolean(prediction&&prediction===actual);
}
export function consistentAfterQ8(answers:Answers):boolean {
  const first=questions.q1.options?.find(o=>o.id===answers.q1)?.scores?.persona;
  const eighth=questions.q8.options?.find(o=>o.id===answers.q8)?.scores?.persona;
  return Boolean(first&&first===eighth);
}
export function flow(state:State):string[] {
  // Consistency notes appear inline with the next question, never as extra gates.
  return content.flow.filter(id=>!id.startsWith('engine_reveal'));
}
// Navigation determines the visual chapter. It never uses a score or claims improvement.
export function visualStage(screen:string):'noise'|'focus'|'settle'|'clear' {
  if(screen==='result')return 'clear';
  if(['q9','priming_2','reinforcement_3','q10','loading','gate_name'].includes(screen))return 'settle';
  if(['reinforcement_1','q5','q6','reinforcement_2','q7','q8'].includes(screen))return 'focus';
  return 'noise';
}
export function isAnswered(id:string,answers:Answers):boolean {
  const value=answers[id];
  if(id==='q7')return value==='skip'||(typeof value==='number'&&Number.isInteger(value)&&value>=18&&value<=120);
  if(id==='q3')return Array.isArray(value)&&value.length>0&&value.every(x=>questions.q3.options?.some(o=>o.id===x))&&(!value.includes('none')||new Set(value).size===1);
  return typeof value==='string'&&Boolean(questions[id]?.options?.some(o=>o.id===value));
}
export function answerLabel(id:string,answers:Answers):string {
  const value=answers[id];
  return questions[id]?.options?.filter(o=>Array.isArray(value)?value.includes(o.id):value===o.id).map(o=>o.label).join('; ')||'';
}
export function readState(raw:string|null):State {
  const state=freshState();
  try {
    const saved=JSON.parse(raw||'null');
    if(!saved||saved.version!==8||!saved.answers||typeof saved.answers!=='object')return state;
    for(const [id,q] of Object.entries(questions)){
      const value=saved.answers[id];
      if(id==='q3'&&isAnswered(id,{q3:value})&&Array.isArray(value)){
        const allowed=[...new Set<string>(value.filter((x:unknown)=>typeof x==='string'&&q.options?.some(o=>o.id===x)))];
        if(allowed.length)state.answers[id]=allowed.includes('none')?['none']:allowed;
      } else if(id==='q7'&&isAnswered(id,{q7:value}))state.answers[id]=value;
      else if(typeof value==='string'&&q.options?.some(o=>o.id===value))state.answers[id]=value;
    }
    if(typeof saved.name==='string')state.name=saved.name.replace(/[\u0000-\u001f\u007f]/g,'').trim().slice(0,60);
    const p=saved.priming;
    if(p&&p.branch===state.answers.q9&&['yes','some','no','skip'].includes(p.answer)){
      state.priming={branch:p.branch,answer:p.answer,word:p.branch==='skeptic'&&['yes','some'].includes(p.answer)&&typeof p.word==='string'&&content.screens.priming_2.variants.skeptic.words.includes(p.word)?p.word:''};
    }
    if(typeof saved.screen==='string'&&flow(state).includes(saved.screen))state.screen=saved.screen;
    const index=flow(state).indexOf(state.screen);
    const missing=flow(state).slice(0,index).find(id=>questions[id]&&!isAnswered(id,state.answers));
    if(missing)state.screen=missing;
  }catch{}
  return state;
}
