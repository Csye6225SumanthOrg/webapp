const { User } = require('../models');
const bcrypt = require("bcrypt");

const BasicAuth = async (req, res, next) => {
    console.log(req.headers);
    // check if authorization header is present
    if (!req.headers.authorization || req.headers.authorization.indexOf('Basic ') === -1) {
        return res.status(401).json({
            message: 'Missing Authorization Header'
        })
    }
    // verify auth credentials
    const base64Credentials = req.headers.authorization.split(' ')[1];
    const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
    //whatif password contains colon
    const [email, password] = credentials.split(':');

    //get user with emailid
    //TODO: Verify with TA??

    const user = await User.findOne({ where: { username: email } });
    console.log(user);
    if (!user) {
        return res.status(401).json({
            message: 'Invalid Authentication Credentials'
        })
    }
    // verify password
    // const isPasswordMatch = await user.password === password;
    const isPasswordMatch = bcrypt.compareSync(password, user.password)
    if (!isPasswordMatch) {
        return res.status(401).json({
            message: 'Invalid Authentication Credentials'
        }),
            console.log("Password not match");
    }
    // verify if user is trying to access his own account
    if (req.params.userID){
        console.log("UID:::" +user.id +" " +req.params.userID);
        if (user.id != req.params.userID) {
            return res.status(403).json({
                message: 'Forbidden Resource'
            }),
                console.log("User not match");
        }
    }
    else{
        return res.status(400).json({
            message: 'Bad Request'
        }) 
    }
    // authentication successful
    next();



}

module.exports = BasicAuth;