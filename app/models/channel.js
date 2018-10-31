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
  schedule: {
    type: Sequelize.DataTypes.JSON,
    allowNull: false,
    defaultValue: {
      monday: {
        start: '8:00 am',
        end: '4:00 pm',
      },
      tuesday: {
        start: '8:00 am',
        end: '4:00 pm',
      },
      wednesday: {
        start: '8:00 am',
        end: '4:00 pm',
      },
      thursday: {
        start: '8:00 am',
        end: '4:00 pm',
      },
      friday: {
        start: '8:00 am',
        end: '4:00 pm',
      },
    },
    // TODO: add shape validator
  },
  isActive: {
    type: Sequelize.DataTypes.BOOLEAN,
    defaultValue: true,
  },
  timezone: {
    type: Sequelize.DataTypes.STRING,
    defaultValue: '-04:00',
  },

});


// creates table if it doesn't exist
Channel.sync().then(() => {
  logger.info('Succesfully synced channel to mysql');
});

module.exports = Channel;
