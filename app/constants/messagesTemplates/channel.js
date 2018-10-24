const moment = require('moment');
const _ = require('lodash')

module.exports = {
  JOINED_CHANNEL: () => [
    'Hi!',
    'I schedule fun, 10 minutes programming puzzles for your team!',
    'Engage in friendly competitions to see who is office champ :muscle:',
    '',
    'Here are a few things you need know about me :wink:',
    '',
    '- please *configure your workspace timezone, desired schedule* using `@puzlr settings`',
    '- once submission window is open, type `@puzlr start` to start on puzzle',
    '- type `@puzlr leaderboard` to see results for the week',
    '- type `@puzlr help` to see list of commands',
    '',
    '',
    'Some other useful information:',
    '- leaderboard is reset every week so there is always room for a new office champ :+1:',
    '- updates to settings can take up to a day to be in effect',
  ].join('\n'),
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

    return `Your first puzzle will be available starting *${startDate.format('dddd')}* at *${
      channel.schedule[startDay].start}*`;
  },
  SETTINGS_UPDATED: () => 'Your settings for this channel has been updated!',
  CHANNEL_REACTIVATED: (channel) => {
    const startDate = moment().utcOffset(channel.timezone).add(1, 'days');

    const startDay = ['Saturday', 'Sunday'].includes(startDate.format('dddd'))
      ? 'monday' : startDate.format('dddd').toLowerCase();

    return `Puzlr has been reactivated. Your next puzzle will start on *${_.startCase(startDay)}* at *${channel.schedule[startDay].start}*`;
  },
  CHANNEL_DEACTIVATED: () => 'Puzlr has been deactivated. You will no longer receive programming puzzles.',
};
