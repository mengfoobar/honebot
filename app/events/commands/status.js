/* eslint-disable eqeqeq,no-use-before-define */
const moment = require('moment');
const _ = require('lodash');
const ChannelModel = require('../../models/channel');
const MessageTemplates = require('../../constants/messagesTemplates');

const UserModel = require('../../models/user');
const SubmissionModel = require('../../models/submission');
const ChannelStore = require('../../store/channel');


module.exports = {
  default: async (bot, event) => {
    let message;
    const channelId = event.channel;

    // TODO: need way to ensure shape of status object
    const channel = await ChannelModel.findById(channelId);
    const adjustedMoment = moment().utcOffset(channel.timezone);
    const todayDay = adjustedMoment.format('dddd').toLowerCase();
    // TODO: monday for now, change based on day once supported
    const todaySchedule = channel.schedule.monday;
    const startTime = moment(todaySchedule.start, 'hh:mm A').utcOffset(
      channel.timezone, true,
    );
    const endTime = moment(todaySchedule.end, 'hh:mm A').utcOffset(channel.timezone, true);

    // channel not active
    if (!channel.isActive) {
      message = MessageTemplates.channel.CHANNEL_INACTIVE();
    } else if (!channel.schedule[todayDay] || adjustedMoment.isAfter(endTime)) {
      // if nothing scheduled for today or submission window already closed
      message = MessageTemplates.channel.NEXT_SUBMISSION_SCHEDULED_FOR_FUTURE_DATE(channel);
    } else if (channel.schedule[todayDay] && adjustedMoment.isBefore(startTime)) {
      // submission window scheduled but not yet open for today
      message = MessageTemplates.channel.UPCOMING_SCHEDULED_SUBMISSION_FOR_TODAY(channel);
    } else if (channel.schedule[todayDay] && adjustedMoment.isBetween(startTime, endTime)) {
      // in the middle of the scheduled window
      const assignedPuzzle = await ChannelStore.getAssignedPuzzleForToday(channel);
      const submissions = await SubmissionModel.findAll({
        where: {
          puzzleId: assignedPuzzle.id,
          channelId,
        },
        include: [UserModel],
        order: [
          ['score', 'DESC'],
        ],
      });
      message = MessageTemplates.channel.SUBMISSION_WINDOW_OPEN_WITH_SUBMISSIONS(
        channel, submissions,
      );
    } else {
      message = '';
    }
    message += `\n${MessageTemplates.channel.EXERCISES_SCHEDULED_FOR()}`;

    bot.replyPrivate(event, message);
  },
};
