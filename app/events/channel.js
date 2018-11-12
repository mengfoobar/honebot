const moment = require('moment');

const MessageTemplates = require('../constants/messagesTemplates');
const ChannelStore = require('../store/channel');
const PuzzleStore = require('../store/puzzle');

module.exports = (controller) => {
  controller.on('bot_channel_join', async (bot, event) => {
    const workspaceId = event.team;

    const existingChannels = await ChannelStore.getChannelsForWorkspace(workspaceId);

    if (existingChannels && existingChannels.length > 0) {
      bot.say({
        channel: event.channel,
        text: MessageTemplates.channel.CHANNEL_EXISTS_FOR_WORKSPACE(),
      });
    } else {
      const [channel, isNew] = await ChannelStore.save(event);
      bot.say({
        channel: channel.id,
        text: MessageTemplates.channel.JOINED_CHANNEL(channel),
      });

      const introPuzzle = await PuzzleStore.getIntroPuzzle();
      await channel.addPuzzle(introPuzzle, {
        through: {
          dateScheduled: moment().utcOffset(channel.timezone).format('YYYY-MM-DD'),
        },
      });

      setTimeout(() => {
        bot.say({
          channel: channel.id,
          text: MessageTemplates.channel.INTRO_PUZZLE(),
        });
      },
      5000);
    }
  });
};
