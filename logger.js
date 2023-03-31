const {createLogger, format, transports} = require('winston');

const logger = createLogger({
    transports:[
        new transports.Console(),
        new transports.File({
            filename:'mainLog.log'
        })
    ],
    format: format.combine(
        format.timestamp(),
        format.json()
    )
})
module.exports = logger;