const Workspace = require('../models/workspace');

module.exports = {
  insertWorkspace: async newWorkspaceData => Workspace.findOrCreate({
    where: { id: newWorkspaceData.id },
    defaults: newWorkspaceData,
  }),
  getWorkspace: async id => Workspace.findById(id),
};
