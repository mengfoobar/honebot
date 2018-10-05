const workspaceEvents = require('./workspace');
const channelEvents = require('./channel')
const commandsEvents = require('./commands')

module.exports = {
  initWorkspaceEvents: workspaceEvents,
  initChannelEvents: channelEvents,
  initCommandEvents: commandsEvents,
}
