const WorkspaceModel = require('../models/workspace');

const cleanBotkitDataToModel = botkitData => ({
  id: botkitData.id,
  createdBy: botkitData.createdBy,
  url: botkitData.url,
  team: botkitData.name,
  botToken: botkitData.bot.token,
  workspaceToken: botkitData.bot.app_token,
  botUserId: botkitData.bot.user_id,
});

const cleanModelDataToBotkit = modelData => ({
  id: modelData.id,
  createdBy: modelData.createdBy,
  url: modelData.url,
  name: modelData.team,
  bot: {
    token: modelData.botToken,
    app_token: modelData.workspaceToken,
    user_id: modelData.botUserId,
    createdBy: modelData.createdBy,
    name: modelData.team,
  },
});

module.exports = {
  get: async (id, callback) => {
    const workspace = await WorkspaceModel.findById(id);
    callback(null, workspace ? cleanModelDataToBotkit(workspace.toJSON()) : null);
  },
  save: async (rawData, callback) => {
    // TODO: handle updating here as well
    const newWorkspaceData = cleanBotkitDataToModel(rawData);

    await WorkspaceModel.findOrCreate({
      where: { id: newWorkspaceData.id },
      defaults: newWorkspaceData,
    });

    callback();
  },
  delete: async (id, callback) => {
    const workspace = await WorkspaceModel.findById(id);
    if (workspace) {
      await workspace.destroy();
      callback();
    }
  },
  all: async (callback) => {
    const workspaces = await WorkspaceModel.findAll({});
    const cleanedData = workspaces.map(workspace => cleanModelDataToBotkit(workspace));
    callback(cleanedData);
  },
};
