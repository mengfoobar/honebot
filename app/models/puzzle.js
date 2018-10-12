const Sequelize = require('sequelize');
const _ = require('lodash');
const connection = require('../db');
const logger = require('../utils/logger');
const puzzleDifficulties = require('../constants/puzzleDifficulty');
const puzzleTypes = require('../constants/puzzleType');
const { TEXT, IMAGE, MC_QUESTION } = require('../constants/messageTypes');

const Puzzle = connection.define('puzzle', {
  id: {
    type: Sequelize.DataTypes.STRING,
    unique: true,
    primaryKey: true,
  },
  difficulty: {
    type: Sequelize.DataTypes.ENUM,
    values: Object.keys(puzzleDifficulties),
    allowNull: false,
  },
  type: {
    type: Sequelize.DataTypes.ENUM,
    values: Object.keys(puzzleTypes),
    allowNull: false,
  },
  correctAnswer: {
    type: Sequelize.DataTypes.STRING,
    allowNull: false,
  },
  solution: {
    type: Sequelize.DataTypes.STRING(1072),
  },
  messages: {
    type: Sequelize.DataTypes.JSON,
    allowNull: false,
  },
  // TODO: fill out rest after discussion with Dexter
});


// creates table if it doesn't exist
Puzzle.sync().then(() => {
  // Table created
  logger.info('Succesfully synced channel to mysql');
  return Puzzle.findOrCreate({
    where: { id: 'QUIZ_1' },
    defaults: {
      id: 'QUIZ_1',
      difficulty: 'EASY',
      type: 'MATH',
      correctAnswer: '23',
      solution: 'Some solution',
      messages: [
        {
          type: IMAGE,
          value: 'https://static.boredpanda.com/blog/wp-content/uploads/2015/09/father-son-comics-lunarbaboon-76__700.jpg',
        },
        {
          type: MC_QUESTION,
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
    },
  });
});

module.exports = Puzzle;
