module.exports = {
  SHOW: () => [
    'Here are the commands available:',
    '',
    ' - `/hone settings` to edit bot settings for channel',
    ' - `/hone start` to start on the exercise of the day(when available)',
    ' - `/hone leaderboard` to show results and who is currently kicking butt',
    ' - `/hone status` to show current status',
    ' - `/hone schedule` to see the set availability for the exercises',
    '',
    'For instructions on how to use Hone, go to https://honebot.io#instructions.',
    'If you need further assistance, contact us at hello@honebot.io',
  ].join('\n'),
};
