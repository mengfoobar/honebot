/* eslint-disable no-unused-vars */
module.exports = {
  start: (bot, event, configs = null) => {
    // TODO: private DM user with the quiz content
    // but publicly message channel user started quiz
    bot.reply(event, 'Quiz to come');
  },
};
