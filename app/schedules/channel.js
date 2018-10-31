/* eslint-disable no-use-before-define */
const Agenda = require('agenda');
const moment = require('moment');
const axios = require('axios');
const _ = require('lodash');

const mongoDetails = {
  user: process.env.mongo_user,
  password: process.env.mongo_password,
  db: process.env.mongo_db,
  host: process.env.mongo_host,
};

const mongoConnectionString = `mongodb://${
  mongoDetails.user && mongoDetails.password
    ? `${mongoDetails.user}:${encodeURIComponent(mongoDetails.password)}@` : ''}${
  mongoDetails.host}/${mongoDetails.db}`;

const ChannelStore = require('../store/channel');
const WorkspaceStore = require('../store/workspace');
const ScheduledMessageStore = require('../store/scheduledMessage');
const ScheduledMessagesTemplates = require('../constants/messagesTemplates/scheduled');

const agenda = new Agenda({ db: { address: mongoConnectionString } });

agenda.define('schedule_daily_reminders', async (job, done) => {
  // TODO: purge existing update_jobs job
  // TODO: create separate function for each message type instead of all three at the same time
  // -> cleaner

  // retrieves a list of channels that are valid for scheduling reminder for today
  const channels = await ChannelStore.all();
  const channelsWithActiveSchedule = channels.filter(c => isChannelScheduledForToday(c));
  const channelIdsWithActiveSchedule = {};
  channelsWithActiveSchedule.forEach((a) => {
    channelIdsWithActiveSchedule[a.id] = true;
  });

  const scheduledJobs = await ScheduledMessageStore.getScheduledMessagesForDate(
    moment().format('YYYY-MM-DD'),
    ScheduledMessagesTemplates.PUZZLE_SUBMISSION_OPEN.name,
  );
  const scheduledJobsChannelIds = {};
  scheduledJobs.map((j) => {
    scheduledJobsChannelIds[j.channelId] = true;
  });

  channelsWithActiveSchedule.forEach(async (c) => {
    if (!scheduledJobsChannelIds[c.id]) {
      const {
        PUZZLE_SUBMISSION_OPEN,
        PUZZLE_SUBMISSION_CLOSED,
        SUBMISSION_CLOSING_REMINDER,
      } = ScheduledMessagesTemplates;

      const dateStr = moment().utcOffset(c.timezone).format('YYYY-MM-DD');
      const day = moment().utcOffset(c.timezone).format('dddd').toLowerCase();

      const puzzle = await ChannelStore.addFreshQuizForToday(c.id);
      if (puzzle) {
        scheduleNewMessage(
          PUZZLE_SUBMISSION_OPEN.name,
          moment(`${dateStr} ${c.schedule[day].start}`, 'YYYY-MM-DD hh:mm A').utcOffset(c.timezone, true),
          c,
        );

        scheduleNewMessage(
          SUBMISSION_CLOSING_REMINDER.name,
          moment(`${dateStr} ${c.schedule[day].end}`, 'YYYY-MM-DD hh:mm A').subtract(2, 'minutes').utcOffset(c.timezone, true),
          c,
        );

        scheduleNewMessage(
          PUZZLE_SUBMISSION_CLOSED.name,
          moment(`${dateStr} ${c.schedule[day].end}`, 'YYYY-MM-DD hh:mm A').utcOffset(c.timezone, true),
          c,
          {
            puzzleId: puzzle.id,
          },
        );
      } else {
        // TODO: send message saying no more puzzles
      }
    }
  });
});

agenda.define('schedule_weekly_summary', async (job, done) => {
  const dateEndOfWeek = moment().endOf('week').format('YYYY-MM-DD');

  const channels = await ChannelStore.all();
  const channelsWithActiveSchedule = channels.filter(c => c.isActive);
  const channelIdsWithActiveSchedule = {};
  channelsWithActiveSchedule.forEach((a) => {
    channelIdsWithActiveSchedule[a.id] = true;
  });

  const scheduledJobs = await ScheduledMessageStore.getScheduledMessagesForDate(
    dateEndOfWeek,
    ScheduledMessagesTemplates.WEEK_END_SUMMARY.name,
  );
  const scheduledJobsChannelIds = {};
  scheduledJobs.map((j) => {
    scheduledJobsChannelIds[j.channelId] = true;
  });

  channelsWithActiveSchedule.forEach(async (c) => {
    if (!scheduledJobsChannelIds[c.id]) {
      const notificationTime = _.get(c, 'schedule.friday.end', '5:00 pm');

      scheduleNewMessage(
        ScheduledMessagesTemplates.WEEK_END_SUMMARY.name,
        moment(`${dateEndOfWeek} ${notificationTime}`, 'YYYY-MM-DD hh:mm A').utcOffset(c.timezone, true),
        c,
      );
    }
  });
});

agenda.define('channel_notification', async (job, done) => {
  const {
    workspaceId, channelId, messageType, puzzleId,
  } = job.attrs.data;
  const workspace = await WorkspaceStore.get(workspaceId);

  const message = await ScheduledMessagesTemplates[messageType](job.attrs.data);

  const slackPostChatUrl = 'https://slack.com/api/chat.postMessage';
  const result = await axios.post(
    slackPostChatUrl,
    {
      channel: channelId,
      text: message,
    },
    {
      headers: {
        authorization: `Bearer ${workspace.workspaceToken}`,
      },
    },
  );

  // TODO: error handling

  done();
});

const scheduleNewMessage = (messageType, scheduledTime, channel, additionalConfigs = {}) => {
  const submissionOpenJobAttr = {
    channelId: channel.id,
    dateScheduled: scheduledTime.format('YYYY-MM-DD'),
    workspaceId: channel.workspace,
    messageType,
    ...additionalConfigs,
  };

  agenda.schedule(scheduledTime.toDate(), 'channel_notification', submissionOpenJobAttr);

  ScheduledMessageStore.addNewScheduledMessage(submissionOpenJobAttr);
};

const isChannelScheduledForToday = (channel) => {
  const { schedule, isActive } = channel;
  if (!schedule) {
    return false;
  }
  if (!isActive) {
    return false;
  }
  if (!schedule[moment().format('dddd').toLowerCase()]) {
    return false;
  }
  return true;
};

(async function () {
  await agenda.start();
  await agenda.cancel({ name: 'schedule_daily_reminders' });
  await agenda.cancel({ name: 'schedule_weekly_summary' });
  await agenda.every('60 seconds', 'schedule_daily_reminders');
  await agenda.every('60 seconds', 'schedule_weekly_summary');
}());
