const {createLogger, format, transports} = require('winston');

const logger = createLogger({
    transports:[
        new transports.Console(),
        new transports.File({
            filename:'home/ec2-user/csye6225.log'
        })
    ],
    format: format.combine(
        format.timestamp(),
        format.json()
    )
})
module.exports = logger;