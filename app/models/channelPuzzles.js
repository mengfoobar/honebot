const sequelize = require('sequelize');
const connection = require('../db');

const Channel = require('../models/channel');
const Puzzle = require('../models/puzzle');

const ChannelPuzzles = connection.define('channelPuzzles', {
  dateScheduled: sequelize.DataTypes.DATEONLY,
});

Channel.belongsToMany(Puzzle, { through: ChannelPuzzles });
Puzzle.belongsToMany(Channel, { through: ChannelPuzzles });


ChannelPuzzles.sync().then(() => {
  console.log('Succesfully synced channelpuzzle to mysql');
})

module.exports = ChannelPuzzles
