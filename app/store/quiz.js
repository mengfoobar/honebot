const sampleQuizzes = require('../data/sampleQuiz');

module.exports = {
  getUniqueQuiz: async channelId => {
    //TODO retrieve non completed quizzes for the channel
    return sampleQuizzes[0]
  },
};
