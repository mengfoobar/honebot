const Sequelize = require('sequelize');
const logger = require('./utils/logger')

const configs = {
  host: process.env.mysql_host,
  port: process.env.mysql_port,
  user: process.env.mysql_user,
  password: process.env.mysql_password,
  database: process.env.mysql_database,
  connection_limit: process.env.mysql_connection_limit,
};

const sequelize = new Sequelize({
  dialect: 'mysql',
  host: configs.host,
  port: configs.port,
  username: configs.user,
  password: configs.password,
  database: 'hone',
  pool: {
    max: configs.connection_limit,
  },
});

sequelize
  .authenticate()
  .then(() => {
    logger.info('Connection to mysql has been established successfully.');
  })
  .catch((err) => {
    logger.error('Unable to connect to the database:', err);
  });


module.exports = sequelize;
