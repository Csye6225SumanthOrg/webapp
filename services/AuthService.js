const { User } = require('../models');
const bcrypt = require("bcrypt");
const MESSAGE = require('../constant/messages')

const AuthService = async (req, res, next) => {
    console.log(req.headers);
    //AUTH header check
    if (!req.headers.authorization || req.headers.authorization.indexOf('Basic ') === -1) {
        return res.status(401).json({
            message: MESSAGE.NO_AUTH
        })
    }
    const base64Cred = req.headers.authorization.split(' ')[1];
    const credentials = Buffer.from(base64Cred, 'base64').toString('ascii');
    const [email, password] = credentials.split(':');


    //find user and verify password
    const user = await User.findOne({ where: { username: email } });
    console.log(user);
    if (!user) {
        return res.status(401).json({
            message: MESSAGE.INVALID_CRED
        })
    }
    
    //check password
    const isPasswordMatch = bcrypt.compareSync(password, user.password)
    if (!isPasswordMatch) {
        return res.status(401).json({
            message: MESSAGE.INVALID_CRED
        })
    }
    // verify if user is trying to access his own account
    if (req.params.userID){
        if (user.id != req.params.userID) {
            return res.status(403).json({
                message: MESSAGE.FORBIDDEN_SRC
            })
        }
    }
    else{
        return res.status(400).json({
            message: MESSAGE.BAD_REQUEST
        }) 
    }
    // authentication successful
    next();



}

module.exports = AuthService;