const Sequelize = require('sequelize');
const _ = require('lodash');
const connection = require('../db');
const logger = require('../utils/logger');
const PuzzleDifficulties = require('../constants/puzzleDifficulty');
const PuzzleTypes = require('../constants/puzzleType');
const { TEXT, IMAGE, MC_QUESTION } = require('../constants/messageTypes');
const puzzles = require('../constants/puzzles');

const Puzzle = connection.define('puzzle', {
  id: {
    type: Sequelize.DataTypes.STRING,
    unique: true,
    primaryKey: true,
  },
  difficulty: {
    type: Sequelize.DataTypes.ENUM,
    values: Object.keys(PuzzleDifficulties),
    allowNull: false,
  },
  type: {
    type: Sequelize.DataTypes.ENUM,
    values: Object.keys(PuzzleTypes),
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
  puzzles.map(p => Puzzle.findOrCreate({
    where: { id: p.id },
    defaults: p,
  }));
});

module.exports = Puzzle;
