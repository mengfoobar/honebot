const sequelize = require('sequelize');
const moment = require('moment');
const Submission = require('../models/submission');
const Channel = require('../models/channel');
const { THIS_MONTH, THIS_WEEK, ALL_TIME } = require('../constants/leaderboardAggregateType');
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
  getLeaderboardResults: async (chanelId, aggregateType) => {
    const channel = await Channel.findById(chanelId);
    const { timezone } = channel;
    const adjustedMoment = moment().utcOffset(timezone);
    let timeDurationQuery;

    switch (aggregateType) {
      case THIS_WEEK:
        timeDurationQuery = [
          adjustedMoment.startOf('week').toDate(),
          adjustedMoment.endOf('week').toDate(),
        ];
        break;
      case THIS_MONTH:
        timeDurationQuery = [
          adjustedMoment.startOf('month').toDate(),
          adjustedMoment.endOf('month').toDate(),
        ];
        break;
      case ALL_TIME:
        // verify that this works
        timeDurationQuery = [];
        break;
      default:
        timeDurationQuery = [];
        break;
    }
    return Submission.findAll({
      where: {
        createdAt: {
          [sequelize.Op.between]: timeDurationQuery,
        },
        channel: chanelId,
      },
      attributes: [
        'user',
        [sequelize.fn('SUM', sequelize.col('score')), 'totalScore'],
        [sequelize.fn('AVG', sequelize.col('duration')), 'avgDuration'],
      ],
      group: ["user"]
    });
  },
  get: async (id, callback) => {

  },
  delete: async (id, callback) => {

  },
  all: async (callback) => {

  },
};
