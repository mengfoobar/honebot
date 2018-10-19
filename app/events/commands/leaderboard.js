/* eslint-disable eqeqeq,no-use-before-define */
const _ = require('lodash');

const SubmissionStore = require('../../store/submission');
const { THIS_WEEK } = require('../../constants/leaderboardAggregateType');

module.exports = {
  default: async (bot, event) => {
    const { channel } = event;
    const results = await SubmissionStore.getLeaderboardResults(
      channel,
      THIS_WEEK,
    );

    const leaderboardMessage = results
      .map(
        (r, index) => {
          const data = r.toJSON()
          return `${index+1}. @${data.user} - total score: ${parseFloat(data.totalScore).toFixed(2)}, average time taken: ${parseFloat(data.avgDuration).toFixed(2)}s`
        },
      )
      .join('\n');

    bot.reply(event, leaderboardMessage);
  },
};
