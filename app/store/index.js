const workspaces = require('./workspace');
const channels = require('./channel');
const users = require('./user');
const puzzles = require('./puzzle');


module.exports = () => {
  const storage = {
    teams: workspaces,
    users,
    channels,
    puzzles,
  };

  return storage;
};
