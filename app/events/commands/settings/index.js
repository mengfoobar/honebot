const shortid = require('shortid');
const Messages = require('../../../constants/messages/puzzle');
const getWorkspaceDialog = require('../../../constants/dialogs/workspaceSettings');

module.exports = {
  default: (bot, event, configs = null) => {

    bot.startConversation(event, async (err, convo) => {
      convo.addQuestion(
        ...Messages.SET_SETTINGS(async (event, convo) => {
          const dialog = await getWorkspaceDialog(bot);
          bot.replyWithDialog(event, dialog.asObject(), (err, res) => {
            // handle your errors!
            convo.stop();
            console.log(res);
          });
        }),
        { key: shortid.generate() }, 'default',
      );
    });
  },
};
