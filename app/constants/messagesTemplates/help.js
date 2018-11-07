module.exports = {
  SHOW: () => [
    'Here are the commands available:',
    '',
    ' - `/hone settings` to edit bot settings for channel',
    " - `/hone start` to start on the exercise of the day if it's available",
    ' - `/hone leaderboard` to show results and who is currently kicking butt',
    ' - `/hone status` to show current status',
    ' - `/hone schedule` to see when programming exercises are available',
    '',
    ' - For more information visit honebot.io, or send us an email at hello@honebot.io',
  ].join('\n'),
};
