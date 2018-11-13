const { help } = require('../../constants/messagesTemplates')

module.exports = {
  default: async (bot, event) => {
    bot.replyPrivate(event, help.SHOW());
  },
};
