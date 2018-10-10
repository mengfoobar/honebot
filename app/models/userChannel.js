const Sequelize = require('sequelize');
const Channel = require('./channel');
const User = require('./user')

const UserChannel = Sequelize.define('user_channel');
User.belongsToMany(Channel, { through: UserChannel });

Channel.belongsToMany(User, { through: UserChannel });

module.exports = UserChannel
