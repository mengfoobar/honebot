
module.exports = (controller) => {
  controller.on('member_joined_channel', (bot, message) => {
    // TODO: add user to system
    // bot.reply(message, "I'm here!");
  });

  controller.on('bot_channel_join', (bot, e) => {
    controller.storage.channels.save(e, (err) => {
      if (!err) {
        bot.reply(e, "What's happening peeps! Puzlr in da house");
      }
    });
  });
};
