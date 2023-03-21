const UserService= require('../services/userService');
const logger = require('../logger');
var userController = {};
//const statClient = require('../config/statsd')
const StatsD = require('node-statsd');
const statClient = new StatsD('localhost',8125);
userController.createUser = function (req,res){
    statClient.increment('endpoints.user.createUser');

    UserService.createUser(req.body,(error,success,code)=>{
        if(error){
            return res.status(code).json(error)
        }
        else{
            return res.status(code).json(success);
        }
    })
}
userController.updateUser = function (req,res,next){
    //console.log(next);
    console.log("id:::"+req.params.userID);
    statClient.increment('endpoints.user.updateUser');
    UserService.updateUser(req,(error,success,code)=>{
        if(error){
            return res.status(code).json(error)
        }
        else{
            console.log(success);
            return res.status(code).json(success);
        }
    })
     //return res.status(200).json({data:"awesome project"})

}
userController.getUser = function(req,res,next){
    statClient.increment('endpoints.user.getUser');
    UserService.getUserDetails(req,(error,success,code)=>{
        if(error){
            return res.status(code).json(error)
        }
        else{
            console.log(success);
            return res.status(code).json(success);
        }
    })
}
userController.health = function(req,res){
//    statClient.increment('endpoints.health');

    logger.info('healthz is working');
    return res.status(200).json({message: "its healthy"});
}

userController.sampleAPI = function(req,res){
    return res.status(200).json({data:"awesome project"})
}


module.exports = userController;