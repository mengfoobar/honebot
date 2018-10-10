const Sequelize = require('sequelize');
const connection = require('../db');
const logger = require('../utils/logger');

const Workspace = connection.define('workspace', {
  id: {
    type: Sequelize.DataTypes.STRING(256),
    unique: true,
    primaryKey: true,
  },
  botUserId: {
    type: Sequelize.DataTypes.STRING(256),
    allowNull: false,
  },
  createdBy: {
    // possible tie in to user as foreign key
    type: Sequelize.DataTypes.STRING(256),
    allowNull: false,
  },
  team: { // name for team
    type: Sequelize.DataTypes.STRING(256),
    allowNull: false,
  },
  url: {
    type: Sequelize.DataTypes.STRING(256),
    allowNull: false,
  },
  dateCreated: {
    type: Sequelize.DataTypes.DATE,
    defaultValue: Sequelize.DataTypes.NOW,
  },
  botToken: {
    // https://api.slack.com/docs/token-types#bot
    type: Sequelize.DataTypes.STRING(256),
  },
  workspaceToken: {
    // https://api.slack.com/docs/token-types#workspace
    type: Sequelize.DataTypes.STRING(256),
  },

});


Workspace.sync().then(() => {
  logger.info('Succesfully synced workspace to mysql');
  return Workspace.findOrCreate({
    where: { id: process.env.local_env_workspace_id },
    defaults: {
      id: process.env.local_env_workspace_id,
      botUserId: process.env.local_env_bot_user_id,
      createdBy: process.env.local_env_main_user_id,
      team: process.env.local_env_workspace_name,
      url: process.env.local_env_workspace_url,
      botToken: process.env.local_env_workspace_bot_token,
      workspaceToken: process.env.local_env_workspace_token,
    },
  });
});

module.exports = Workspace;
