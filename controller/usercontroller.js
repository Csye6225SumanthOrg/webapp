const UserService= require('../services/userService');

var userController = {};

userController.createUser = function (req,res){
    
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
// userController.health = function(req,res){
//     return res.status(200).json({message: "its healthy"});
// }

userController.sampleAPI = function(req,res){
    return res.status(200).json({data:"awesome project"})
}


module.exports = userController;