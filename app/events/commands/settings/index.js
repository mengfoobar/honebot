const getChannelDialog = require('../../../constants/dialogs/channelSettings');

module.exports = {
  default: async (bot, event, configs = null) => {
    const dialog = await getChannelDialog(bot, event);
    bot.replyPrivate(event, 'now editing settings');
    bot.replyWithDialog(event, dialog.asObject());
    // bot.replyPublic(event, '');
  },
};
