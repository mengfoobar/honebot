const moment = require('moment');

module.exports = {
  PUZLR_JOINED_CHANNEL: () => "What's happening peeps! Puzlr in da house",
  LEADERBOARD_RESULTS: (submissions) => {
    let leaderboardMessage;

    if (submissions && submissions.length > 0) {
      leaderboardMessage = submissions
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
    return leaderboardMessage;
  },
  FIRST_PUZZLE_STARTS_ON: (channel) => {
    const startDate = moment().utcOffset(channel.timezone).add(1, 'days');

    const startDay = ['Saturday', 'Sunday'].includes(startDate.format('dddd'))
      ? 'monday' : startDate.format('dddd').toLowerCase();

    return `Your first puzzle will start on ${startDay} at ${
      channel.schedule[startDay].start}`;
  },
};
