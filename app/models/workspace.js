const sequelize = require('sequelize');
const connection = require('../db');
const logger = require('../utils/logger');

const Workspace = connection.define('workspace', {
  id: {
    type: sequelize.STRING(256),
    unique: true,
    primaryKey: true,
  },
  botUserId: {
    type: sequelize.STRING(256),
    allowNull: false,
  },
  createdBy: {
    // possible tie in to user as foreign key
    type: sequelize.STRING(256),
    allowNull: false,
  },
  team: { // name for team
    type: sequelize.STRING(256),
    allowNull: false,
  },
  url: {
    type: sequelize.STRING(256),
    allowNull: false,
  },
  dateCreated: {
    type: sequelize.DATE,
    defaultValue: sequelize.NOW,
  },
  botToken: {
    // https://api.slack.com/docs/token-types#bot
    type: sequelize.STRING(256),
  },
  workspaceToken: {
    // https://api.slack.com/docs/token-types#workspace
    type: sequelize.STRING(256),
  },

});


// creates table if it doesn't exist
Workspace.sync().then(() => {
  logger.info('Succesfully synced workspace to mysql');
});

module.exports = Workspace;
