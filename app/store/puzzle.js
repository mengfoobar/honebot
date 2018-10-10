// const Puzzle = require('../models/puzzle')
const { sprintf } = require('sprintf-js');
const _ = require('lodash');
const db = require('../db');
const Puzzle = require('../models/puzzle');

module.exports = {
  getFreshPuzzle: async (channelId) => {
    const freshPuzzles = await db.query(sprintf(
      'SELECT * from puzzles where id NOT IN '
      + '(SELECT DISTINCT `puzzle` from submissions '
      + "where `channel` = '%s')"
      + ' ORDER BY RAND() LIMIT 1', channelId,
    ), { model: Puzzle });

    return _.get(freshPuzzles, '0', null);
  },
  get: async (id, callback) => {

  },
  save: async (rawData, callback) => {

  },
  delete: async (id, callback) => {

  },
  all: async (callback) => {

  },
};
