// const Puzzle = require('../models/puzzle')
const samplePuzzles = require('../data/samplePuzzle')

module.exports = {
  getUniquePuzzle: async channelId => {
    //TODO retrieve non completed quizzes for the channel
    return samplePuzzles[0]
  },
};
