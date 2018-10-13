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
    // TODO: add shape validator
  },
});


// creates table if it doesn't exist
Channel.sync().then(() => {
  logger.info('Succesfully synced channel to mysql');

  // return Channel.findOrCreate({
  //   where: { id: process.env.local_env_channel_id },
  //   defaults: {
  //     id: process.env.local_env_channel_id,
  //     invitedBy: process.env.local_env_main_user_id,
  //     workspace: process.env.local_env_workspace_id,
  //     schedule: {
  //       monday: {
  //         start: '8:00 am',
  //         end: '4:00 pm',
  //       },
  //       tuesday: {
  //         start: '8:00 am',
  //         end: '4:00 pm',
  //       },
  //       wednesday: {
  //         start: '8:00 am',
  //         end: '4:00 pm',
  //       },
  //       thursday: {
  //         start: '8:00 am',
  //         end: '4:00 pm',
  //       },
  //       friday: {
  //         start: '8:00 am',
  //         end: '4:00 pm',
  //       },
  //       saturday: {
  //         start: '8:00 am',
  //         end: '4:00 pm',
  //       },
  //     },
  //
  //   },
  // });
});

module.exports = Channel;
