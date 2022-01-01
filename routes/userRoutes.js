const express = require('express');
const router = express.Router();
const { hashPw, compareHash } = require('../util/pwHashing');
const { createAuthToken,createRefreshToken,decodeAuthToken } = require('../util/jwtUtil');

const { ObjectId } = require('mongodb');
const userSchema = require('../database/userModel');
const UserModel = new userSchema();

router.get('/all',async (req,res)=>{
    res.status(200).json(await UserModel.find());
})

router.get('/info',async (req,res)=>{
    if (!req['authorization'].auth){
        return res.status(403).json({status:false,error:'Invalid Auth'})
    }
    const userData = await UserModel.find({_id:ObjectId(req['authorization'].user._id)})
    return res.status(200).json(userData[0]);
})

router.put('/info', async (req,res)=>{
    if (!req['authorization'].auth){
        return res.status(403).json({status:false,error:'Invalid Auth'})
    }
    try {
        let userData = req.body;
        if ( !userData){
            throw 'no data sent'
        }
        if (!Array.isArray(userData)) {
            userData = [userData]
        }
        const statuses = await UserModel.update(userData);
        return res.status(200).json({status:true,message:statuses})
    }catch {
        return res.status(400).json({status:false,error:'update failed'})
    }
})

router.post('/signup',async (req,res)=>{
    const newUser = req.body;
    if (!newUser.username || !newUser.email || !newUser.password){
        return res.status(400).json({status:false,error:'Missing required field'})
    }

    let existingUsers = await UserModel.find({email:newUser.email});
    if ( existingUsers.length > 0){
        return res.status(400).json({status:false,error:'User already exists in system'})
    }

    try {
        newUser.password = hashPw(newUser.password);
        let insertedData = await UserModel.create(newUser)
        if (insertedData.error){
            throw insertedData.message;
        }
        
        let tokenData = {
            _id:insertedData._id,
            version:0
        }

        res.status(200).json({
            status:true,
            auth:createAuthToken(tokenData),
            refresh:createRefreshToken(tokenData)
        });
    }catch (err) {
        res.status(400).json({status:false,error:'Inserting User Failed '+err})
    }
})

router.post('/login',async (req,res)=>{
    const loginData = req.body;
    if (!loginData.password || !loginData.email){
        req.status(400).json({status:false,error:'missing required fields'})
    }

    const existingUsers = await UserModel.find({email:loginData.email});
    if ( !existingUsers.length){
        return res.status(404).json({status:false,error:'Problems Finding login info'})
    }else{
        const user = existingUsers[0]
        if ( compareHash(loginData.password,user.password) ){
            let tokenData = {
                _id:user._id,
                version:user.authTokenVersion
            }

            return res.status(200).json({
                status:true,
                auth:createAuthToken(tokenData),
                refresh:createRefreshToken({...tokenData,version:user.refreshTokenVersion}),
            });
        }else{
            return res.status(403).json({status:false,error:'Incorrect Password'})
        }
    }

   
})

module.exports = router;