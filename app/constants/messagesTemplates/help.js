module.exports = {
  SHOW: () => [
    'Here are the commands available:',
    '',
    ' - `/hone settings` to edit bot settings for channel',
    " - `/hone start` to start on the puzzle of the day if it's available",
    ' - `/hone leaderboard` to show results and who is currently kicking butt',
    ' - `/hone status` to show current status',
    ' - `/hone schedule` to see when programming exercises are available',
    '',
    ' - To stop `hone` bot from sending puzzles, set status to *Offline* using `/hone settings`',
  ].join('\n'),
};
