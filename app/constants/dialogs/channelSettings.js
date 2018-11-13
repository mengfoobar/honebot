const moment = require('moment');

const timezones = require('../timezones');
const times = require('../times');
const ChannelStore = require('../../store/channel');
const { generateDynamicId } = require('../../utils/idGenerator');

module.exports = async (bot, event) => {
  const channel = await ChannelStore.get(event.channel);

  const adjustedMoment = moment().utcOffset(channel.timezone);
  const todayDay = adjustedMoment.format('dddd').toLowerCase();
  const todaySchedule = channel.schedule.monday; // TODO monday for now, fix later


  const dialog = bot
    .createDialog('Hone Bot Settings', generateDynamicId('settings'), 'Submit')
    .addSelect(
      'Bot Status',
      'isActive',
      null,
      [{ label: 'Online', value: 1 }, { label: 'Offline', value: 0 }],
      { value: channel.isActive ? 1 : 0 },
    )
    .addSelect('Select Timezone', 'timezone', null, timezones, {
      placeholder: 'Select ...',
      value: channel.timezone,
    })
    .addSelect('Submission Start Time', 'startTime', null, times, {
      placeholder: 'Select ...',
      value: todaySchedule.start,
    })
    .addSelect('Submission Close Time', 'endTime', null, times, {
      placeholder: 'Select ...',
      value: todaySchedule.end,
    });

  return dialog;
};
