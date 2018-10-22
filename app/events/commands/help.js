const { help } = require('../../constants/messagesTemplates')

module.exports = {
  default: async (bot, event) => {
    bot.reply(event, help.SHOW());
  },
};
