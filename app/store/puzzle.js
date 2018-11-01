const { sprintf } = require('sprintf-js');
const _ = require('lodash');
const db = require('../db');
const Puzzle = require('../models/puzzle');

module.exports = {
  getFreshPuzzle: async (channelId) => {
    const freshPuzzles = await db.query(sprintf(
      'SELECT * from puzzles where id NOT IN '
      + '(SELECT DISTINCT `puzzleId` from submissions '
      + "where `channelId` = '%s')"
      + ' ORDER BY RAND() LIMIT 1', channelId,
    ), { model: Puzzle });

    return _.get(freshPuzzles, '0', null);
  },
  getIntroPuzzle: async () => Puzzle.findOne({
    where: {
      type: 'INTRO',
    },
  }),
  get: async (id, callback) => {

  },
  save: async (rawData, callback) => {

  },
  delete: async (id, callback) => {

  },
  all: async (callback) => {

  },
};
