const MessageTemplates = require('../constants/messagesTemplates');
const ChannelStore = require('../store/channel');

module.exports = (controller) => {
  controller.on('bot_channel_join', async (bot, event) => {
    const [channel, isNew] = await ChannelStore.save(event);
    bot.say({
      channel: channel.id,
      text: MessageTemplates.channel.PUZLR_JOINED_CHANNEL(),
    });
    bot.say({
      channel: channel.id,
      text: MessageTemplates.channel.FIRST_PUZZLE_STARTS_ON(channel),
    });
  });
};
