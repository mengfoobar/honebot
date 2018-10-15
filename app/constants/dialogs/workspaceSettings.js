const timezones = require('../timezones');
const WorkspaceStore = require('../../store/workspace');
const { generateDynamicId, getLabelFromDynamicId } = require('../../utils/idGenerator');

module.exports = async (bot) => {
  const workspace = await WorkspaceStore.get(bot.team_info.id);

  const dialog = bot
    .createDialog('Puzlr Settings', generateDynamicId('settings'), 'Submit')
    .addSelect(
      'Select Timezone',
      'timezone',
      null,
      timezones,
      { placeholder: 'Select Your Timezone', value: workspace.timezone },
    );

  return dialog;
};
