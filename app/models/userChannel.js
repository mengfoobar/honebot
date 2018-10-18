const db = require('../db')
const Channel = require('./channel');
const User = require('./user')

const UserChannel = db.define('UserChannel');
User.belongsToMany(Channel, { through: UserChannel });

Channel.belongsToMany(User, { through: UserChannel });

module.exports = UserChannel
