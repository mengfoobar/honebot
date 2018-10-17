const Sequelize = require('sequelize');
const _ = require('lodash');
const connection = require('../db');
const logger = require('../utils/logger');

const ScheduledMessage = connection.define('scheduled_message', {
  id: {
    type: Sequelize.DataTypes.INTEGER,
    unique: true,
    primaryKey: true,
    autoIncrement: true,
  },
  channelId: {
    type: Sequelize.DataTypes.STRING,
    allowNull: false,
  },
  workspaceId: {
    type: Sequelize.DataTypes.STRING,
    allowNull: false,
  },
  dateScheduled: {
    type: Sequelize.DataTypes.STRING,
    validate: {
      is: /^([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))$/,
    },
    allowNull: false,
  },
  messageType: {
    type: Sequelize.DataTypes.STRING,
    allowNull: false,
  },
  addtionalData: {
    type: Sequelize.DataTypes.JSON,
  },
  // TODO: fill out rest after discussion with Dexter
});

// creates table if it doesn't exist
ScheduledMessage.sync();

module.exports = ScheduledMessage;
