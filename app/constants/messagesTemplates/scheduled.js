const moment = require('moment');
const SubmissionStore = require('../../store/submission');

module.exports = {
  PUZZLE_SUBMISSION_OPEN: () => 'Puzzle submissions are now open :raised_hands: \nRun the command `@puzlr start` to start.',

  SUBMISSION_CLOSING_REMINDER: () => 'Submissions will be closing in an hour. Hurry!',
  PUZZLE_SUBMISSION_CLOSED: async (data) => {
    const { channelId, puzzleId } = data;
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
    return `Submissions closed! Here are the results this today's puzzle: \n\n${submissionsStr}`;
  },
  SUBMISSION_WINDOW_NOT_OPEN: (channel) => {
    const todayDate = moment().utcOffset(channel.timezone);
    const daySchedule = channel.schedule[todayDate.format('dddd').toLowerCase()];
    return `Submission window is not open yet. Will be available from ${daySchedule.start} - ${daySchedule.end}`;
  },
};
