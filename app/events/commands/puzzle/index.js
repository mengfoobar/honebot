/* eslint-disable eqeqeq,no-use-before-define */
const _ = require('lodash');

const User = require('../../../store/user');
const Messages = require('../../../constants/messagesTemplates/puzzle');
const { getFreshPuzzle } = require('../../../store/puzzle');
const MessageHandler = require('./messageHandlers');

module.exports = {
  start: (bot, event, configs = null) => {
    bot.startPrivateConversation(event, async (err, convo) => {
      convo.addQuestion(
        ...Messages.START_PUZZLE(async (convo) => {
          const [user, isNew] = await User.save({
            workspace: _.get(convo, 'context.bot.config.id', ''),
            id: _.get(convo, 'context.user'),
            channel: _.get(convo, 'context.channel'),
          });
          // TODO: send some nice messages for new users
          const freshPuzzle = await getFreshPuzzle(
            _.get(convo, 'context.channel', null),
          );
          if (!freshPuzzle) {
            convo.addMessage({ text: Messages.OUT_OF_PUZZLES() });
            convo.next();
            return;
          }

          freshPuzzle.messages.map((m) => {
            MessageHandler[m.type]({
              convo, bot, message: m, puzzle: freshPuzzle,
            });
          });
        }),
      );
    });
  },
};
