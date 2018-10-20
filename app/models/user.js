const Sequelize = require('sequelize');
const connection = require('../db');
const logger = require('../utils/logger');
const Workspace = require('../models/workspace');
const Channel = require('../models/channel');

const User = connection.define('user', {
  id: {
    type: Sequelize.DataTypes.STRING(256),
    unique: true,
    primaryKey: true,
  },
  workspace: {
    type: Sequelize.DataTypes.STRING(256),
    references: {
      model: Workspace,
      key: 'id',
    },
  },
  channel: {
    type: Sequelize.DataTypes.STRING(256),
    references: {
      model: Channel,
      key: 'id',
    },
  },
  userName: {
    type: Sequelize.DataTypes.STRING(256),
  },
  // TODO: eventually support user based permissions/configs
});

User.sync().then(() => {
  logger.info('Succesfully synced workspace to mysql');
});

module.exports = User;
