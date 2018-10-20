// noinspection JSAnnotator
const Sequelize = require('sequelize');
const connection = require('../db');
const Puzzle = require('./puzzle');
const Channel = require('./channel');
const User = require('./user');


const Submission = connection.define('submission', {
  id: {
    type: Sequelize.DataTypes.INTEGER,
    autoIncrement: true,
    unique: true,
    primaryKey: true,
  },
  score: {
    type: Sequelize.DataTypes.FLOAT,
    allowNull: false,
  },
  duration: {
    type: Sequelize.DataTypes.INTEGER,
  },
  isAnswerCorrect: {
    type: Sequelize.DataTypes.BOOLEAN,
    allowNull: false,
  },
  submittedAnswer: {
    type: Sequelize.DataTypes.STRING(256),
  },
});

Submission.belongsTo(Puzzle, { foreignKey: 'puzzleId' });
Submission.belongsTo(Channel, { foreignKey: 'channelId' });
Submission.belongsTo(User, { foreignKey: 'userId' });

Submission.sync();

module.exports = Submission;
