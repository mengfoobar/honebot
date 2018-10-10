const Sequelize = require('sequelize');
const connection = require('../db');
const logger = require('../utils/logger');

const Channel = connection.define('channel', {
  id: {
    type: Sequelize.DataTypes.STRING(256),
    unique: true,
    primaryKey: true,
  },
  invitedBy: {
    type: Sequelize.DataTypes.STRING(256),
    allowNull: false,
  },
  workspace: { // name for team
    type: Sequelize.DataTypes.STRING(256),
    allowNull: false,
  },
  // TODO: fill out rest after discussion with Dexter
});


// creates table if it doesn't exist
Channel.sync().then(() => {
  logger.info('Succesfully synced channel to mysql');

  return Channel.findOrCreate({
    where: { id: process.env.local_env_channel_id },
    defaults: {
      id: process.env.local_env_channel_id,
      invitedBy: process.env.local_env_main_user_id,
      workspace: process.env.local_env_workspace_id,
    },
  });
});

module.exports = Channel;
