const ChannelModel = require('../models/channel');

const cleanBotkitDataToModel = botkitData => ({
  id: botkitData.channel,
  invitedBy: botkitData.inviter,
  workspace: botkitData.team,
});

module.exports = {
  get: async (id, callback) => {
    const channel = await ChannelModel.findById(id);
    callback(null, channel.toJSON());
  },
  save: async (rawData, callback) => {
    // TODO: handle updating here as well
    const cleanedData = cleanBotkitDataToModel(rawData);

    await ChannelModel.findOrCreate({
      where: { id: cleanedData.id },
      defaults: cleanedData,
    });

    callback();
  },
  delete: async (id, callback) => {
    const channel = await ChannelModel.findById(id);
    if (channel) {
      await channel.destroy();
      callback();
    }
  },
  all: async (callback) => {
    const channels = await ChannelModel.findAll({});
    const cleanedData = channels.map(channel => channel.toJSON());
    callback && callback(cleanedData);
    return channels;
  },

};
