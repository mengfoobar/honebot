const shortid = require('shortid');
const Messages = require('../../../constants/messagesTemplates/puzzle');
const getChannelDialog = require('../../../constants/dialogs/channelSettings');

module.exports = {
  default: (bot, event, configs = null) => {
    bot.startConversation(event, async (err, convo) => {
      convo.addQuestion(
        ...Messages.SET_SETTINGS(async (event, convo) => {
          const dialog = await getChannelDialog(bot, event);
          bot.replyWithDialog(event, dialog.asObject(), (err, res) => {
            // TODO: handle errors
            convo.stop();
          });
        }),
        { key: shortid.generate() }, 'default',
      );
    });
  },
};
