const Sequelize = require('sequelize');
const logger = require('./utils/logger');

const configs = {
  dialect: 'mysql',
  host: process.env.mysql_host,
  port: process.env.mysql_port,
  username: process.env.mysql_user || undefined,
  password: process.env.mysql_password || undefined,
  database: process.env.mysql_database,
  pool: {
    max: process.env.connection_limit || 10,
  },
};

const sequelize = new Sequelize({ ...configs });

sequelize
  .authenticate()
  .then(() => {
    logger.info('Connection to mysql has been established successfully.');
  })
  .catch((err) => {
    logger.error('Unable to connect to the database:', err);
  });


module.exports = sequelize;
