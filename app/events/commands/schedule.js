/* eslint-disable eqeqeq,no-use-before-define */
const MessageTemplates = require('../../constants/messagesTemplates');

const ChannelStore = require('../../store/channel');


module.exports = {
  default: async (bot, event) => {
    const channelId = event.channel;

    const channel = await ChannelStore.get(channelId);
    bot.replyPublic(event, MessageTemplates.channel.CURRENT_CHANNEL_SCHEDULE(channel);
  },
};
