    const express = require('express');
    var cors = require('cors');
    var userRoute = require('./route/userRoute');
    
 
    const app =  express()
    app.use(express.json());
    app.use(cors());
    app.use(express.static(__dirname +'/public'));
    app.use('/v1',userRoute);
    app.get('/healthz',(req,res)=>{
        return res.status(200).json({message: "its healthy"});
    });
    module.exports = app;
