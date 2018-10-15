import winston from 'winston';

const transports = [
  new winston.transports.Console({ colorize: true, timestamp: true }), //, level: 'info'
];

export const loggerTransports = transports;
export default winston.createLogger({ transports });