const moment = require('moment');
const _ = require('lodash');
const timezones = require('../../constants/timezones');

const getNextStartDay = (channel) => {
  const { schedule } = channel;

  for (let i = 1; i < 8; i += 1) {
    const nextDay = moment()
      .utcOffset(channel.timezone)
      .add(i, 'days')
      .format('dddd')
      .toLowerCase();
    if (schedule[nextDay]) {
      return nextDay;
    }
  }
  return moment().utcOffset(channel.timezone).format('dddd').toLowerCase();
};

module.exports = {
  JOINED_CHANNEL: (channel) => {
    const daysScheduled = [
      'monday',
      'tuesday',
      'wednesday',
      ' thursday',
      'friday',
    ]
      .filter(d => channel.schedule[d])
      .map(d => _.startCase(d));
    const timezone = timezones.find(t => t.value === channel.timezone);

    return [
      'Hi!',
      'I schedule bite-size programming problems for your team!',
      '',
      '',
      'Here are a few things you need know about me:',
      '',
      '- :exclamation: please configure your *workspace timezone*, desired *schedule* using `/hone settings` ',
      '- once submission window is open, type `/hone start` to start on the problem for the day',
      '- type `/hone help` to see list of commands',
      '',
      '',
      'Some other useful information:',
      '- leaderboard is reset every week so there is always room for a new office champ :+1:',
      `- as of now, exercises will be available from *${
        channel.schedule[daysScheduled[0].toLowerCase()].start} - ${
        channel.schedule[daysScheduled[0].toLowerCase()]
          .end}* on ${daysScheduled.join(', ')}; timezone is set to *${timezone.label}*`,
      '',
    ].join('\n');
  },
  CURRENT_CHANNEL_SCHEDULE: (channel) => {
    const daysScheduled = [
      'monday',
      'tuesday',
      'wednesday',
      ' thursday',
      'friday',
    ].filter(d => channel.schedule[d])
      .map(d => _.startCase(d));
    const timezone = timezones.find(t => t.value === channel.timezone);
    return [
      `Exercises are scheduled for *${daysScheduled.join(', ')}.*`,
      `Submission window is open from *${channel.schedule[
        daysScheduled[0].toLowerCase()
      ].start} - ${channel.schedule[daysScheduled[0].toLowerCase()].end}*.`,
      `Current timezone is set to *${timezone.label}*`,
    ].join('\n');
  },
  LEADERBOARD_RESULTS: (submissions) => {
    const leaderboardMessage = [];

    if (submissions && submissions.length > 0) {
      leaderboardMessage.push('Here are the results so far for this week!');
      leaderboardMessage.push('');
      submissions.forEach((r, index) => {
        const data = r.toJSON();
        leaderboardMessage.push(
          `${index + 1}. *${r.user.userName}*: Score *${parseFloat(
            data.totalScore,
          ).toFixed(2)}*, Avg. Time Taken *${parseFloat(
            data.avgDuration,
          ).toFixed(2)}s*`,
        );
      });
      // TODO: mention top 3 scorers if > 3, else mention top 1
    } else {
      leaderboardMessage.push('No submissions yet!');
    }
    return leaderboardMessage.join('\n');
  },
  FIRST_PUZZLE_STARTS_ON: (channel) => {
    const startDate = moment().utcOffset(channel.timezone).add(1, 'days');

    const startDay = ['Saturday', 'Sunday'].includes(startDate.format('dddd'))
      ? 'monday'
      : startDate.format('dddd').toLowerCase();

    return `Your first exercise will be available starting *${startDate.format(
      'dddd',
    )}* at *${channel.schedule[startDay].start}*`;
  },
  INTRO_PUZZLE: () => "Let's try a practice problem to break the ice!\nType `/hone start` to get started.",
  SETTINGS_UPDATED: () => 'Settings for this channel were updated!',
  CHANNEL_REACTIVATED: (channel) => {
    const startDay = getNextStartDay(channel);
    return `Hone bot has been reactivated. Your next exercise will start on *${_.startCase(
      startDay,
    )}* at *${channel.schedule[startDay].start}*`;
  },
  CHANNEL_DEACTIVATED: () => 'Hone bot has been deactivated. You will no longer receive programming puzzles.',
  CURRENT_STATUS: (channel, status) => {
    if (!channel.isActive) {
      return 'Hone bot is not active! Please set bot status to *Online* in settings.';
    }
    const todayDay = moment()
      .utcOffset(channel.timezone)
      .format('dddd')
      .toLowerCase();

    if (!status.isSubmissionWindowOpen) {
      if (channel.schedule[todayDay]) {
      }
      const startDay = getNextStartDay();
      return [
        'Submission window not yet open. ',
        `Your next exercise will start on *${_.startCase(startDay)}* at *${channel
          .schedule[startDay].start}*`,
      ].join('\n');
    }

    return '';
  },
  UPCOMING_SCHEDULED_SUBMISSION_FOR_TODAY: (channel) => {
    const todayDay = moment()
      .utcOffset(channel.timezone)
      .format('dddd')
      .toLowerCase();
    return `Submission will open at *${channel.schedule[todayDay].start}*`;
  },
  CHANNEL_INACTIVE: () => 'Hone bot is not active! Please set bot status to *Online* in settings.',
  NEXT_SUBMISSION_SCHEDULED_FOR_FUTURE_DATE: (channel) => {
    const startDay = getNextStartDay(channel);
    return [
      'Submission window not yet open. ',
      `Your next exercise will start on *${_.startCase(startDay)}* at *${channel
        .schedule[startDay].start}*`,
    ].join('\n');
  },
  SUBMISSION_WINDOW_OPEN_WITH_SUBMISSIONS: (channel, submissions) => {
    const message = [];
    const todayDay = moment()
      .utcOffset(channel.timezone)
      .format('dddd')
      .toLowerCase();

    if (submissions && submissions.length > 0) {
      message.push("Here is what we have for today's exercise so far:");
      message.push('');
      submissions.forEach((s, index) => {
        message.push(
          `${index + 1}. *${s.user
            .userName}*: Score *${s.score}*, Time Taken *${moment
            .utc(s.duration * 1000)
            .format('mm:ss')}*`,
        );
      });
      message.push('');
    }

    message.push(
      `Submissions are open till *${channel.schedule[todayDay].end}*.`,
    );
    return message.join('\n');
  },
  SUBMISSION_WINDOW_OPEN_NO_SUBMISSIONS: (channel) => {
    const todayDay = moment()
      .utcOffset(channel.timezone)
      .format('dddd')
      .toLowerCase();
    return `Submissions are open till *${channel.schedule[todayDay].start}*`;
  },
  SUBMISSION_READY: () => 'You can continue with the exercise in our private chat',
  CHANNEL_EXISTS_FOR_WORKSPACE: () => [
    'Hone bot has already joined another channel! ',
    "Please contact hello@honebot.io if you'd like to make a change",
  ].join('\n'),
  EXERCISES_SCHEDULED_FOR: () => 'Exercises are scheduled every week on *Mondays, Wednesdays, Fridays*.',
};
