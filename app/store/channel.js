const moment = require('moment');
const _ = require('lodash');

const ChannelModel = require('../models/channel');
const PuzzleModel = require('../models/puzzle');
require('../models/channelPuzzles');
const { getFreshPuzzle } = require('./puzzle');


const cleanBotkitDataToModel = botkitData => ({
  id: botkitData.channel,
  invitedBy: botkitData.inviter,
  workspace: botkitData.team,
});


module.exports = {
  get: async (id, callback) => {
    const channel = await ChannelModel.findById(id);
    callback && callback(null, channel.toJSON());
    return channel;
  },
  getChannelsForWorkspace: workspaceId => ChannelModel.findAll({
    where: {
      workspace: workspaceId,
    },
  }),
  update: async (id, params) => {
    const channel = await ChannelModel.findById(id);
    return channel.update(params);
  },
  save: async (rawData) => {
    const cleanedData = cleanBotkitDataToModel(rawData);

    return ChannelModel.findOrCreate({
      where: { id: cleanedData.id },
      defaults: cleanedData,
    });
  },
  delete: async (id, callback) => {
    const channel = await ChannelModel.findById(id);
    if (channel) {
      await channel.destroy();
      callback();
    }
  },
  all: async (callback) => {
    const channels = await ChannelModel.findAll();
    const cleanedData = channels.map(channel => channel.toJSON());
    callback && callback(cleanedData);
    return channels;
  },
  addFreshQuizForToday: async (channelId) => {
    const channel = await ChannelModel.findById(channelId);
    const freshPuzzle = await getFreshPuzzle(channelId);

    await channel.addPuzzle(freshPuzzle, {
      through: {
        dateScheduled: moment().utcOffset(channel.timezone).format('YYYY-MM-DD'),
      },
    });
    return freshPuzzle;
  },
  getAssignedPuzzleForToday: async (channel) => {
    // TODO: fix where to make the date utcoffset
    const channels = await ChannelModel.findAll({
      where: {
        id: channel.id,
      },
      include: [{
        model: PuzzleModel,
        through: {
          attributes: ['puzzleId'],
          where: { dateScheduled: moment().utcOffset(channel.timezone).format('YYYY-MM-DD') },
        },
      }],
    });
    const puzzle = _.get(channels, '0.puzzles.0', null);
    return puzzle;
  },
};
