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

      const puzzle = await ChannelStore.addFreshQuizForToday(c.id);
      if (puzzle) {
        scheduleNewMessage(
          PUZZLE_SUBMISSION_OPEN.name,
          moment().add(2, 'minutes').format('HH:mm'),
          c,
        );

        scheduleNewMessage(
          SUBMISSION_CLOSING_REMINDER.name,
          moment().add(3, 'minutes').format('HH:mm'),
          c,
        );

        scheduleNewMessage(
          PUZZLE_SUBMISSION_CLOSED.name,
          moment().add(4, 'minutes').format('HH:mm'),
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
  // TODO: have bot send notification to channel based on type
  // TODO: if no persistent storage after job ran, add entry to mongodb at done
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
  const day = moment().format('dddd').toLowerCase();

  const submissionOpenJobAttr = {
    channelId: channel.id,
    dateScheduled: moment().format('YYYY-MM-DD'),
    workspaceId: channel.workspace,
    messageType,
    ...additionalConfigs,
  };

  agenda.schedule(scheduledTime, 'channel_notification', submissionOpenJobAttr);

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
  // TODO: add this to configs
  await agenda.every('60 seconds', 'update_jobs');
}());
