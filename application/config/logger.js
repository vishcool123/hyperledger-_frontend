const winston = require('winston');

const myFormat = winston.format.printf(
  (info) =>
    `(${Date(info.timestamp)}: ${info.level} | ${JSON.stringify(
      info.message.split('\n')[0],
    )}`,
);
const logger = winston.createLogger({
  transports: [
    new winston.transports.File({
      level: 'info',
      filename: './logs/all-logs.log',
      handleExceptions: true,
      json: true,
      maxsize: 5242880, // 5MB
      maxFiles: 5, // if log file size is greater than 5MB, logfile2 is generated
      colorize: true,
    }),

    new winston.transports.Console({
      level: 'debug',
      filename: './logs/logs.log',
      handleExceptions: true,
      json: true,
      colorize: true,
      timestamp: true,
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.colorize({
          colors: {
            error: 'red',
            warn: 'yellow',
            info: 'cyan',
            debug: 'green',
          },
        }),
        winston.format.errors({ stack: true }),
        myFormat,
      ),
    }),
  ],
  exceptionHandlers: [
    new winston.transports.File({
      filename: './logs/exceptions.log',
      timestamp: true,
      maxsize: 5242880,
      json: true,
      colorize: true,
    }),
  ],
  exitOnError: false,
});

module.exports = logger;
module.exports.stream = {
  write(message) {
    logger.info(message);
  },
};
