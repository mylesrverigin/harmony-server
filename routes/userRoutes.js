const express = require('express');
const router = express.Router();
const db = require('../database/connection');
const UserModel = require('../database/userModel');
const { hashPw, compareHash } = require('../util/pwHashing');
const { createAuthToken,createRefreshToken } = require('../util/jwtUtil');

router.get('/all',async (req,res)=>{
    res.status(200).json(await UserModel.find());
})

router.put('/info',(req,res)=>{
    res.status(200).send('update info');
})

router.post('/signup',async (req,res)=>{
    const newUser = req.body;
    if (!newUser.username || !newUser.email || !newUser.password){
        res.status(400).json({status:false,error:'Missing required field'})
    }

    let existingUsers = await UserModel.find({email:newUser.email}).exec();
    if ( existingUsers.length > 0){
        res.status(400).json({status:false,error:'User already exists in system'})
    }

    try {
        newUser.password = hashPw(newUser.password);
        let insertedData = await new UserModel({
            ...newUser,
            created:Date.now(),
            refreshTokenVersion:0,
            authTokenVersion:0}).save();
        
        let tokenData = {
            _id:insertedData._id,
            version:insertedData.authTokenVersion
        }

        res.status(200).json({
            status:true,
            auth:createAuthToken(tokenData),
            refresh:createRefreshToken({...tokenData,version:insertedData.refreshTokenVersion})
        });
    }catch {
        res.status(400).json({status:false,error:'Inserting User Failed'})
    }
})

router.post('/login',async (req,res)=>{
    const loginData = req.body;
    if (!loginData.password || !loginData.email){
        req.status(400).json({status:false,error:'missing required fields'})
    }

    const userProfile = await UserModel.findOne({email:loginData.email}).exec()
    if ( !userProfile){
        res.status(404).json({status:false,error:'Problems Finding login info'})
    }else{
        if ( compareHash(loginData.password,userProfile.password) ){
            let tokenData = {
                _id:userProfile._id,
                version:userProfile.authTokenVersion
            }

            res.status(200).json({
                status:true,
                auth:createAuthToken(tokenData),
                refresh:createRefreshToken({...tokenData,version:userProfile.refreshTokenVersion}),
            });
        }else{
            res.status(403).json({status:false,error:'Incorrect Password'})
        }
    }

   
})

module.exports = router;