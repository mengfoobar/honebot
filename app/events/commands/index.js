const { get } = require('lodash');
const { parseMentionText } = require('../../utils/messageParser');
const quizCommandHandler = require('./quiz');

const commandHandlers = {
  quiz: quizCommandHandler,
};

module.exports = (controller) => {
  controller.on('direct_mention', (bot, e) => {
    const { command, value, configs } = parseMentionText(e.text);

    if (command && value && get(commandHandlers, `${command}.${value}`)) {
      commandHandlers[command][value](bot, e, configs);
    } else {
      // TODO list commands
      bot.reply(e, "Uh I didn't understand that. Hit me with one of these commands instead: ");
    }
  });
};
