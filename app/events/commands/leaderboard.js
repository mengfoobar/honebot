/* eslint-disable eqeqeq,no-use-before-define */
const _ = require('lodash');

const SubmissionStore = require('../../store/submission');
const { THIS_WEEK } = require('../../constants/leaderboardAggregateType');

module.exports = {
  default: async (bot, event) => {
    const { channel } = event;
    const results = await SubmissionStore.getAggregateLeaderboard(
      channel,
      THIS_WEEK,
    );

    let leaderboardMessage;

    if (results && results.length > 0) {
      leaderboardMessage = results
        .map(
          (r, index) => {
            const data = r.toJSON();
            return `${index + 1}. ${r.user.userName} - total score: ${
              parseFloat(data.totalScore).toFixed(2)
            }, average time taken: ${parseFloat(data.avgDuration).toFixed(2)}s`;
          },
        )
        .join('\n');
    } else {
      leaderboardMessage = 'No submissions yet';
    }

    bot.reply(event, leaderboardMessage);
  },
};
