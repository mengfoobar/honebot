const WorkspaceStore = require('../../store/workspace');
const { parseDynamicId } = require('../../utils/idGenerator');

module.exports = (controller) => {
  controller.on('dialog_submission', (bot, e) => {
    // TODO: save settings in workspace/channel
    const key = parseDynamicId(e.callback_id);
    handleDialogCallback[key](bot, e);
  });
};

const handleDialogCallback = {
  settings: async (bot, e) => {
    const { submission } = e;
    const updateResult = await WorkspaceStore.update(bot.team_info.id, {
      timezone: submission.timezone,
    });

    bot.reply(e, 'Got it!');
    // call dialogOk or else Slack will think this is an error
    bot.dialogOk();
  },
};
