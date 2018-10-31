const moment = require('moment');
const _ = require('lodash');

const getNextStartDay = (channel) => {
  const startDate = moment().utcOffset(channel.timezone).add(1, 'days');

  return ['Saturday', 'Sunday'].includes(startDate.format('dddd'))
    ? 'monday' : startDate.format('dddd').toLowerCase();
};


module.exports = {
  JOINED_CHANNEL: () => [
    'Hi!',
    'I schedule fun, 10 minutes programming puzzles for your team!',
    'Engage in friendly competitions to see who is office champ :muscle:',
    '',
    'Here are a few things you need know about me :wink:',
    '',
    '- please *configure your workspace timezone, desired schedule* using `/hone settings`',
    '- once submission window is open, type `/hone start` to start on puzzle',
    '- type `/hone leaderboard` to see results for the week',
    '- type `/hone help` to see list of commands',
    '- to stop `/hone` from sending puzzles, set status to *Offline* in settings',
    '',
    '',
    'Some other useful information:',
    '- leaderboard is reset every week so there is always room for a new office champ :+1:',
    '- updates to settings can take up to a day to be in effect',
  ].join('\n'),
  LEADERBOARD_RESULTS: (submissions) => {
    const leaderboardMessage = [];

    leaderboardMessage.push('Here are the results so far for this week!');
    leaderboardMessage.push('');

    if (submissions && submissions.length > 0) {
      submissions
        .forEach(
          (r, index) => {
            const data = r.toJSON();
            leaderboardMessage.push(`${index + 1}. *${r.user.userName}*: Score *${
              parseFloat(data.totalScore).toFixed(2)
            }*, Avg. Time Taken *${parseFloat(data.avgDuration).toFixed(2)}s*`);
          },
        );
      // TODO: mention top 3 scorers if > 3, else mention top 1
    } else {
      leaderboardMessage.push('No submissions yet!');
    }
    return leaderboardMessage.join('\n');
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
    const startDay = getNextStartDay(channel);
    return `Hone bot has been reactivated. Your next puzzle will start on *${_.startCase(startDay)}* at *${channel.schedule[startDay].start}*`;
  },
  CHANNEL_DEACTIVATED: () => 'Hone bot has been deactivated. You will no longer receive programming puzzles.',
  CURRENT_STATUS: (channel, status) => {
    if (!channel.isActive) {
      return 'Hone bot is not active! Please set bot status to *Online* in settings.';
    }
    const todayDay = moment().utcOffset(channel.timezone).format('dddd').toLowerCase();

    if (!status.isSubmissionWindowOpen) {
      if (channel.schedule[todayDay]) {

      }
      const startDay = getNextStartDay();
      return ['Submission window not yet open. ',
        `Your next puzzle will start on *${
          _.startCase(startDay)}* at *${channel.schedule[startDay].start}*`,
      ].join('\n');
    }

    return '';
  },
  UPCOMING_SCHEDULED_SUBMISSION_FOR_TODAY: (channel) => {
    const todayDay = moment().utcOffset(channel.timezone).format('dddd').toLowerCase();
    return `Submission will open at *${channel.schedule[todayDay].start}*`;
  },
  CHANNEL_INACTIVE: () => 'Hone bot is not active! Please set bot status to *Online* in settings.',
  NEXT_SUBMISSION_SCHEDULED_FOR_FUTURE_DATE: (channel) => {
    const startDay = getNextStartDay();
    return ['Submission window not yet open. ',
      `Your next puzzle will start on *${
        _.startCase(startDay)}* at *${channel.schedule[startDay].start}*`,
    ].join('\n');
  },
  SUBMISSION_WINDOW_OPEN_WITH_SUBMISSIONS: (channel, submissions) => {
    const message = [];
    const todayDay = moment().utcOffset(channel.timezone).format('dddd').toLowerCase();

    message.push('Here is what we have so far:');
    message.push('');
    submissions
      .forEach(
        (s, index) => {
          message.push(`${index + 1}. *${s.user.userName}*: Score *${s.score}*, Time Taken *${
            moment.utc(s.duration * 1000).format('mm:ss')}*`);
        },
      );
    message.push('');
    message.push(`Submissions are open till *${channel.schedule[todayDay].start}*`);
    return message.join('\n');
  },
  SUBMISSION_WINDOW_OPEN_NO_SUBMISSIONS: (channel) => {
    const todayDay = moment().utcOffset(channel.timezone).format('dddd').toLowerCase();
    return `Submissions are open till *${channel.schedule[todayDay].start}*`;
  },
};
