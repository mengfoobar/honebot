const Sequelize = require('sequelize');
const connection = require('../db');
const logger = require('../utils/logger');
const Workspace = require('../models/workspace')

const User = connection.define('user', {
  id: {
    type: Sequelize.DataTypes.STRING(256),
    unique: true,
    primaryKey: true,
  },
  workspace: {
    type: Sequelize.DataTypes.STRING(256),
    allowNull: false,
  },
  // TODO: eventually support user based permissions/configs
  // TODO: fill out rest after discussion with Dexter
});

User.sync().then(() => {
  logger.info('Succesfully synced workspace to mysql');
})

module.exports = User
