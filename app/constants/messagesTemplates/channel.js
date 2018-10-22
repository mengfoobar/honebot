module.exports = {
  PUZLR_JOINED_CHANNEL: () => "What's happening peeps! Puzlr in da house",
  LEADERBOARD_RESULTS: (submissions) => {
    let leaderboardMessage;

    if (submissions && submissions.length > 0) {
      leaderboardMessage = submissions
        .map(
          (r, index) => {
            const data = r.toJSON();
            return `${index + 1}. ${r.user.userName} - total score: ${
              parseFloat(data.totalScore).toFixed(2)
            }, average time taken: ${parseFloat(data.avgDuration).toFixed(2)}s`;
          },
        )
        .join('\n');
    } else {
      leaderboardMessage = 'No submissions yet';
    }
    return leaderboardMessage;
  },
};
