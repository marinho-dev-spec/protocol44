import { after, describe, test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdir, readFile, unlink } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { build } from 'esbuild';

// Run from any directory: node --test tests/quiz-v8.test.mjs
// Only the temporary bundle below is written; production sources are never changed.
const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const temporaryDirectory = resolve(projectRoot, '.work/quiz-v8-tests');
await mkdir(temporaryDirectory, { recursive: true });
const bundleFile = resolve(temporaryDirectory, `quiz-v8-${process.pid}.mjs`);
await build({
  entryPoints: [resolve(projectRoot, 'src/lib/quiz-v8.ts')],
  outfile: bundleFile,
  bundle: true,
  format: 'esm',
  platform: 'node',
  target: 'node18',
  logLevel: 'silent',
});
after(async () => {
  try { await unlink(bundleFile); } catch (error) {
    if (error.code !== 'ENOENT') throw error;
  }
});
const {
  questions, freshState, calculate, consistentAfterQ5, consistentAfterQ8,
  isAnswered, readState, flow, answerLabel,
} = await import(pathToFileURL(bundleFile).href);
const content = JSON.parse(await readFile(resolve(projectRoot, 'src/content/funnel-content.json'), 'utf8'));

const base = {
  q1: 'why', q2: 'first', q3: ['none'], q4: 'fear', q5: 'none',
  q6: 'online', q7: 30, q8: 'career', q9: 'skeptic', q10: 'quiet',
};
const answers = (changes = {}) => structuredClone({ ...base, ...changes });
const saved = (changes = {}) => ({
  ...freshState(), screen: 'result', answers: answers(), ...changes,
});
const restore = (changes = {}) => readState(JSON.stringify(saved(changes)));
const zero = {
  persona: { professional: 0, family: 0, relational: 0 },
  villain: { concrete_lack: 0, health_burnout: 0, internal_block: 0 },
};

// Expected totals were derived independently during the two-axis audit.
// None is now an explicit exclusive option, replacing the audit's neutral [].
const fixtures = [
  {
    "id": "S01",
    "changes": {},
    "expected": {
      "topic": "mixed",
      "persona": "professional",
      "scores": {
        "persona": {
          "professional": 2,
          "family": 0,
          "relational": 0
        },
        "villain": {
          "concrete_lack": 0,
          "health_burnout": 0,
          "internal_block": 0
        }
      }
    }
  },
  {
    "id": "S02",
    "changes": {
      "q1": "money",
      "q3": [
        "money"
      ],
      "q4": "money"
    },
    "expected": {
      "topic": "concrete_lack",
      "persona": "professional",
      "scores": {
        "persona": {
          "professional": 2,
          "family": 0,
          "relational": 0
        },
        "villain": {
          "concrete_lack": 4,
          "health_burnout": 0,
          "internal_block": 0
        }
      }
    }
  },
  {
    "id": "S03",
    "changes": {
      "q3": [
        "health"
      ],
      "q4": "wornout"
    },
    "expected": {
      "topic": "health_burnout",
      "persona": "professional",
      "scores": {
        "persona": {
          "professional": 2,
          "family": 0,
          "relational": 0
        },
        "villain": {
          "concrete_lack": 0,
          "health_burnout": 3,
          "internal_block": 0
        }
      }
    }
  },
  {
    "id": "S04",
    "changes": {
      "q3": [
        "self"
      ],
      "q4": "pain",
      "q5": "enough",
      "q8": "calm"
    },
    "expected": {
      "topic": "internal_block",
      "persona": null,
      "scores": {
        "persona": {
          "professional": 0,
          "family": 0,
          "relational": 0
        },
        "villain": {
          "concrete_lack": 0,
          "health_burnout": 0,
          "internal_block": 6
        }
      }
    }
  },
  {
    "id": "S05",
    "changes": {
      "q5": "alone"
    },
    "expected": {
      "topic": "internal_block",
      "persona": "professional",
      "scores": {
        "persona": {
          "professional": 2,
          "family": 0,
          "relational": 0
        },
        "villain": {
          "concrete_lack": 0,
          "health_burnout": 0,
          "internal_block": 1
        }
      }
    }
  },
  {
    "id": "S06",
    "changes": {
      "q1": "money",
      "q3": [
        "money"
      ],
      "q4": "wornout"
    },
    "expected": {
      "topic": "health_burnout",
      "persona": "professional",
      "scores": {
        "persona": {
          "professional": 2,
          "family": 0,
          "relational": 0
        },
        "villain": {
          "concrete_lack": 2,
          "health_burnout": 2,
          "internal_block": 0
        }
      }
    }
  },
  {
    "id": "S07",
    "changes": {
      "q3": [
        "self"
      ],
      "q4": "wornout",
      "q5": "enough"
    },
    "expected": {
      "topic": "health_burnout",
      "persona": "professional",
      "scores": {
        "persona": {
          "professional": 2,
          "family": 0,
          "relational": 0
        },
        "villain": {
          "concrete_lack": 0,
          "health_burnout": 2,
          "internal_block": 2
        }
      }
    }
  },
  {
    "id": "S08",
    "changes": {
      "q3": [
        "self"
      ],
      "q4": "money",
      "q5": "enough"
    },
    "expected": {
      "topic": "concrete_lack",
      "persona": "professional",
      "scores": {
        "persona": {
          "professional": 2,
          "family": 0,
          "relational": 0
        },
        "villain": {
          "concrete_lack": 2,
          "health_burnout": 0,
          "internal_block": 2
        }
      }
    }
  },
  {
    "id": "S09",
    "changes": {
      "q3": [
        "self",
        "money",
        "health"
      ]
    },
    "expected": {
      "topic": "mixed",
      "persona": "professional",
      "scores": {
        "persona": {
          "professional": 2,
          "family": 0,
          "relational": 0
        },
        "villain": {
          "concrete_lack": 1,
          "health_burnout": 1,
          "internal_block": 1
        }
      }
    }
  },
  {
    "id": "S10",
    "changes": {
      "q1": "money",
      "q3": [
        "self"
      ],
      "q4": "bored"
    },
    "expected": {
      "topic": "mixed",
      "persona": "professional",
      "scores": {
        "persona": {
          "professional": 2,
          "family": 0,
          "relational": 0
        },
        "villain": {
          "concrete_lack": 1,
          "health_burnout": 0,
          "internal_block": 1
        }
      }
    }
  },
  {
    "id": "S11",
    "changes": {
      "q1": "money",
      "q3": [
        "money"
      ],
      "q8": "calm"
    },
    "expected": {
      "topic": "mixed",
      "persona": null,
      "scores": {
        "persona": {
          "professional": 0,
          "family": 0,
          "relational": 0
        },
        "villain": {
          "concrete_lack": 2,
          "health_burnout": 0,
          "internal_block": 2
        }
      }
    }
  },
  {
    "id": "S12",
    "changes": {
      "q3": [
        "self"
      ],
      "q4": "wornout",
      "q5": "enough",
      "q8": "calm"
    },
    "expected": {
      "topic": "internal_block",
      "persona": null,
      "scores": {
        "persona": {
          "professional": 0,
          "family": 0,
          "relational": 0
        },
        "villain": {
          "concrete_lack": 0,
          "health_burnout": 2,
          "internal_block": 4
        }
      }
    }
  },
  {
    "id": "S13",
    "changes": {
      "q1": "family",
      "q6": "close"
    },
    "expected": {
      "topic": "mixed",
      "persona": "professional",
      "scores": {
        "persona": {
          "professional": 2,
          "family": 2,
          "relational": 0
        },
        "villain": {
          "concrete_lack": 0,
          "health_burnout": 0,
          "internal_block": 0
        }
      }
    }
  },
  {
    "id": "S14",
    "changes": {
      "q1": "rel",
      "q3": [
        "rel"
      ],
      "q8": "love"
    },
    "expected": {
      "topic": "mixed",
      "persona": "family",
      "scores": {
        "persona": {
          "professional": 0,
          "family": 2,
          "relational": 2
        },
        "villain": {
          "concrete_lack": 0,
          "health_burnout": 0,
          "internal_block": 0
        }
      }
    }
  },
  {
    "id": "S15",
    "changes": {
      "q1": "family",
      "q6": "close",
      "q8": "rel"
    },
    "expected": {
      "topic": "mixed",
      "persona": "relational",
      "scores": {
        "persona": {
          "professional": 0,
          "family": 2,
          "relational": 2
        },
        "villain": {
          "concrete_lack": 0,
          "health_burnout": 0,
          "internal_block": 0
        }
      }
    }
  },
  {
    "id": "S16",
    "changes": {
      "q1": "work",
      "q3": [
        "rel"
      ],
      "q6": "close",
      "q8": "calm"
    },
    "expected": {
      "topic": "internal_block",
      "persona": null,
      "scores": {
        "persona": {
          "professional": 1,
          "family": 1,
          "relational": 1
        },
        "villain": {
          "concrete_lack": 0,
          "health_burnout": 0,
          "internal_block": 2
        }
      }
    }
  },
  {
    "id": "S17",
    "changes": {
      "q1": "money",
      "q6": "alone",
      "q8": "calm"
    },
    "expected": {
      "topic": "internal_block",
      "persona": null,
      "scores": {
        "persona": {
          "professional": 0,
          "family": 0,
          "relational": 0
        },
        "villain": {
          "concrete_lack": 1,
          "health_burnout": 0,
          "internal_block": 2
        }
      }
    }
  },
  {
    "id": "S18",
    "changes": {
      "q1": "money",
      "q3": [
        "alone",
        "self",
        "money",
        "health",
        "rel"
      ],
      "q4": "pain",
      "q5": "lose",
      "q6": "close",
      "q8": "calm"
    },
    "expected": {
      "topic": "internal_block",
      "persona": null,
      "scores": {
        "persona": {
          "professional": 0,
          "family": 1,
          "relational": 1
        },
        "villain": {
          "concrete_lack": 2,
          "health_burnout": 1,
          "internal_block": 6
        }
      }
    }
  },
  {
    "id": "S19",
    "changes": {
      "q3": [
        "self",
        "self",
        "money",
        "money"
      ]
    },
    "expected": {
      "topic": "mixed",
      "persona": "professional",
      "scores": {
        "persona": {
          "professional": 2,
          "family": 0,
          "relational": 0
        },
        "villain": {
          "concrete_lack": 1,
          "health_burnout": 0,
          "internal_block": 1
        }
      }
    }
  }
];

describe('19 independent scoring fixtures', () => {
  for (const fixture of fixtures) {
    test(fixture.id, () => {
      assert.deepEqual(calculate(answers(fixture.changes)), fixture.expected);
    });
  }
});

describe('weights, boundaries, and invariants', () => {
  test('all declared weights are finite positive integers and categories are known', () => {
    for (const [id, question] of Object.entries(questions)) {
      const ids = question.options?.map(option => option.id) ?? [];
      assert.equal(new Set(ids).size, ids.length, `${id} has duplicate option IDs`);
      for (const option of question.options ?? []) {
        const score = option.scores;
        if (!score) continue;
        assert.ok(Number.isInteger(score.weight) && score.weight > 0);
        assert.equal(Number(Boolean(score.persona)) + Number(Boolean(score.villain)), 1);
        if (score.persona) assert.ok(content.axes.persona.includes(score.persona));
        if (score.villain) assert.ok(content.axes.villain.includes(score.villain));
      }
    }
  });

  test('Q4 and Q8 apply their doubled weight once, not twice', () => {
    assert.equal(calculate({ q4: 'pain' }).scores.villain.internal_block, 2);
    assert.equal(calculate({ q4: 'money' }).scores.villain.concrete_lack, 2);
    assert.equal(calculate({ q4: 'wornout' }).scores.villain.health_burnout, 2);
    assert.equal(calculate({ q8: 'career' }).scores.persona.professional, 2);
    assert.equal(calculate({ q8: 'love' }).scores.persona.family, 2);
    assert.equal(calculate({ q8: 'rel' }).scores.persona.relational, 2);
    assert.equal(calculate({ q8: 'calm' }).scores.villain.internal_block, 2);
  });

  test('money is not a professional persona vote', () => {
    assert.deepEqual(calculate({ q1: 'money' }).scores.persona, zero.persona);
    assert.equal(calculate({ q1: 'money' }).scores.villain.concrete_lack, 1);
  });

  test('neutral options contribute no points and never invent an internal default', () => {
    const result = calculate({ q1: 'why', q3: ['none', 'alone'], q4: 'fear', q5: 'none', q6: 'alone' });
    // Scoring itself is defensive; completeness validation rejects mixed none+theme.
    assert.deepEqual(result.scores, zero);
    assert.equal(result.topic, 'mixed');
    assert.equal(result.persona, null);
  });

  test('all nine context/persona combinations remain independent', () => {
    const topicAnswers = {
      concrete_lack: { q3: ['money'], q4: 'money' },
      health_burnout: { q3: ['health'], q4: 'wornout' },
      internal_block: { q3: ['self'], q4: 'pain' },
    };
    const personaAnswer = { professional: 'career', family: 'love', relational: 'rel' };
    for (const [topic, topicInput] of Object.entries(topicAnswers)) {
      for (const [persona, q8] of Object.entries(personaAnswer)) {
        const result = calculate(answers({ ...topicInput, q8 }));
        assert.equal(result.topic, topic);
        assert.equal(result.persona, persona);
      }
    }
  });

  test('each defined context supports a base scene with no persona', () => {
    for (const [topic, input] of [
      ['concrete_lack', { q1: 'money', q3: ['money'], q4: 'money', q8: 'calm' }],
      ['health_burnout', { q3: ['health'], q4: 'wornout', q8: 'calm' }],
      ['internal_block', { q4: 'pain', q8: 'calm' }],
    ]) {
      const result = calculate(answers(input));
      assert.equal(result.topic, topic);
      assert.equal(result.persona, null);
    }
  });

  test('Q3 order, deduplication, removal and alone have the documented effects', () => {
    const set = ['self', 'money', 'health', 'rel'];
    const expected = calculate(answers({ q3: set }));
    assert.deepEqual(calculate(answers({ q3: [...set].reverse() })), expected);
    assert.deepEqual(calculate(answers({ q3: [...set, ...set] })), expected);
    assert.deepEqual(calculate(answers({ q3: [...set, 'alone'] })), expected);
    const removed = calculate(answers({ q3: set.filter(id => id !== 'health') }));
    assert.equal(removed.scores.villain.health_burnout, expected.scores.villain.health_burnout - 1);
    assert.deepEqual(removed.scores.persona, expected.scores.persona);
    assert.equal(
      answerLabel('q3', answers({ q3: set })),
      answerLabel('q3', answers({ q3: [...set].reverse() })),
    );
  });

  test('Q2, Q7, Q9, Q10, name and capture never change scores or result', () => {
    const anchor = answers({ q1: 'money', q3: ['money'], q4: 'wornout' });
    const expected = calculate(anchor);
    for (const q2 of ['many', 'once', 'first'])
      for (const q7 of ['skip', 18, 30, 120])
        for (const q9 of ['believer', 'doubter', 'skeptic'])
          for (const q10 of ['dinner', 'trip', 'gift', 'quiet']) {
            assert.deepEqual(calculate({ ...anchor, q2, q7, q9, q10, name: 'Different person', email: 'x@example.test' }), expected);
          }
  });

  test('calculation does not mutate its input and is repeatable', () => {
    const input = answers({ q3: ['self', 'money', 'self'] });
    const before = structuredClone(input);
    const result = calculate(input);
    assert.deepEqual(input, before);
    assert.deepEqual(calculate(input), result);
  });

  test('Q6 online/alone are equivalent; close adds exactly one family point', () => {
    const online = calculate(answers({ q6: 'online' }));
    assert.deepEqual(calculate(answers({ q6: 'alone' })), online);
    const close = calculate(answers({ q6: 'close' }));
    assert.deepEqual(close.scores.villain, online.scores.villain);
    assert.equal(close.scores.persona.family, online.scores.persona.family + 1);
  });
});

describe('inline consistency notes never predict using the answer being compared', () => {
  test('Q5 compares only Q3+Q4 against the actual category', () => {
    assert.equal(consistentAfterQ5(answers({ q3: ['self'], q4: 'pain', q5: 'enough' })), true);
    assert.equal(consistentAfterQ5(answers({ q3: ['self'], q4: 'pain', q5: 'alone' })), true);
    assert.equal(consistentAfterQ5(answers({ q3: ['self'], q4: 'pain', q5: 'none' })), false);
    assert.equal(consistentAfterQ5(answers({ q3: ['money'], q4: 'money', q5: 'enough' })), false);
    assert.equal(consistentAfterQ5(answers({ q3: ['self', 'money'], q4: 'fear', q5: 'enough' })), false);
    assert.equal(consistentAfterQ5(answers({ q3: ['none'], q4: 'bored', q5: 'enough' })), false);
  });

  test('Q1 and future answers cannot create a Q5 match', () => {
    const input = answers({ q3: ['money'], q4: 'money', q5: 'enough' });
    for (const q1 of ['work', 'family', 'rel', 'money', 'why'])
      for (const q8 of ['career', 'love', 'rel', 'calm'])
        assert.equal(consistentAfterQ5({ ...input, q1, q8 }), false);
  });

  test('Q8 compares Q1 and Q8 only; money never becomes career', () => {
    assert.equal(consistentAfterQ8(answers({ q1: 'work', q8: 'career' })), true);
    assert.equal(consistentAfterQ8(answers({ q1: 'family', q8: 'love' })), true);
    assert.equal(consistentAfterQ8(answers({ q1: 'rel', q8: 'rel' })), true);
    assert.equal(consistentAfterQ8(answers({ q1: 'work', q8: 'love' })), false);
    assert.equal(consistentAfterQ8(answers({ q1: 'money', q8: 'career' })), false);
    assert.equal(consistentAfterQ8(answers({ q1: 'why', q8: 'calm' })), false);
    assert.equal(consistentAfterQ8(answers({ q1: 'family', q8: 'calm' })), false);
    assert.equal(consistentAfterQ8(answers({ q1: 'why', q3: ['rel'], q4: 'pain', q6: 'close', q8: 'love' })), false);
  });

  test('edits remove a previously matching note', () => {
    const input = answers({ q1: 'work', q3: ['self'], q4: 'pain', q5: 'enough', q8: 'career' });
    assert.equal(consistentAfterQ5(input), true);
    assert.equal(consistentAfterQ8(input), true);
    assert.equal(consistentAfterQ5({ ...input, q3: ['money'], q4: 'money' }), false);
    assert.equal(consistentAfterQ8({ ...input, q1: 'family' }), false);
  });

  test('flow removes engine gates and email capture, preserving question order', () => {
    const steps = flow(freshState());
    assert.deepEqual(steps.filter(id => /^q\d+$/.test(id)), Array.from({ length: 10 }, (_, i) => `q${i + 1}`));
    assert.ok(!steps.some(id => id.startsWith('engine_reveal')));
    assert.ok(!steps.includes('gate_email'));
    assert.ok(!steps.includes('checkout'));
    assert.ok(steps.indexOf('priming_2') > steps.indexOf('q9'));
    assert.ok(steps.indexOf('gate_name') > steps.indexOf('q10'));
    assert.equal(steps.at(-1), 'result');
  });
});

describe('answer validity', () => {
  test('explicit neutral Q3 is present and can complete the question', () => {
    const none = questions.q3.options.find(option => option.id === 'none');
    assert.ok(none, 'The new exclusive neutral option must exist in the JSON');
    assert.ok(!none.scores);
    assert.equal(isAnswered('q3', { q3: ['none'] }), true);
    assert.equal(isAnswered('q3', { q3: [] }), false);
    assert.equal(isAnswered('q3', {}), false);
  });

  test('Q3 only accepts known option IDs', () => {
    assert.equal(isAnswered('q3', { q3: ['not-an-option'] }), false);
    assert.equal(isAnswered('q3', { q3: ['money', 'not-an-option'] }), false);
    assert.equal(isAnswered('q3', { q3: [42] }), false);
  });

  test('Q3 none is exclusive even before persistence', () => {
    assert.equal(isAnswered('q3', { q3: ['none', 'self'] }), false);
    assert.equal(isAnswered('q3', { q3: ['none', 'alone'] }), false);
  });

  test('age is optional via skip and only accepts finite adult integers', () => {
    for (const q7 of ['skip', 18, 30, 120]) assert.equal(isAnswered('q7', { q7 }), true);
    for (const q7 of [undefined, null, '', '18', '2e1', 0, 17, 121, -20, 18.5, NaN, Infinity]) {
      assert.equal(isAnswered('q7', { q7 }), false, String(q7));
    }
  });

  test('single-choice questions reject unknown IDs and arrays', () => {
    assert.equal(isAnswered('q1', { q1: 'work' }), true);
    assert.equal(isAnswered('q1', { q1: 'not-an-option' }), false);
    assert.equal(isAnswered('q1', { q1: ['work', 'family'] }), false);
  });
});

describe('corrupt session handling, restore and revision', () => {
  test('empty, malformed and wrong-version sessions return fresh state', () => {
    for (const raw of [null, '', '{', 'null', '[]', '{}', '"text"', '{"version":7,"answers":{}}', '{"version":"8","answers":{}}', '{"version":8,"answers":null}']) {
      assert.deepEqual(readState(raw), freshState(), String(raw));
    }
  });

  test('complete valid answers restore result and retain explicit neutral Q3', () => {
    const restored = restore();
    assert.equal(restored.screen, 'result');
    assert.deepEqual(restored.answers, answers());
    assert.deepEqual(calculate(restored.answers), calculate(answers()));
  });

  test('an unknown current screen safely falls back to the intro', () => {
    const restored = restore({ screen: 'not-a-screen' });
    assert.equal(restored.screen, 'screen_0');
  });

  test('missing required answer returns to the earliest unanswered question', () => {
    const input = answers();
    delete input.q2;
    delete input.q4;
    const restored = restore({ answers: input });
    assert.equal(restored.screen, 'q2');
    assert.equal(isAnswered('q2', restored.answers), false);
  });

  test('missing age must be explicitly skipped before result', () => {
    const input = answers();
    delete input.q7;
    assert.equal(restore({ answers: input }).screen, 'q7');
    assert.equal(restore({ answers: { ...input, q7: 'skip' } }).screen, 'result');
  });

  test('invalid single answer cannot silently finish the quiz', () => {
    const restored = restore({ answers: answers({ q4: 'not-an-option' }) });
    assert.equal(restored.screen, 'q4');
    assert.equal(restored.answers.q4, undefined);
  });

  test('Q3 unknown member requires review instead of silently altering the result', () => {
    const restored = restore({ answers: answers({ q3: ['money', 'not-an-option'] }) });
    assert.equal(restored.screen, 'q3');
    assert.equal(isAnswered('q3', restored.answers), false);
  });

  test('Q3 conflicting none and a scored theme requires review', () => {
    const restored = restore({ answers: answers({ q3: ['none', 'self'] }) });
    assert.equal(restored.screen, 'q3');
    assert.equal(isAnswered('q3', restored.answers), false);
  });

  test('Q3 known duplicate IDs are safely deduplicated', () => {
    const restored = restore({ answers: answers({ q3: ['money', 'self', 'money'] }) });
    assert.equal(restored.screen, 'result');
    assert.deepEqual(new Set(restored.answers.q3), new Set(['money', 'self']));
    assert.equal(restored.answers.q3.length, 2);
    assert.deepEqual(calculate(restored.answers), calculate(answers({ q3: ['money', 'self'] })));
  });

  test('saved result/category and arbitrary keys cannot override recalculation', () => {
    const restored = restore({
      topic: 'internal_block', persona: 'family',
      answers: { ...answers({ q1: 'money', q3: ['money'], q4: 'money' }), madeUp: 'internal_block' },
    });
    assert.equal(calculate(restored.answers).topic, 'concrete_lack');
    assert.equal(restored.answers.madeUp, undefined);
    assert.equal(restored.topic, undefined);
  });

  test('a reviewed answer changes restored totals and outcome without changing result directly', () => {
    const before = answers({ q1: 'money', q3: ['money'], q4: 'money' });
    assert.equal(calculate(before).topic, 'concrete_lack');
    const revised = { ...before, q3: ['health'], q4: 'wornout' };
    const restored = restore({ answers: revised });
    assert.equal(restored.screen, 'result');
    assert.equal(calculate(restored.answers).topic, 'health_burnout');
  });

  test('restored names remove controls, trim and enforce the length boundary', () => {
    assert.equal(restore({ name: ' \u0000Ada\u001f ' }).name, 'Ada');
    assert.equal(restore({ name: 'A'.repeat(100) }).name.length, 60);
    assert.equal(restore({ name: { invalid: true } }).name, '');
    assert.deepEqual(calculate(restore({ name: 'Another person' }).answers), calculate(answers()));
  });

  test('changing Q9 drops the prior branch experience', () => {
    const restored = restore({
      answers: answers({ q9: 'doubter' }),
      priming: { branch: 'believer', answer: 'yes', word: '' },
    });
    assert.equal(restored.priming, null);
  });

  test('same-branch valid experience survives refresh', () => {
    const priming = { branch: 'skeptic', answer: 'yes', word: 'Money' };
    assert.deepEqual(restore({ priming }).priming, priming);
  });

  test('unknown priming answer/branch is discarded, never filled with yes', () => {
    assert.equal(restore({ priming: { branch: 'skeptic', answer: 'maybe', word: 'Money' } }).priming, null);
    assert.equal(restore({ priming: { branch: 'unknown', answer: 'yes', word: 'Money' } }).priming, null);
  });

  test('invalid association words are discarded', () => {
    const restored = restore({ priming: { branch: 'skeptic', answer: 'yes', word: '<script>' } });
    assert.equal(restored.priming.word, '');
  });

  test('non-word branches cannot retain a word from another experience', () => {
    const restored = restore({
      answers: answers({ q9: 'believer' }),
      priming: { branch: 'believer', answer: 'yes', word: 'Money' },
    });
    assert.equal(restored.priming.word, '');
  });

  test('a skipped experience cannot retain an old association', () => {
    const restored = restore({ priming: { branch: 'skeptic', answer: 'skip', word: 'Money' } });
    assert.equal(restored.priming.answer, 'skip');
    assert.equal(restored.priming.word, '');
  });

  test('skip/no/some/yes and words have no effect on the calculated result', () => {
    const expected = calculate(answers());
    for (const answer of ['skip', 'no', 'some', 'yes']) {
      const restored = restore({ priming: { branch: 'skeptic', answer, word: 'Money' } });
      assert.deepEqual(calculate(restored.answers), expected);
    }
  });

  test('restoring twice is stable for a canonical valid state', () => {
    const once = restore({ answers: answers({ q3: ['money', 'self'] }), name: 'Ada', priming: { branch: 'skeptic', answer: 'some', word: 'Money' } });
    assert.deepEqual(readState(JSON.stringify(once)), once);
  });
});
