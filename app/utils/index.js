const moment = require('moment');

const PuzzleDuration = require('../constants/puzzleDuration');

module.exports = {
  isSubmissionWindowOpen: ({ timezone, schedule }) => {
    const format = 'h:mm a';
    const adjustedMoment = moment().utcOffset(timezone);
    const dayOfWeek = adjustedMoment.format('dddd').toLowerCase();
    if (schedule[dayOfWeek]) {
      const start = moment(schedule[dayOfWeek].start, format).utcOffset(timezone, true);
      const end = moment(schedule[dayOfWeek].end, format).utcOffset(timezone, true);
      return adjustedMoment.isBetween(start, end);
    }
    return false;
  },
  computeSubmissionScore: (puzzleDifficulty, timeTakenInSeconds, isAnswerCorrect) => {
    if (!isAnswerCorrect) {
      return 0.0;
    }

    const maxDurationInSeconds = PuzzleDuration[puzzleDifficulty].asSeconds();
    return ((1 - (timeTakenInSeconds / maxDurationInSeconds)) * 100).toFixed(2);
  },
};
