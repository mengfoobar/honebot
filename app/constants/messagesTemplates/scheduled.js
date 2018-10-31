const moment = require('moment');
const SubmissionStore = require('../../store/submission');
const { THIS_WEEK } = require('../../constants/leaderboardAggregateType');

module.exports = {
  PUZZLE_SUBMISSION_OPEN: () => 'Puzzle submissions are now open :raised_hands: \nRun the command `/hone start` to start.',

  SUBMISSION_CLOSING_REMINDER: () => 'Submissions will be closing soon. Hurry!',
  PUZZLE_SUBMISSION_CLOSED: async (data) => {
    // TODO: move away from using async in message templates
    const { channelId, puzzleId } = data;
    let message = '';
    message += 'Submissions closed!';
    const submissions = await SubmissionStore.getSubmissionsForPuzzle(
      channelId,
      puzzleId,
    );
    const submissionsStr = submissions
      .map(
        (s, index) => `${index + 1}. *${s.user.userName}*: Score *${s.score}*, Time Taken *${
          moment.utc(s.duration * 1000).format('mm:ss')}*`,
      )
      .join('\n');

    if (submissions) {
      message += `Here are the results for today's puzzle: \n\n${submissionsStr}`;
    } else {
      message += '\n\nNo submissions today boohoo :( ';
    }
    return message;
  },
  SUBMISSION_WINDOW_NOT_OPEN: (channel) => {
    const todayDate = moment().utcOffset(channel.timezone);
    const daySchedule = channel.schedule[todayDate.format('dddd').toLowerCase()];
    return `Submission window is not open yet. Will be available from ${daySchedule.start} - ${daySchedule.end}`;
  },
  WEEK_END_SUMMARY: async ({channelId}) => {
    const results = await SubmissionStore.getAggregateLeaderboard(
      channelId,
      THIS_WEEK,
    );

    const message = [];

    message.push('And we are done!');
    message.push('');
    message.push('');

    if (results && results.length > 0) {
      message.push('Here are the results for this week:');
      message.push('');
      results
        .forEach(
          (r, index) => {
            const data = r.toJSON();
            message.push(`${index + 1}. *${r.user.userName}*: Score *${
              parseFloat(data.totalScore).toFixed(2)
            }*, Avg. Time Taken *${parseFloat(data.avgDuration).toFixed(2)}s*`);
          },
        );
      message.push('');
      message.push('Good job everyone :clap:');
      message.push('Until next week!');
    } else {
      message.push('Well, this is awkward. No one submitted anything this week :thumbsdown:');
    }

    return message.join('\n');
  },
};
