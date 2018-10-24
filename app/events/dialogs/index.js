const ChannelStore = require('../../store/channel');
const { parseDynamicId } = require('../../utils/idGenerator');
const MessageTemplates = require('../../constants/messagesTemplates');

module.exports = (controller) => {
  controller.on('dialog_submission', (bot, e) => {
    const key = parseDynamicId(e.callback_id);
    // TODO: add handling for unknown dialogs
    handleDialogCallback[key](bot, e);
  });
};

const handleDialogCallback = {
  settings: async (bot, e) => {
    const { submission } = e;
    const channel = await ChannelStore.get(e.channel);
    const updatedChannel = await ChannelStore.update(e.channel, {
      timezone: submission.timezone,
      isActive: parseInt(submission.isActive, 10),
    });
    const messages = [];
    messages.push(MessageTemplates.channel.SETTINGS_UPDATED());

    if (updatedChannel.isActive && !channel.isActive) {
      messages.push(MessageTemplates.channel.CHANNEL_REACTIVATED(updatedChannel));
    } else if (!updatedChannel.isActive && channel.isActive) {
      messages.push(MessageTemplates.channel.CHANNEL_DEACTIVATED());
    }
    bot.reply(e, messages.join('\n'));
    bot.dialogOk();
  },
};
