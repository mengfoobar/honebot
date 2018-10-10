const Submission = require('../models/submission');
// TODO: figure out what to do for users who are in multiple channels with bot
// ensure that quizzes are unique

module.exports = {
  save: async data => Submission.findOrCreate({
    where: { puzzle: data.puzzle, user: data.user, channel: data.channel },
    defaults: data,
  }),
  getSubmissionsForUser: async userId => Submission.findAll({
    where: {
      user: userId,
    },
    order: [
      ['createdAt', 'DESC'],
    ],

  }),
  getSubmissionsForPuzzle: async (channel, puzzle) => Submission.findAll({
    where: {
      channel,
      puzzle,
    },
    order: [
      ['createdAt', 'DESC'],
    ],

  }),
  getSubmissionForPuzzle: async (user, puzzle) => Submission.findAll({
    where: {
      user,
      puzzle,
    },
    order: [
      ['createdAt', 'DESC'],
    ],
  }),
  get: async (id, callback) => {

  },
  delete: async (id, callback) => {

  },
  all: async (callback) => {

  },
};
