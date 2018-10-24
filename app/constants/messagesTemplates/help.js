module.exports = {
  SHOW: () => [
    'Here are the commands available:',
    '',
    ' - `@puzlr settings` to edit bot settings for channel',
    ' - `@puzlr start` to start on the puzzle of the day',
    ' - `@puzlr leaderboard` to show results and who is currently kicking butt',
  ].join('\n'),
};
