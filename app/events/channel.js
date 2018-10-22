const MessageTemplates = require('../constants/messagesTemplates')

module.exports = (controller) => {

  controller.on('bot_channel_join', (bot, e) => {
    controller.storage.channels.save(e, (err) => {
      if (!err) {
        bot.reply(e, MessageTemplates.channel.PUZLR_JOINED_CHANNEL());
      }
    });
  });
};
