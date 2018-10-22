const MessageTemplates = require('../constants/messagesTemplates')
const ChannelStore = require('../store/channel')

module.exports = (controller) => {

  controller.on('bot_channel_join', async (bot, event) => {
    const channel = await ChannelStore.save(event);

    controller.storage.channels.save(event, (err) => {
      if (!err) {
        bot.say(event, MessageTemplates.channel.PUZLR_JOINED_CHANNEL());
        bot.say(event, MessageTemplates.channel.FIRST_PUZZLE_STARTS_ON(channel));
      }
    });
  });
};
