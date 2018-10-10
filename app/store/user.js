/* eslint-disable no-unused-expressions */

const User = require('../models/user');

module.exports = {
  get: async (id, cb) => {
  },
  save: async (data) => {
    // TODO: handle updating here as well

    const results = await User.findOrCreate({
      where: { id: data.id },
      defaults: data,
    });

    return results;
  },
  delete(id, cb) {
  },
  all(cb) {
  },
};
