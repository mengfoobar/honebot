const { createLogger, format, transports } = require('winston');

const {
  combine, timestamp, printf, colorize,
} = format;

const myFormat = printf(info => `${info.timestamp} [${info.level}]: ${info.message}`);

const logger = createLogger({
  format: combine(
    colorize(),
    timestamp(),
    myFormat,
  ),
  transports: [new transports.Console()],
});

module.exports = logger;
