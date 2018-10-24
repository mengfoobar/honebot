/* eslint-disable no-unused-expressions */

const User = require('../models/user');

module.exports = {
  get: async (id, cb) => User.findById(id),
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
  getUserInfoFrom3rdParty: (bot, userId) => new Promise((resolve, reject) => {
    bot.api.users.info({ user: userId }, (err, info) => {
      // check if it's the right user using info.user.name or info.user.id
      if (!err) {
        resolve(info.user);
      } else {
        console.log(err)
        reject(err);
      }
    });
  }),
};
