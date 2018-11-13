/* eslint-disable eqeqeq,no-use-before-define */
const _ = require('lodash');

const UserStore = require('../../../store/user');
const ChannelStore = require('../../../store/channel');
const SubmissionStore = require('../../../store/submission');
const MessageTemplates = require('../../../constants/messagesTemplates');
const MessageHandler = require('./messageHandlers');
const { isSubmissionWindowOpen } = require('../../../utils');
const PuzzleType = require('../../../constants/puzzleType');


module.exports = {
  default: async (bot, event, configs = null) => {
    const { channel, team } = event;
    const channelInstance = await ChannelStore.get(channel);
    const assignedPuzzle = await ChannelStore.getAssignedPuzzleForToday(channel);


    if (
      !isSubmissionWindowOpen(channelInstance)
      && assignedPuzzle.type !== PuzzleType.INTRO
    ) {
      // TODO: add more sophisticated response (before, after...etc)
      bot.replyPrivate(event,
        MessageTemplates.scheduled.SUBMISSION_WINDOW_NOT_OPEN(channelInstance));
      return;
    }

    bot.replyPrivate(event, MessageTemplates.channel.SUBMISSION_READY());

    bot.startPrivateConversation(event, async (err, convo) => {
      convo.addQuestion(
        ...MessageTemplates.puzzle.START_PUZZLE(async (convo) => {
          const userId = _.get(convo, 'context.user');
          const userInstance = await UserStore.get(userId);
          if (!userInstance) {
            const user3rdPartyInfo = await UserStore.getUserInfoFrom3rdParty(bot, userId);
            const [newUser, isNew] = await UserStore.save({
              workspace: team,
              id: userId,
              channel,
              userName: user3rdPartyInfo.name,
            });
          }
          // TODO: send some nice messages for new users
          if (!assignedPuzzle) {
            convo.addMessage({ text: MessageTemplates.puzzle.OUT_OF_PUZZLES() });
            convo.next();
            return;
          }

          const hasUserSubmittedForPuzzle = await SubmissionStore.hasUserSubmittedForPuzzle(
            userId, assignedPuzzle.id,
          );

          if (hasUserSubmittedForPuzzle) {
            convo.addMessage({ text: MessageTemplates.puzzle.ALREADY_SUBMITTED() });
            convo.next();
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
