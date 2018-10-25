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
    const todayDay = adjustedMoment.format('dddd');
    const todaySchedule = channel.schedule[todayDay];
    const startTime = moment(todaySchedule.start, 'hh:mm A').utcOffset(channel.timezone, true);
    const endTime = moment(todaySchedule.start, 'hh:mm A').utcOffset(channel.timezone, true);

    // channel not active
    if (!channel.isActive) {
      message = MessageTemplates.channel.CHANNEL_INACTIVE();
    }

    // if nothing scheduled for today or submission window already closed
    if (!channel.schedule[todayDay] || endTime.isAfter(adjustedMoment)) {
      message = MessageTemplates.channel.NEXT_SUBMISSION_SCHEDULED_FOR_FUTURE_DATE(channel);
    }

    // submission window scheduled but not yet open for today
    if (channel.schedule[todayDay] && adjustedMoment.isBefore(startTime)) {
      message = MessageTemplates.channel.UPCOMING_SCHEDULED_SUBMISSION_FOR_TODAY(channel);
    }

    // in the middle of the scheduled window
    if (channel.schedule[todayDay] && adjustedMoment.isBetween(startTime, endTime)) {
      const assignedPuzzle = await ChannelStore.getAssignedPuzzleForToday(channelId);
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
    }

    bot.reply(event, message);
  },
};
