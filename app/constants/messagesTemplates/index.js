const help = require('./help');
const puzzle = require('./puzzle');
const scheduled = require('./scheduled');
const misc = require('./misc');
const channel = require('./channel');
const workspace = require('./workspace');

/*
  RULE OF THUMB
  no network calls in message templates
 */

module.exports = {
  help,
  puzzle,
  scheduled,
  misc,
  channel,
  workspace,
};
