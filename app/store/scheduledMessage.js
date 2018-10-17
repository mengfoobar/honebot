const { sprintf } = require('sprintf-js');
const _ = require('lodash');
const db = require('../db');
const ScheduledMessage = require('../models/scheduledMessage');

module.exports = {
  addNewScheduledMessage: async agendaJobData => ScheduledMessage.create({
    ...agendaJobData,
  }),
  getScheduledMessagesForDate: async (dateStr, messageType = null) => ScheduledMessage.findAll({
    dateScheduled: dateStr,
    messageType,
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
