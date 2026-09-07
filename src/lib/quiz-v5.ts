/** Editorial V5, September 2026. Self-reflection, not a diagnostic instrument. */
export type Focus = 'money' | 'capacity' | 'expectations' | 'open';
export type Option = { id: string; label: string; focus?: Focus };
export type Question = { id: string; title: string; hint: string; options: Option[] };
export const questions: Question[] = [
  {
    "id": "area",
    "title": "What’s been on your mind lately?",
    "hint": "Choose what you’d most like to work on.",
    "options": [
      {
        "id": "work",
        "label": "My work or where I’m headed"
      },
      {
        "id": "money",
        "label": "Money"
      },
      {
        "id": "relationships",
        "label": "My relationships"
      },
      {
        "id": "space",
        "label": "Finding time for myself"
      },
      {
        "id": "unsure",
        "label": "I’m not sure yet"
      }
    ]
  },
  {
    "id": "tried",
    "title": "How has it gone when you’ve tried to make a change?",
    "hint": "Think about what you’ve tried before.",
    "options": [
      {
        "id": "fades",
        "label": "I get off to a good start, then lose momentum"
      },
      {
        "id": "some",
        "label": "Some things have helped, and I want to keep going"
      },
      {
        "id": "tired",
        "label": "I’ve tried a lot, and I’m tired of starting over"
      },
      {
        "id": "new",
        "label": "This is new to me"
      }
    ]
  },
  {
    "id": "pressure",
    "title": "When life gets busy, what takes up the most space?",
    "hint": "Pick the answer that feels closest.",
    "options": [
      {
        "id": "money",
        "label": "Worrying about money",
        "focus": "money"
      },
      {
        "id": "capacity",
        "label": "Having too much to do for everyone",
        "focus": "capacity"
      },
      {
        "id": "expectations",
        "label": "Feeling I should be doing what’s expected of me",
        "focus": "expectations"
      },
      {
        "id": "unsure",
        "label": "It depends, or I’m not sure"
      }
    ]
  },
  {
    "id": "response",
    "title": "What do you tend to do then?",
    "hint": "Think of the last time this happened.",
    "options": [
      {
        "id": "money",
        "label": "Put off a money decision",
        "focus": "money"
      },
      {
        "id": "capacity",
        "label": "Put my own plans on hold",
        "focus": "capacity"
      },
      {
        "id": "expectations",
        "label": "Second-guess what I want",
        "focus": "expectations"
      },
      {
        "id": "pause",
        "label": "Take a break, then come back to it"
      },
      {
        "id": "other",
        "label": "Something else, or I haven’t noticed"
      }
    ]
  },
  {
    "id": "thought",
    "title": "Does any of this sound familiar?",
    "hint": "Choose the thought you recognize most.",
    "options": [
      {
        "id": "money",
        "label": "“I can’t relax while I’m worried about money.”",
        "focus": "money"
      },
      {
        "id": "capacity",
        "label": "“Everyone else needs something from me first.”",
        "focus": "capacity"
      },
      {
        "id": "expectations",
        "label": "“I should want what they want for me.”",
        "focus": "expectations"
      },
      {
        "id": "return",
        "label": "“I’ve stopped again. What’s the point?”"
      },
      {
        "id": "none",
        "label": "None of these sound like me"
      }
    ]
  },
  {
    "id": "help",
    "title": "What would help you most right now?",
    "hint": "Choose what you’d like to get out of this.",
    "options": [
      {
        "id": "clarity",
        "label": "Understanding why I keep doing the same thing"
      },
      {
        "id": "action",
        "label": "Knowing what I could do next"
      },
      {
        "id": "return",
        "label": "Getting back to something I’ve stopped doing"
      },
      {
        "id": "choice",
        "label": "Feeling clearer about what I want"
      }
    ]
  },
  {
    "id": "pace",
    "title": "What kind of time do you have for this?",
    "hint": "Think about a typical week.",
    "options": [
      {
        "id": "small",
        "label": "A few short sessions"
      },
      {
        "id": "longer",
        "label": "A longer session now and then"
      },
      {
        "id": "flexible",
        "label": "It varies from week to week"
      },
      {
        "id": "unsure",
        "label": "I need to try it before I know"
      }
    ]
  },
  {
    "id": "format",
    "title": "How do you like to learn?",
    "hint": "We’ll keep this in mind for your first exercise.",
    "options": [
      {
        "id": "write",
        "label": "Reading and writing things down"
      },
      {
        "id": "listen",
        "label": "Listening, with time to think"
      },
      {
        "id": "both",
        "label": "A mix of reading, listening and writing"
      },
      {
        "id": "unsure",
        "label": "Seeing an example first"
      }
    ]
  },
  {
    "id": "progress",
    "title": "What would you like to do first?",
    "hint": "Choose something you could see yourself doing.",
    "options": [
      {
        "id": "decision",
        "label": "Deal with a decision I’ve been avoiding"
      },
      {
        "id": "space",
        "label": "Make time for something I care about"
      },
      {
        "id": "rule",
        "label": "Rethink something I feel I should do"
      },
      {
        "id": "resume",
        "label": "Pick up something I’ve left unfinished"
      }
    ]
  },
  {
    "id": "focus",
    "title": "Which of these would you like to explore?",
    "hint": "You can choose a focus or let your answers guide the suggestion.",
    "options": [
      {
        "id": "money",
        "label": "My money worries and decisions",
        "focus": "money"
      },
      {
        "id": "capacity",
        "label": "Making time for myself",
        "focus": "capacity"
      },
      {
        "id": "expectations",
        "label": "What I want, and what others expect",
        "focus": "expectations"
      },
      {
        "id": "open",
        "label": "Suggest something from my answers"
      }
    ]
  }
];
export const startingPoints = {
  money:{title:'Start with a money decision.',name:'Money decisions',body:'Think of a money decision you’ve been putting off. What do you know about it, what worries you, and what do you still need to find out? The exercise below gives you somewhere to write it down.',prompt:'What is one money decision I have been putting off?',example:'Open one bill, write down its due date, and choose when to review it.',units:'Choosing a focus, examining a familiar rule and planning a practical next step.'},
  capacity:{title:'Make room for yourself.',name:'Time for yourself',body:'Think of the last time you put your own plans on hold. What did the day ask of you? Choose something you’d like to make time for, alongside the responsibilities you already have.',prompt:'What would I like to make time for this week?',example:'Choose one small task for myself and give it a realistic place in the day.',units:'Noticing everyday signals, making room for a pause and planning a return.'},
  expectations:{title:'Work out what you want.',name:'Other people’s expectations',body:'Think of something you feel you should do. Is it something you still want, or an expectation you’ve got used to following? You don’t need to know where it started to look at how it affects you now.',prompt:'What do I feel I should do, and is it what I want?',example:'Write down one “should,” then one choice that reflects what matters to me today.',units:'Recognizing protective roles, reconsidering learned rules and choosing a direction.'},
  open:{title:'Start with what’s on your mind.',name:'An open starting point',body:'More than one topic may fit your answers. Choose a recent situation that’s been on your mind. You can use the exercise to work through it, or pick a different focus below.',prompt:'What happened the last time something I cared about became hard to continue?',example:'Describe the interruption, then choose one small way to return.',units:'Choosing a focus, separating facts from interpretation and planning a return.'},
} as const;
export const SESSION_KEY = 'protocol44-quiz-v5';
export type State = { version:5; screen:'intro'|'questions'|'bridge'|'result'; index:number; answers:Record<string,string> };
export const freshState = ():State => ({version:5,screen:'intro',index:0,answers:{}});
export function chooseFocus(answers:Record<string,string>):Focus {
  if (['money','capacity','expectations'].includes(answers.focus)) return answers.focus as Focus;
  const counts={money:0,capacity:0,expectations:0};
  for(const id of ['pressure','response','thought']) {
    const option=questions.find(q=>q.id===id)?.options.find(o=>o.id===answers[id]);
    if(option?.focus && option.focus!=='open') counts[option.focus]++;
  }
  const sorted=Object.entries(counts).sort((a,b)=>b[1]-a[1]);
  return sorted[0][1]>0 && sorted[0][1]>sorted[1][1] ? sorted[0][0] as Focus : 'open';
}
export function readState(raw:string|null):State {
  try {
    const candidate=JSON.parse(raw||'null');
    if(candidate?.version!==5 || !candidate.answers || typeof candidate.answers!=='object') return freshState();
    const answers:Record<string,string>={};
    for(const q of questions) if(q.options.some(o=>o.id===candidate.answers[q.id])) answers[q.id]=candidate.answers[q.id];
    const first=questions.findIndex(q=>!answers[q.id]);
    let index=Number.isInteger(candidate.index) ? Math.max(0,Math.min(9,candidate.index)) : 0;
    if(first>=0) index=Math.min(index,first);
    let screen:State['screen']=['intro','questions','bridge','result'].includes(candidate.screen)?candidate.screen:'intro';
    if(screen==='result' && first>=0) {screen='questions';index=first;}
    if(screen==='bridge' && (!answers[questions[index].id] || ![3,6].includes(index))) screen='questions';
    return {version:5,screen,index,answers};
  } catch {return freshState();}
}
export function answerLabel(id:string,answers:Record<string,string>) {
  return questions.find(q=>q.id===id)?.options.find(o=>o.id===answers[id])?.label || '';
}
