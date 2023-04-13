const UserService= require('../services/userService');
const logger = require('../logger');
const {loggerObj} = require('../services/loggerWrapper');var userController = {};
const statClient = require('../config/statsd')

userController.createUser = function (req,res){
    statClient.increment('endpoints.user.createUser');

    UserService.createUser(req.body,(error,success,code)=>{
        if(error){
            logger.error(loggerObj(code,error,null));
            return res.status(code).json(error)
        }
        else{
            logger.info(loggerObj(code,success,null));
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
            logger.error(loggerObj(code,error,null));
            return res.status(code).json(error)
        }
        else{
            logger.info(loggerObj(code,success,null));
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
            logger.error(loggerObj(code,error,null));
            return res.status(code).json(error)
        }
        else{
            logger.info(loggerObj(code,success,null));
            console.log(success);
            return res.status(code).json(success);
        }
    })
}
userController.health = function(req,res){
    statClient.increment('endpoints.health');

    logger.info('https healthz');
    return res.status(200).json({message: "Healthz part 4"});
}

userController.sampleAPI = function(req,res){
    return res.status(200).json({data:"awesome project"})
}


module.exports = userController;