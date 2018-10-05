const cleanBotkitDataToModel = botkitData => ({
  ...botkitData,
});

const cleanModelDataToBotkit = modelData => ({
  ...modelData,
});

module.exports = {
  get: async (id, cb) => {
    console.log('hit channel get');
  },
  save: async (rawData, cb) => {
    console.log('hit channel save');
  },
  delete(id, cb) {
    console.log('hit channel delete');
  },
  all(cb) {
    console.log('hit channel all');
  },
};
