const { decodeAuthToken } = require('../util/jwtUtil');

// Mongo User Schema 
const { ObjectId } = require('mongodb');
const userSchema = require('../database/userModel');
const UserModel = new userSchema();

const jwtAuth = async (req,res,next) => {
    let authObj = {
        user:null,
        auth:false
    }
    req['authorization'] = authObj

    const authHeader = req.headers.auth;
    if (!authHeader || authHeader.split(' ').length != 2){ return next()}
    const decoded = decodeAuthToken(authHeader.split(' ')[1]);
    
    if (decoded){
        // attempt to get user
        const userData = await UserModel.find({_id:ObjectId(decoded._id)})
        if (userData.length && userData[0].authTokenVersion == decoded.version){
            // user is authorized
            req['authorization'] = {
                user:userData[0],
                auth:true
            }
        }
    }
    return next()
}

module.exports = jwtAuth;