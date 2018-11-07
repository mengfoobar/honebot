const PuzzleTypes = require('../constants/puzzleType');
const { IMAGE, MC_QUESTION, TEXT } = require('../constants/messageTypes');

module.exports = [
  {
    id: 'INTRO_PUZZLE',
    difficulty: 'EASY',
    type: PuzzleTypes.INTRO,
    correctAnswer: 'B',
    messages: [
      {
        type: IMAGE,
        value: 'https://gph.is/19qxtuh',
      },
      {
        type: TEXT,
        value: [
          'Assuming that x >= 0, and the code below is executed:',
          '```y=0',
          'Do while y <= x',
          '    y = x*2',
          'Loop```',
          '',
        ].join('\n'),
      },
      {
        type: MC_QUESTION,
        value: [
          'Which of the following statements are false?',
          '',
          'i: y may be equal to x+1',
          'ii: y may be odd',
          'iii: y may be equal to x',
        ].join('\n'),
        choices: [

          {
            label: 'i',
            value: 'A',
          },
          {
            label: 'ii',
            value: 'B',
          },
          {
            label: 'iii',
            value: 'C',
          },
          {
            label: 'i && ii',
            value: 'D',
          },
          {
            label: 'ii & iii',
            value: 'E',
          },
        ],
      },
    ],
    solution: [
      "Let's go through each option:",
      '*y may be equal to x+1* -> true if x = 1',
      "*y may be odd* -> can't true since it will always be 2*(an integer) ",
      '*y may be equal to x* -> true if x = 0',
      'Based on the above findings, the correct answer is both ii',
    ].join('\n'),
  },
  {
    id: 'CQ8GDg4IAQA',
    difficulty: 'EASY',
    type: PuzzleTypes.GENERAL,
    correctAnswer: 'D',
    messages: [
      {
        type: TEXT,
        value: [
          'Mapping is a functional programming concept that applies a function to each item of a list, returning a list with newly computed values.',
          'Knowing that, given a list `[52, 31, 29, 92, 102]` and the mapping function:',
          '```function makeNewValue(value):',
          '    return 2*value*value - 5*value```',
        ].join('\n'),
      },
      {
        type: MC_QUESTION,
        value: 'Which one of the following is the mapped array?',
        choices: [
          {
            label: '[5148, 1849, 1239, 21468, 30298]',
            value: 'A',
          },
          {
            label: '[-156, -93, -87, -276, -306]',
            value: 'B',
          },
          {
            label: '[2444, 806, 696, 8004, 9894]',
            value: 'C',
          },
          {
            label: '[5148, 1767, 1537, 16468, 20298]',
            value: 'D',
          },
        ],
      },
    ],
    solution: [
      "Let's evaluate the values of mapping function:",
      '52  ->  2*52*52 - 5*52 = 5148',
      "Only two options have 5148 as the value for the first element. Let's check the second element",
      '31   -> 2*31*31 - 5*31 = 1767',
      'Only [5148, 1767, 1537, 16468, 20298] matches at this point. Which is the correct answer',
    ].join('\n'),
  },
  {
    id: 'CwoBBQILCgM',
    difficulty: 'EASY',
    type: PuzzleTypes.GENERAL,
    correctAnswer: 'B',
    messages: [
      {
        type: IMAGE,
        value: 'https://gph.is/1xJPcrI',
      },
      {
        type: MC_QUESTION,
        value: [
          "Given a sort function `sort(list)` that sorts list of elements in alphabetical order, how many possible different inputs would there be for the output `['a', 'b', 'c', 'd']`?",
          "For ex. `['d', 'c', 'b', 'a']` is one possibility, and `['z', 'y', 'g', 'a']` is not for obvious reasons.",
        ].join('\n'),
        choices: [
          {
            label: '6',
            value: 'A',
          },
          {
            label: '24',
            value: 'B',
          },
          {
            label: '16',
            value: 'C',
          },
          {
            label: '48',
            value: 'D',
          },
        ],
      },
    ],
    solution:
      'The number of different permutations for the input can be computed by factorial: `4! = 24`. Here is an example https://en.wikipedia.org/wiki/Factorial_number_system#Examples that you can check out.',
  },
  {
    id: 'BwENDAQGAQQ',
    difficulty: 'EASY',
    type: PuzzleTypes.GENERAL,
    correctAnswer: 'D',
    messages: [
      {
        type: IMAGE,
        value: 'https://gph.is/1xJPcrI',
      },
      {
        type: TEXT,
        value: [
          'Given the sorting function is as below:',
          '```def sort(items):',
          '  for i in range(len(items)-1):',
          '    for j in range(i+1, len(items)):',
          '      if items[i] > items[j]:',
          '        switch(items, i, j)',
          '  return items```',

          "where *items* is a list of 4 unique integers, and *switch* switches the values for an array given 2 positions (I know it's obvious but I wanted to tell you what it does anyways).",
        ].join('\n'),
      },
      {
        type: MC_QUESTION,
        value: [
          'What is a max number of comparisons that will be made?',
        ].join('\n'),
        choices: [
          {
            label: '16',
            value: 'A',
          },
          {
            label: '10',
            value: 'B',
          },
          {
            label: '24',
            value: 'C',
          },
          {
            label: '6',
            value: 'D',
          },
        ],
      },
    ],
    solution: [
      'Given any four elements, comparisons will need to be made with the following i,j combination:',
      '1) i=0, j=1 -> +1 comparison',
      '2) i=0, j=2 -> +1 comparison',
      '3) i=0, j=3 -> +1 comparison',
      '4) i=1, j=2 -> +1 comparison',
      '5) i=1, j=3 -> +1 comparison',
      '6) i=2, j=3 -> +1 comparison',
      '',
      'Add them all up and we get 6 comparisons!',
    ].join('\n'),
  },
  {
    id: 'Cg8KBwMBDg4',
    difficulty: 'EASY',
    type: PuzzleTypes.GENERAL,
    correctAnswer: 'D',
    messages: [
      {
        type: IMAGE,
        value: 'https://gph.is/1EhRnSB',
      },
      {
        type: TEXT,
        value: [
          'Given the sorting function is as below:',
          '```def sort(items):',
          '  for i in range(len(items)-1):',
          '    for j in range(i+1, len(items)):',
          '      if items[i] > items[j]:',
          '        switch(items, i, j)',
          '  return items```',

          "where *items* is a list of 4 integers, and *switch* switches the values for an array given 2 positions (I know it's obvious but I wanted to tell you what it does anyways).",
        ].join('\n'),
      },
      {
        type: MC_QUESTION,
        value: [
          'What is the max number of *switches* that will be made?',
        ].join('\n'),
        choices: [
          {
            label: '16',
            value: 'A',
          },
          {
            label: '4',
            value: 'B',
          },
          {
            label: '8',
            value: 'C',
          },
          {
            label: '6',
            value: 'D',
          },
        ],
      },
    ],
    solution: [
      "Let's use [4,3,2,1] since most switches will be needed:",
      '1) i=0, j=1 -> 4>3 -> +1 switch. `items=[3, 4, 2, 1]`',
      '2) i=0, j=2 -> 3>2 -> +1 switch. `items=[2, 4, 3, 1]`',
      '3) i=0, j=3 -> 2>1 -> +1 switch. `items=[1, 4, 3, 2]`',
      '4) i=1, j=2 -> 4>3 -> +1 switch. `items=[1, 3, 4, 2]`',
      '5) i=1, j=3 -> 3>2 -> +1 switch. `items=[1, 2, 4, 3]`',
      '6) i=2, j=3 -> 4>3 -> +1 switch. `items=[1, 2, 3, 4]`',
      '',
      'Add them all up and we get 6 switches!',
    ].join('\n'),
  },
  {
    id: 'CwIBAQ8IBQ0',
    difficulty: 'EASY',
    type: PuzzleTypes.GENERAL,
    correctAnswer: 'C',
    messages: [
      {
        type: IMAGE,
        value: 'https://gph.is/1Va8Ki7',
      },
      {
        type: TEXT,
        value: [
          'Ah, Fibonacci, the classic.',
          'For the Fibonacci function below:',
          '```def F(n):',
          '  if n<0:',
          "    print('Invalid input')",
          '  elif n==1:',
          '    return 0',
          '  elif n==2:',
          '    return 1',
          '  else:',
          '    return F(n-1)+F(n-2)```',
        ].join('\n'),
      },
      {
        type: MC_QUESTION,
        value: [
          'How many times does the function `F` get called if `n = 4`?',
        ].join('\n'),
        choices: [
          {
            label: '2',
            value: 'A',
          },
          {
            label: '10',
            value: 'B',
          },
          {
            label: '9',
            value: 'C',
          },
          {
            label: '16',
            value: 'D',
          },
        ],
      },
    ],
    solution: [
      'F(4)',
      '  -> F(3)',
      '    -> F(2)',
      '      -> F(1)',
      '      -> F(0)',
      '    -> F(1)',
      '  -> F(2)',
      '    -> F(1)',
      '    -> F(0)',
      '',
      "annnnnd that's 9 times!",

    ].join('\n'),
  },
  {
    id: 'CQEGCAkFBg0',
    difficulty: 'EASY',
    type: PuzzleTypes.GENERAL,
    correctAnswer: 'A',
    messages: [
      {
        type: IMAGE,
        value: 'https://gph.is/1ikjxn2',
      },
      {
        type: TEXT,
        value: [
          'Starting off with an empty stack, the following operations are applied:',
          '```push(5)',
          'push(10)',
          'pop()',
          'push(pop()*3)',
          'push(30)',
          'push(pop()/2)```',
        ].join('\n'),
      },
      {
        type: MC_QUESTION,
        value: [
          'Which of the following values represent the final stack?',
        ].join('\n'),
        choices: [
          {
            label: '[15, 15]',
            value: 'A',
          },
          {
            label: '[30, 15]',
            value: 'B',
          },
          {
            label: '[30, 30]',
            value: 'C',
          },
          {
            label: '[15, 30]',
            value: 'D',
          },
        ],
      },
    ],
    solution: [
      'push(5) -> [5]',
      'push(10) -> [5, 10]',
      'pop() -> [5]',
      'push(pop()*3)) -> [15]',
      'push(30) -> [15, 30]',
      'push(pop()/2) -> [15, 15]',
      '',
      'Thus the final result is [15, 15]',
    ].join('\n'),
  },
  {
    id: 'CQAACQYKCQQ',
    difficulty: 'EASY',
    type: PuzzleTypes.GENERAL,
    correctAnswer: 'D',
    messages: [
      {
        type: IMAGE,
        value: 'https://gph.is/2v90hoC',
      },
      {
        type: TEXT,
        value: [
          "Peeking in a stack, as you may recall, let's you see the top of the stack. ",
          '```push(9)',
          'push(5)',
          'push(pop()*5)',
          'push(9)',
          'pop()',
          'print peek()```',
        ].join('\n'),
      },
      {
        type: MC_QUESTION,
        value: [
          "Assuming we start off with an empty stack, what's the printed value?",
        ].join('\n'),
        choices: [
          {
            label: '9',
            value: 'A',
          },
          {
            label: '15',
            value: 'B',
          },
          {
            label: '5',
            value: 'C',
          },
          {
            label: '25',
            value: 'D',
          },
        ],
      },
    ],
    solution: [
      'push(9) -> [9]',
      'push(5) -> [9, 5]',
      'push(pop()*5) -> [9, 25]',
      'push(9) -> [9, 25, 9]',
      'pop() -> [9, 25]',
      '',
      'Now if we peek, we get the value of the top of the stack, which is 25!',
    ].join('\n'),
  },
  {
    id: 'AQoLCwYDDgA',
    difficulty: 'EASY',
    type: PuzzleTypes.GENERAL,
    correctAnswer: 'A',
    messages: [
      {
        type: IMAGE,
        value: 'https://gph.is/1KOKfoH',
      },
      {
        type: TEXT,
        value: [
          'Assuming we start off with an empty queue and apply the following operations',
          '```enqueue(3)',
          'enqueue(dequeue()*4)',
          'enqueue(5)',
          'enqueue(3*dequeue())',
          'enqueue(8)```',
        ].join('\n'),
      },
      {
        type: MC_QUESTION,
        value: [
          'What does the ensuing queue look like?',
        ].join('\n'),
        choices: [
          {
            label: '[5, 36, 8]',
            value: 'A',
          },
          {
            label: '[36, 8, 5]',
            value: 'B',
          },
          {
            label: '[12, 5, 8]',
            value: 'C',
          },
          {
            label: '[5, 8, 12]',
            value: 'D',
          },
        ],
      },
    ],
    solution: [
      'enqueue(3) -> [3]',
      'enqueue(dequeue()*4) -> [12]',
      'enqueue(5) -> [12, 5]',
      'enqueue(3*dequeue()) -> [5, 36]',
      'enqueue(8) -> [5, 36, 8]```',
      '',
      'So now we end up with [5, 36, 8]',
    ].join('\n'),
  },
  {
    id: 'DwEEBAwOCgg',
    difficulty: 'EASY',
    type: PuzzleTypes.GENERAL,
    correctAnswer: 'A',
    messages: [
      {
        type: IMAGE,
        value: 'https://gph.is/1KOKfoH',
      },
      {
        type: TEXT,
        value: [
          'Consider the following code segment.',
          'for (int k =0; k <= 20; k = k + 2)',
          '```{',
          '  if (k % 3 == 1)',
          "    print(k+' ');",
          '}```',
        ].join('\n'),
      },
      {
        type: MC_QUESTION,
        value: [
          "What's the printed output?",
        ].join('\n'),
        choices: [
          {
            label: '0 2 4 6 8 10 12 14 16 18',
            value: 'A',
          },
          {
            label: '4 10 16',
            value: 'B',
          },
          {
            label: '1 4 7 10 13 16 19',
            value: 'C',
          },
          {
            label: '0 6 12 18',
            value: 'D',
          },
        ],
      },
    ],
    solution: [
      'We shall evaluate a few iterations',
      'k = 0 -> 0%3 != 1 -> do nothing',
      'k = 1 -> 1%3 == 1 -> print 1',
      'k = 2 -> 2%3 != 1 -> do nothing',
      'k = 3 -> 3%3 != 1 -> do nothing',
      'k = 4 -> 4%3 == 1 -> print 4',
      '',
      "well at this point, it's pretty evident that the answer is [1 4 7 10 13 16 19] since nothing else matches",
    ],
  },
  {
    id: 'DQAPBgMIAQ4',
    difficulty: 'EASY',
    type: PuzzleTypes.GENERAL,
    correctAnswer: 'C',
    messages: [
      {
        type: IMAGE,
        value: 'https://gph.is/1Z5slS0',
      },
      {
        type: TEXT,
        value: [
          'Given the recursive function below:',
          'def foo(count):',
          '  if count > 1:',
          '    foo(count/2)',
          '    foo(count/2)',
          '  print ("#")',
        ].join('\n'),
      },
      {
        type: MC_QUESTION,
        value: [
          'How many times does "#" get printed for count = 4?  (try it without compiling)',
        ].join('\n'),
        choices: [
          {
            label: '3',
            value: 'A',
          },
          {
            label: '9',
            value: 'B',
          },
          {
            label: '7',
            value: 'C',
          },
          {
            label: '8',
            value: 'D',
          },
        ],
      },
    ],
    solution: [
      "Let's break this down!",
      'F(4)',
      '  ->F(2)',
      '    ->F(1)',
      '    ->F(1)',
      '  ->F(2)',
      '    ->F(1)',
      '    ->F(1)',
      'Count all them up, we have 7 times!',
    ].join('\n'),
  },
  {
    id: 'CQYGCgMEDQ8',
    difficulty: 'EASY',
    type: PuzzleTypes.GENERAL,
    correctAnswer: 'A',
    messages: [
      {
        type: IMAGE,
        value: 'https://gph.is/2BeYGUR',
      },
      {
        type: TEXT,
        value: [
          'The following algorithm takes as input an array, and returns the array with all the duplicate elements removed. For example, if the input array is',
          '[3, 3, 1, 4, 5, 5], the algorithm returns [3, 1, 4, 5].',
          '```function removeDuplicates(array) ',
          '  S = new empty set',
          '  A = new empty dynamic array',
          '  for every element x in input array',
          '    if not S.has(x) then',
          '      S.set(x)',
          '      A.push(x)',
          '  return```',
        ].join('\n'),
      },
      {
        type: MC_QUESTION,
        value: [
          'If *S* is a hash set, what is the *O()* complexity?',
        ].join('\n'),
        choices: [
          {
            label: 'O(n)',
            value: 'A',
          },
          {
            label: 'O(1)',
            value: 'B',
          },
          {
            label: 'O(log(n))',
            value: 'C',
          },
          {
            label: 'O(n*log(n))',
            value: 'D',
          },
        ],
      },
    ],
    solution: 'Since hash set has O(1), and we are iterating through n elements -> it would be O(n)',
  },
  {
    id: 'AwgMCggDAgk',
    difficulty: 'EASY',
    type: PuzzleTypes.GENERAL,
    correctAnswer: 'B',
    messages: [
      {
        type: IMAGE,
        value: 'http://gph.is/1UPaPOh',
      },
      {
        type: TEXT,
        value: [
          'The code below checks if an input string of parenthesis are balanced:',
          '```initiate an empty stack',
          'while (char exist)',
          '{',
          '  read char',
          "  if ( char is '(' )",
          '     stack push char',
          "  else if ( char is ')' and stack is not empty )",
          '     stack pop char',
          '  else',
          "     return 'false'",
          '}',
          'return true```',
        ].join('\n'),
      },
      {
        type: MC_QUESTION,
        value: [
          'Well oops, the code above has a few bugs in it. Which of the below inputs will be wrongly accepted as balanced?',
        ].join('\n'),
        choices: [
          {
            label: '(()))()',
            value: 'A',
          },
          {
            label: '((())',
            value: 'B',
          },

          {
            label: '(()()))',
            value: 'C',
          },
          {
            label: '())(()',
            value: 'D',
          },

        ],
      },
    ],
    solution: [
      "Let's evaluate B: ((())",
      '( -> push: ["("]',
      '( -> push: ["(", "("]',
      '( -> push: ["(", "(", "("]',
      ') -> pop: ["(", "("]',
      ') -> pop: ["("]',
      'while loop exits, and code will return *true*, which is the wrong answer!',
    ].join('\n'),
  },
  {
    id: 'BgQIDAQHAwg',
    difficulty: 'EASY',
    type: PuzzleTypes.GENERAL,
    correctAnswer: 'A',
    messages: [
      {
        type: IMAGE,
        value: 'http://gph.is/1UPaPOh',
      },
      {
        type: TEXT,
        value: [
          'The code below checks if an input string of parenthesis are balanced:',
          '```initiate an empty stack',
          'while (char exist)',
          '{',
          '  read char',
          "  if ( char is '(' )",
          '     stack push char',
          "  else if ( char is ')' and stack is not empty )",
          '     stack pop char',
          '  else',
          "     return 'false'",
          '}',
          'return true```',
        ].join('\n'),
      },
      {
        type: MC_QUESTION,
        value: [
          'Well oops, the code above has a few bugs in it. Which of the following inputs will result in an underflow error?',
        ].join('\n'),
        choices: [
          {
            label: '(())())(',
            value: 'A',
          },
          {
            label: '((())',
            value: 'B',
          },

          {
            label: '(()())',
            value: 'C',
          },
          {
            label: '(())()(',
            value: 'D',
          },

        ],
      },
    ],
    solution: [
      "Let's evaluate A: (())())(",
      '( -> push: ["("]',
      '( -> push: ["(", "("]',
      ') -> pop: ["("]',
      ') -> pop: []',
      '( -> push: ["("]',
      ') -> pop: []',
      ') -> pop: throw underflow error because array is empty!',
    ].join('\n'),
  },
  {
    id: 'CQgHAwYNCA4',
    difficulty: 'EASY',
    type: PuzzleTypes.GENERAL,
    correctAnswer: 'B',
    messages: [
      {
        type: IMAGE,
        value: 'http://gph.is/1Va8Ki7',
      },
      {
        type: TEXT,
        value: [
          'Given the code below:',
          '```def func(x, y):',
          '{',
          '  if (y == 0)   ',
          '    return 0;',
          '  return (x + func(x, y-1));',
          '}```',
        ].join('\n'),
      },
      {
        type: MC_QUESTION,
        value: [
          'Which of the following expressions does the recursive function represent?',
        ].join('\n'),
        choices: [
          {
            label: 'x + y',
            value: 'A',
          },
          {
            label: 'x + x*y',
            value: 'B',
          },
          {
            label: 'x*y',
            value: 'C',
          },
          {
            label: 'xy',
            value: 'D',
          },
          {
            label: 'B & C',
            value: 'E',
          },

        ],
      },
    ],
    solution: [
      "Let's try an example f(2, 4) to test out what the function does.",
      'We start by expanding the recursive function:',
      '2+f(2, 3)',
      '  -> 2+f(2, 2)',
      '    -> 2+f(2,1)',
      '      -> 2+f(2, 0)',
      '        -> 2+0',
      '',
      'Evaluating each recursive step beginning with the base case gives us: ',
      '10',
      '  -> 8',
      '    -> 6',
      '      -> 4',
      '        -> 2',
      'The only choice that matches the value f(2, 4) = 10 is B -> 2+2*4',
    ].join('\n'),
  },
  {
    id: 'DgACDgsHCwg',
    difficulty: 'EASY',
    type: PuzzleTypes.GENERAL,
    correctAnswer: 'C',
    messages: [
      {
        type: IMAGE,
        value: 'http://gph.is/2tbpGMD',
      },
      {
        type: MC_QUESTION,
        value: [
          'Given the following input (4322, 1334, 1471, 9679, 1989, 6171, 6173, 4199) and the hash function x % 10, which of the following statements are true?',
          'i. 9679, 1989, 4199 hash to the same value',
          'ii. 1471, 6171 has to the same value',
          'iii. All elements hash to the same value',
          'iv. Each element hashes to a different value',
        ].join('\n'),
        choices: [
          {
            label: 'i',
            value: 'A',
          },
          {
            label: 'ii',
            value: 'B',
          },
          {
            label: 'i & ii',
            value: 'C',
          },
          {
            label: 'iii or iv',
            value: 'D',
          },

        ],
      },
    ],
    solution: '[9679, 1989 4199] % 10 all gives you 9 , and [1471, 6171] % 10 gives you 1. So both i and ii are correct',
  },

];
