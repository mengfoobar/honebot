const { get } = require('lodash');
const { parseMentionText } = require('../../utils/messageParser');
const puzzleCommandHandler = require('./puzzle');
const settingsCommandHandler = require('./settings');
const leadboardCommandHandler = require('./leaderboard');

const commandHandlers = {
  puzzle: puzzleCommandHandler,
  settings: settingsCommandHandler,
  leaderboard: leadboardCommandHandler
};

module.exports = (controller) => {
  controller.on('direct_mention', (bot, e) => {
    const { command, value, configs } = parseMentionText(e.text);
    const handler = get(commandHandlers, `${command}.${value ? `${value}` : 'default'}`);

    if (handler) {
      handler && handler(bot, e, configs);
    } else {
      // TODO list commands
      bot.reply(e, "Uh I didn't understand that. Hit me with one of these commands instead: ");
    }
  });

  controller.on('slash_command', (bot, e) => {

  });
};
