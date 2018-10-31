module.exports = {
  SHOW: () => [
    'Here are the commands available:',
    '',
    ' - `/hone settings` to edit bot settings for channel',
    ' - `/hone start` to start on the puzzle of the day',
    ' - `/hone leaderboard` to show results and who is currently kicking butt',
    ' - `/hone status` to show current status',
    ' - To stop `hone` bot from sending puzzles, set status to *Offline* using `/hone settings`',
  ].join('\n'),
};
