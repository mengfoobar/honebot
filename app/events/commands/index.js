const { get } = require('lodash');
const { misc } = require('../../constants/messagesTemplates');
const { parseMentionText } = require('../../utils/messageParser');
const startCommandHandler = require('./start');
const settingsCommandHandler = require('./settings');
const leaderboardCommandHandler = require('./leaderboard');
const helpCommandHandler = require('./help');
const statusCommandHandler = require('./status');

const commandHandlers = {
  start: startCommandHandler,
  settings: settingsCommandHandler,
  leaderboard: leaderboardCommandHandler,
  help: helpCommandHandler,
  status: statusCommandHandler,
};

module.exports = (controller) => {

  controller.on('slash_command', (bot, e) => {

    const { command, value, configs } = parseMentionText(e.text);
    const handler = get(commandHandlers, `${command}.${value ? `${value}` : 'default'}`);

    if (handler) {
      handler && handler(bot, e, configs);
    } else {
      bot.replyPublic(e, misc.UNKNOWN_COMMAND());
    }
  });
};
