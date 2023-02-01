const {User} = require('../models');
const validate = require('./validation')
var bcrypt = require('bcryptjs');
var message = require('../constant/messages');

var userService = {}

userService.createUser = async function(data,func){
    var errors = validate.validateCreate(data);
    if(errors.length>0){
        var errorObj = {
            isSuccess : false,
            errors : errors
        }
       return func(errorObj,null,400);
    }
   data.password= encryptPassword(data.password);
   const {username, password,first_name,last_name} = data;
   try{
       
        const user = await User.create({username, password,first_name,last_name});
        const res ={
            id: user.id,
            username:user.username,
            first_name:user.first_name,
            last_name:user.last_name,
            account_created:user.account_created,
            account_updated:user.account_updated
        }
        func(null,res,201) ;
    }
    catch(err){
        func(validate.createErrorObj(err),null,400) ;
    }
}

userService.updateUser = async function(data,func){
    try{
        var errors = validate.validateUpdate(data.body);
        if(errors.length>0){
            var errorObj = {
                isSuccess : false,
                errors : errors
            }
           return func(errorObj,null,400);
        }
        if(!data.body){
            return  func(validate.errorObj(message.INVALID_BODY),null,400);
        }
        if(data.body.account_created_at){
            return  func(validate.errorObj(message.NO_ACC_CREATED_AT),null,400);
        }
        if(data.body.account_updated_at){
            return  func(validate.errorObj(message.NO_ACC_UPDATED_AT),null,400);
        }
        if(!data.body.first_name && !data.body.last_name && !data.body.password){
            return func(validate.errorObj(message.NO_DATA_UPDATE),null,400);
        }
        const userID = data.params.userID;
        var userData = await User.findByPk(userID);
        if(data.body.username && userData.username!=data.body.username){
            return  func(validate.errorObj(message.NO_EMAIL_ADDRESS),null,400);
        }
        if(data.body.id && userData.id!=data.body.id){
            return  func(validate.errorObj(message.NO_ID_UPDATE),null,400);
        }
        var param = {};
        if(data.body.first_name){
            param.first_name= data.body.first_name
        }
        if(data.body.last_name){
            param.last_name= data.body.last_name
        }
        if(data.body.password){
            param.password = encryptPassword(data.body.password);
        }
        const savedObj = await User.update(param, { where: { id:userID } });
        if(savedObj){
            const message ="successfully updated";
            return func(null,{message},204);
        }
        else{
            return  func(validate.errorObj(message.NO_UPDATE),null,400);
        }
    }
    catch(error){
        console.log(error);
        return func(validate.createErrorObj(error),null,400);
    }


};
userService.getUserDetails = async function(data,func){
    try{
        var id = data.params.userID;
        const userObj = await User.findByPk(id);
        if(!userObj){
            return func(validate.errorObj(message.NO_RECORD),null,400);
        }
        const res ={
            id: userObj.id,
            username:userObj.username,
            first_name:userObj.first_name,
            last_name:userObj.last_name,
            account_created:userObj.account_created,
            account_updated:userObj.account_updated
        }
        return func(null,res,200);
    }
    catch(error){
        return func(error,null,400);
    }

}

function encryptPassword(password){
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(password, salt);
    return hash;
}
function comparePassword(password,hash){
    return bcrypt.compareSync(password, hash);
}
 module.exports = userService;