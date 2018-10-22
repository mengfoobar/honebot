const ChannelStore = require('../../store/channel');
const { parseDynamicId } = require('../../utils/idGenerator');

module.exports = (controller) => {
  controller.on('dialog_submission', (bot, e) => {
    const key = parseDynamicId(e.callback_id);
    handleDialogCallback[key](bot, e);
  });
};

const handleDialogCallback = {
  settings: async (bot, e) => {
    const { submission } = e;
    const updateResult = await ChannelStore.update(e.channel, {
      timezone: submission.timezone,
      isActive: submission.isActive,
    });
    // TODO: do something with result
    // TODO: update reply message
    bot.reply(e, 'Got it!');
    bot.dialogOk();
  },
};
