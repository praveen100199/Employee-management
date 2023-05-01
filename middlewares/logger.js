const winston = require('winston');
const { combine, timestamp, printf }= winston.format;

// Define custom log format
const logFormat = printf(({level, message, timestamp}) =>{
    return `${timestamp} [${level.toUpperCase()}]: ${message}`;
});

// Configure Winston logger
const employeeLogger = winston.createLogger({
    level: 'error',
    format:combine(
        timestamp(),
        logFormat
    ),
    defaultMeta: { service: 'employee-service' },
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: 'error.log' }),
    ],
});

module.exports = {
    employeeLogger
};


