/* eslint-disable eqeqeq,no-use-before-define */

const SubmissionStore = require('../../store/submission');
const MessagesTemplates = require('../../constants/messagesTemplates')
const { THIS_WEEK } = require('../../constants/leaderboardAggregateType');

module.exports = {
  default: async (bot, event) => {
    const { channel } = event;
    const results = await SubmissionStore.getAggregateLeaderboard(
      channel,
      THIS_WEEK,
    );

    bot.replyPublic(event, MessagesTemplates.channel.LEADERBOARD_RESULTS(results));
  },
};
