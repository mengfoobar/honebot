const sequelize = require('sequelize');
const connection = require('../db');
const logger = require('../utils/logger');
const Workspace = require('./workspace');

const Channel = connection.define('channel', {
  id: {
    type: sequelize.STRING(256),
    unique: true,
    primaryKey: true,
  },
  invitedBy: {
    type: sequelize.STRING(256),
    allowNull: false,
  },
  workspace: { // name for team
    type: sequelize.STRING(256),
    allowNull: false,
    references: {
      model: Workspace,
      key: 'id',
    },
  },
  // TODO: fill out rest after discussion with Dexter
});


// creates table if it doesn't exist
Channel.sync().then(() => {
  logger.info('Succesfully synced channel to mysql');
});

module.exports = Channel;
