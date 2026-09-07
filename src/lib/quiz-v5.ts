/** Editorial V6, September 2026; V5 state and scoring preserved. Self-reflection, not a diagnostic instrument. */
export type Focus = 'money' | 'capacity' | 'expectations' | 'open';
export type Option = { id: string; label: string; focus?: Focus };
export type Question = { id: string; title: string; hint: string; options: Option[] };
export const questions: Question[] = [
  {
    "id": "area",
    "title": "Where would you most like to stop going in circles?",
    "hint": "Choose the area that matters most to you right now.",
    "options": [
      {
        "id": "work",
        "label": "My work or the direction of my life"
      },
      {
        "id": "money",
        "label": "My money worries and decisions"
      },
      {
        "id": "relationships",
        "label": "The patterns in my relationships"
      },
      {
        "id": "space",
        "label": "Putting everyone else ahead of myself"
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
    "title": "What most often gets in the way of what you want?",
    "hint": "Choose the answer that fits your experience.",
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
    "title": "When that happens, what do you usually do?",
    "hint": "Think about your response, even if it changes from day to day.",
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
    "title": "Which thought feels most familiar?",
    "hint": "Choose one you recognize, or select none.",
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
        "label": "“What if choosing what I want disappoints someone?”",
        "focus": "expectations"
      },
      {
        "id": "return",
        "label": "“Things go well, then I’m back where I started.”"
      },
      {
        "id": "none",
        "label": "None of these sound like me"
      }
    ]
  },
  {
    "id": "help",
    "title": "What would help you move forward?",
    "hint": "Choose what you most want from a guided practice.",
    "options": [
      {
        "id": "clarity",
        "label": "Seeing the pattern behind my repeated setbacks"
      },
      {
        "id": "action",
        "label": "Knowing how to respond differently in the moment"
      },
      {
        "id": "return",
        "label": "Following through after the first burst of motivation"
      },
      {
        "id": "choice",
        "label": "Making a choice without second-guessing what I want"
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
    "title": "What change would matter most in your everyday life?",
    "hint": "Pick something you would be able to notice.",
    "options": [
      {
        "id": "decision",
        "label": "Making a money or work decision I keep avoiding"
      },
      {
        "id": "space",
        "label": "Keeping time for myself, even when others ask for it"
      },
      {
        "id": "rule",
        "label": "Choosing what I want instead of automatically doing what’s expected"
      },
      {
        "id": "resume",
        "label": "Following through on a plan after a setback"
      }
    ]
  },
  {
    "id": "focus",
    "title": "Where do you want to start changing the pattern?",
    "hint": "Choose your focus, or ask us to suggest one from your answers.",
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
  "money": {
    "title": "Make your next money decision with clarity.",
    "name": "Money decisions",
    "body": "A money worry can turn into postponing a decision or avoiding the numbers altogether. Start with one decision. Separate what you know from what you fear, then choose an action you can take.",
    "prompt": "What money decision am I avoiding, and what do I need to make it?",
    "example": "Open one bill, write down its due date, and choose when to review it.",
    "units": "Choosing a focus, examining a familiar rule and planning a practical next step."
  },
  "capacity": {
    "title": "Make room for your own plans.",
    "name": "Time for yourself",
    "body": "Being dependable can leave little room for what you want. Start with one plan you’ve put aside. Decide what time it needs and whether there’s a request you can decline, defer or ask someone to share.",
    "prompt": "What am I putting aside for others, and what boundary could make room for it?",
    "example": "Choose one plan for myself and decide what I can decline, defer or share to make room for it.",
    "units": "Noticing everyday signals, making room for a pause and planning a return."
  },
  "expectations": {
    "title": "Make the choice that’s yours.",
    "name": "Other people’s expectations",
    "body": "Old expectations can make a decision feel settled before you’ve asked what you want. Pick one “should” about work, money or relationships. Consider whether it fits your life now and what you would choose.",
    "prompt": "Which “should” is shaping this decision, and what do I actually want?",
    "example": "Write down one “should,” then one choice that reflects what matters to me today.",
    "units": "Recognizing protective roles, reconsidering learned rules and choosing a direction."
  },
  "open": {
    "title": "Choose what you want to change first.",
    "name": "An open starting point",
    "body": "Your answers leave room for more than one focus. Start with a setback or decision you want to handle differently. The exercise helps you look at what happened, what you told yourself, and what you could do next.",
    "prompt": "What happened the last time I slipped back into a familiar pattern?",
    "example": "Describe the situation and my response, then choose one action I could try differently.",
    "units": "Choosing a focus, separating facts from interpretation and planning a return."
  }
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
