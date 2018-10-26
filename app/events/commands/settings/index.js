const shortid = require('shortid');
const Messages = require('../../../constants/messagesTemplates/puzzle');
const getChannelDialog = require('../../../constants/dialogs/channelSettings');

module.exports = {
  default: async (bot, event, configs = null) => {
    const dialog = await getChannelDialog(bot, event);
    bot.replyWithDialog(event, dialog.asObject(), (err, res) => {
      // TODO: handle errors
    });
  },
};
