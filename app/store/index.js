const workspaces = require('./workspace');
const channels = require('./channel');
const users = require('./user');


module.exports = () => {
  const storage = {
    teams: workspaces,
    users,
    channels,
  };

  return storage;
};
