
const MESSAGE = require('../constant/messages')
const validateData = (data)=>{
    var obj = {
        name :data.name,
        password: data.password,
        email: data.email
    }
    var regExName = /^[a-zA-Z ]*$/;
    var regPassword = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    var schema = JOI.object().keys({
        name: JOI.string().required().pattern(regExName).messages({
            'string.pattern.base': MESSAGE.INVALID_NAME
        }),
        email: JOI.string().email().message(MESSAGE.INVALID_EMAIL),
        password: JOI.string().pattern(regPassword).messages({
            'string.pattern.base': MESSAGE.INVALID_PASSWORD
        })
    })
    console.log(data._doc);
    return schema.validate(obj,{abortEarly:false});
}


const errorObj = (msg)=>{
    return {
        message: msg
    }
}

const createErrorObj = (err) =>{
    var errors = []
    console.log(err);
    if(err && err.errors){
        err.errors.forEach(e=>{
            console.log(e);
            errors.push(e.message);
        })
    }
    return {isSuccess:false,errors:errors};
}

const validatePassword = (name)=>{
    var regExPassword = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
    var lowerCaseLetters = /[a-z]/g;
    var upperCaseLetters = /[A-Z]/g;
    var numbers = /[0-9]/g;
    var specialCharacter = /[^A-Za-z0-9\s]/g;


}

const validateCreate = (data)=>{
    var errorMessages = []
    if(data && data.password){
        var regExPassword = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
        if(regExPassword.test(data.password)){
            errorMessages.push(MESSAGE.INCORRECT_PASSWORD);
        }
        
    }
}

module.exports = {
    errorObj:errorObj,
    validateCreate:validateCreate,
    createErrorObj :createErrorObj
}