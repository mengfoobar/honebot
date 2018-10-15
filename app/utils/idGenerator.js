const shortid = require('shortid');

shortid.characters('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ$@');

module.exports = {
  generateDynamicId: label => `${label ? `${label}-` : ''}${shortid.generate()}`,
  parseDynamicId: (dynamicId = '') => dynamicId.split('-')[0],
};
