    const express = require('express');
    var cors = require('cors');
    const expressWinston = require('express-winston')
    const logger = require('./logger')
    const { transports, format } = require('winston')
    var userRoute = require('./route/userRoute');
    
 
    const app =  express()
    app.use(express.json());
    app.use(cors());
    app.use(express.static(__dirname +'/public'));
    app.use(expressWinston.logger({
        winstonInstance:logger,
        statusLevels:true
    }))
    
    app.use('/',userRoute);

    module.exports = app;
