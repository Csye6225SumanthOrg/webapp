const express = require('express');
const AuthService = require('../services/AuthService');
const {createUser,updateUser,getUser,sampleAPI} = require('../controller/UserController');
//const AuthService = require('../services/AuthService');
const route = express.Router();


route.post('/user',[createUser]);
route.put('/user/:userID', [AuthService,updateUser]);
route.get('/user/:userID', [AuthService,getUser]);
// route.get('/healthz',(req,res)=>{
//     return res.status(200).json({message: "its healthy"});
// });
route.get('/sampleAPI',[sampleAPI]);


module.exports = route;