const workspaces = require('./workspace');
const channels = require('./channel');
const submissions = require('./submission');
const puzzles = require('./puzzle');
const users = require('./user')


module.exports = () => {
  const storage = {
    teams: workspaces,
    users,
    submissions,
    channels,
    puzzles,
  };

  return storage;
};
