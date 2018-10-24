const MessageTemplates = require('../constants/messagesTemplates/workspace')

module.exports = (controller) => {
  controller.on('onboard', async (bot) => {
    bot.startPrivateConversation(
      { user: bot.config.createdBy },
      (err, convo) => {
        if (err) {
          console.log(err);
        } else {
          convo.say(MessageTemplates.JOINED_WORKSPACE());
        }
      },
    );
  });
};
