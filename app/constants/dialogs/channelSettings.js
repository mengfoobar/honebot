const timezones = require('../timezones');
const ChannelStore = require('../../store/channel');
const { generateDynamicId } = require('../../utils/idGenerator');

module.exports = async (bot, event) => {
  const channel = await ChannelStore.get(event.channel);

  const dialog = bot
    .createDialog('Puzlr Settings', generateDynamicId('settings'), 'Submit')
    .addSelect(
      'Bot Status',
      'isActive',
      null,
      [{ label: 'Online', value: 1 }, { label: 'Offline', value: 0 }],
      { value: channel.isActive ? 1 : 0 },
    )
    .addSelect('Select Timezone', 'timezone', null, timezones, {
      placeholder: 'Select Your Timezone',
      value: channel.timezone,
    });

  return dialog;
};
