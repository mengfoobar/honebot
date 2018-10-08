const { TEXT, IMAGE, QUESTION } = require('../constants/messageTypes');
const { MEDIUM, EASY, HARD } = require('../constants/puzzleDifficulty');

module.exports = [
  {
    id: 'QUIZ_1',
    difficulty: EASY,
    messages: [
      {
        type: TEXT,
        value: 'Hey there good looking. Click start to take on the quiz',
      },
      {
        type: IMAGE,
        value: 'https://static.boredpanda.com/blog/wp-content/uploads/2015/09/father-son-comics-lunarbaboon-76__700.jpg',
      },
      {
        type: QUESTION,
        value: 'When papa bear was 31, baby bear was 8. Now baby bear big and strong, and papa bear is twice as old as baby bear. How old is baby bear?',
        choices: [
          {
            label: '36',
            value: 36,
          },
          {
            label: '12',
            value: 12,
          },
          {
            label: '19',
            value: 19,
          },
          {
            label: '23',
            value: '23',
          },
        ],
      },
    ],
    answer: '23',
    solution: 'Some solution',
  },
];
