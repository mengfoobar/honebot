const ChannelStore = require('../../store/channel');
const { parseDynamicId } = require('../../utils/idGenerator');
const MessageTemplates = require('../../constants/messagesTemplates');

module.exports = (controller) => {
  controller.on('dialog_submission', (bot, e) => {
    const key = parseDynamicId(e.callback_id);
    // TODO: add handling for unknown dialogs
    if (handleDialogCallback[key]) {
      handleDialogCallback[key](bot, e);
    }
  });
};

const handleDialogCallback = {
  settings: async (bot, e) => { // TODO: move this to another file when more dialog events comes
    const { submission } = e;
    const channel = await ChannelStore.get(e.channel);

    const { schedule } = channel;
    Object.keys(schedule).forEach((k) => {
      schedule[k].start = submission.startTime;
      schedule[k].end = submission.endTime;
    });

    const updatedChannel = await ChannelStore.update(e.channel, {
      timezone: submission.timezone,
      isActive: parseInt(submission.isActive, 10),
      schedule,
    });
    const messages = [];
    messages.push(MessageTemplates.channel.SETTINGS_UPDATED());

    if (updatedChannel.isActive && !channel.isActive) {
      messages.push(MessageTemplates.channel.CHANNEL_REACTIVATED(updatedChannel));
    } else if (!updatedChannel.isActive && channel.isActive) {
      messages.push(MessageTemplates.channel.CHANNEL_DEACTIVATED());
    }

    bot.say(
      {
        text: messages.join('\n'),
        channel: e.channel, // a valid slack channel, group, mpim, or im ID
      },
    );
    bot.dialogOk();
  },
};
