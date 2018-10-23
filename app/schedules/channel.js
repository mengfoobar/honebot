/* eslint-disable no-use-before-define */
const Agenda = require('agenda');
const moment = require('moment');
const axios = require('axios');

const mongoConnectionString = 'mongodb://127.0.0.1/agenda';

const ChannelStore = require('../store/channel');
const WorkspaceStore = require('../store/workspace');
const ScheduledMessageStore = require('../store/scheduledMessage');
const ScheduledMessagesTemplates = require('../constants/messagesTemplates/scheduled');

const agenda = new Agenda({ db: { address: mongoConnectionString } });

agenda.define('update_jobs', async (job, done) => {
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
  const adjustedMoment = moment().utcOffset(channel.timezone);
  const day = adjustedMoment.format('dddd').toLowerCase();
  const dateStr = adjustedMoment.format('YYYY-MM-DD');

  const submissionOpenJobAttr = {
    channelId: channel.id,
    dateScheduled: dateStr,
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
  await agenda.cancel({ name: 'update_jobs' });
  await agenda.every('60 seconds', 'update_jobs');
}());
