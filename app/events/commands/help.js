const { help } = require('../../constants/messagesTemplates')

module.exports = {
  default: async (bot, event) => {
    bot.replyPublic(event, help.SHOW());
  },
};
