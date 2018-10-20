const sequelize = require('sequelize');
const moment = require('moment');
const Submission = require('../models/submission');
const Channel = require('../models/channel');
const User = require('../models/user');
const { THIS_MONTH, THIS_WEEK, ALL_TIME } = require('../constants/leaderboardAggregateType');
// TODO: figure out what to do for users who are in multiple channels with bot
// ensure that quizzes are unique

module.exports = {
  save: async data => Submission.findOrCreate({
    where: { puzzleId: data.puzzleId, userId: data.userId, channelId: data.channelId },
    defaults: data,
  }),
  getSubmissionsForUser: async userId => Submission.findAll({
    where: {
      userId,
    },
    order: [
      ['createdAt', 'DESC'],
    ],

  }),
  getSubmissionsForPuzzle: async (channelId, puzzleId) => Submission.findAll({
    where: {
      channelId,
      puzzleId,
    },
    order: [
      ['createdAt', 'DESC'],
    ],

  }),
  getSubmissionForPuzzle: async (userId, puzzleId) => Submission.findAll({
    where: {
      userId,
      puzzleId,
    },
    order: [
      ['createdAt', 'DESC'],
    ],
  }),
  getLeaderboardResults: async (channelId, aggregateType) => {
    const channel = await Channel.findById(channelId);
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
        channelId,
      },
      include: [User],
      attributes: [
        [sequelize.fn('SUM', sequelize.col('score')), 'totalScore'],
        [sequelize.fn('AVG', sequelize.col('duration')), 'avgDuration'],
      ],
      group: ['userId'],
    });
  },
  get: async (id, callback) => {

  },
  delete: async (id, callback) => {

  },
  all: async (callback) => {

  },
};
