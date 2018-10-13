const workspaceEvents = require('./workspace');
const channelEvents = require('./channel');
const commandsEvents = require('./commands');
const dialogEvents = require('./dialogs/index');

module.exports = {
  initWorkspaceEvents: workspaceEvents,
  initChannelEvents: channelEvents,
  initCommandEvents: commandsEvents,
  initDialogEvents: dialogEvents,
};
