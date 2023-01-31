const express = require('express');
const UserController = require('../controller/userController')
const AuthService = require('../services/AuthService');
const route = express.Router();


route.post('/v1/user',[UserController.createUser]);
route.put('/v1/user/:userID', [AuthService,UserController.updateUser]);
route.get('/v1/user/:userID', [AuthService,UserController.getUser]);
route.get('/healthz',(req,res)=>{
    return res.status(200).json({message: "its healthy"});
});
route.get('/sampleAPI',[UserController.sampleAPI]);


module.exports = route;