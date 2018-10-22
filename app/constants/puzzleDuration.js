const moment = require('moment');

module.exports = {
  EASY: moment.duration({ minutes: 10 }),
  MEDIUM: moment.duration({ minutes: 15 }),
  HARD: moment.duration({ minutes: 20 }),
};
