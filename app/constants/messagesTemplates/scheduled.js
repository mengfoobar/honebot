const moment = require('moment');
const SubmissionStore = require('../../store/submission');

module.exports = {
  PUZZLE_SUBMISSION_OPEN: () => 'You can now start on the puzzle! Run the command @puzlr start',

  SUBMISSION_CLOSING_REMINDER: () => "Submissions will be closing soon! Let's get these answers in.",
  PUZZLE_SUBMISSION_CLOSED: async (data) => {
    const { channelId, puzzleId } = data;
    const submissions = await SubmissionStore.getSubmissionsForPuzzle(
      channelId,
      puzzleId,
    );
    const submissionsStr = submissions
      .map(
        (s, index) => `${index + 1}. ${s.user.userName} with a score of ${s.score}`,
      )
      .join('\n');
    return `Submissions closed! \nHere are the results: \n${submissionsStr}`;
  },
  SUBMISSION_WINDOW_NOT_OPEN: (channel) => {
    const adjustedMoment = moment().utcOffset(channel.timezone);
    const daySchedule = channel.schedule[adjustedMoment.format('dddd').toLowerCase()];
    return `Submission window is not open. Will be available from ${daySchedule.start} - ${daySchedule.end}`;
  },
};
