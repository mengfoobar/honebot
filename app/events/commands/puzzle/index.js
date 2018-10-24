/* eslint-disable eqeqeq,no-use-before-define */
const _ = require('lodash');

const UserStore = require('../../../store/user');
const ChannelStore = require('../../../store/channel');
const SubmissionStore = require('../../../store/submission');
const MessageTemplates = require('../../../constants/messagesTemplates');
const MessageHandler = require('./messageHandlers');
const { isSubmissionWindowOpen } = require('../../../utils');


module.exports = {
  start: async (bot, event, configs = null) => {
    const { channel, user, team } = event;
    const channelInstance = await ChannelStore.get(channel);
    if (!isSubmissionWindowOpen(channelInstance)) {
      // TODO: add more sophisticated response (before, after...etc)
      bot.reply(event, MessageTemplates.scheduled.SUBMISSION_WINDOW_NOT_OPEN(channelInstance));
      return;
    }

    bot.startPrivateConversation(event, async (err, convo) => {
      convo.addQuestion(
        ...MessageTemplates.puzzle.START_PUZZLE(async (convo) => {
          const userInstance = await UserStore.get(user);
          if (!userInstance) {
            const user3rdPartyInfo = await UserStore.getUserInfoFrom3rdParty(bot, user);
            const [newUser, isNew] = await UserStore.save({
              workspace: team,
              id: user,
              channel,
              userName: user3rdPartyInfo.name,
            });
          }
          // TODO: send some nice messages for new users
          const assignedPuzzle = await ChannelStore.getAssignedPuzzleForToday(channel);
          if (!assignedPuzzle) {
            convo.addMessage({ text: MessageTemplates.puzzle.OUT_OF_PUZZLES() });
            convo.next();
            return;
          }

          const hasUserSubmittedForPuzzle = await SubmissionStore.hasUserSubmittedForPuzzle(
            user, assignedPuzzle.id,
          );

          if (hasUserSubmittedForPuzzle) {
            bot.say({ text: MessageTemplates.puzzle.ALREADY_SUBMITTED(), channel: user });
          } else {
            assignedPuzzle.messages.map((m) => {
              MessageHandler[m.type]({
                convo,
                bot,
                message: m,
                puzzle: assignedPuzzle,
                originChannel: channel,
              });
            });
          }
        }),
      );
    });
  },
};
