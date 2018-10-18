/* eslint-disable eqeqeq,no-use-before-define */
const _ = require('lodash');

const User = require('../../../store/user');
const SubmissionStore = require('../../../store/submission');
const ChannelStore = require('../../../store/channel');
const Messages = require('../../../constants/messagesTemplates/puzzle');
const { getFreshPuzzle } = require('../../../store/puzzle');
const MessageHandler = require('./messageHandlers');

module.exports = {
  start: async (bot, event, configs = null) => {
    const { channel, user, team } = event;

    bot.startPrivateConversation(event, async (err, convo) => {
      convo.addQuestion(
        ...Messages.START_PUZZLE(async (convo) => {
          const [newUser, isNew] = await User.save({
            workspace: team,
            id: user,
            channel,
          });
          // TODO: send some nice messages for new users
          const assignedPuzzle = await ChannelStore.getAssignedPuzzleForToday(channel);
          if (!assignedPuzzle) {
            convo.addMessage({ text: Messages.OUT_OF_PUZZLES() });
            convo.next();
            return;
          }

          assignedPuzzle.messages.map((m) => {
            MessageHandler[m.type]({
              convo, bot, message: m, puzzle: assignedPuzzle,
              originChannel: channel
            });
          });
        }),
      );
    });
  },
};
