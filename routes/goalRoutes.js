const express = require('express');
const router = express.Router();

const { ObjectId } = require('mongodb');
const goalSchema = require('../database/goalsModel');
const GoalSchema = new goalSchema();

router.get('/test',async (req,res)=>{
    res.status(200).json(req.authorization);
})

router.get('/', async (req, res)=>{
    if (!req.authorization.auth){
        return res.status(403).json({status:false,error:'Not logged in'})
    }
    const allGoals = await GoalSchema.findAll();
    return res.status(200).json(allGoals);
})

router.post('/', async (req, res)=>{
    if (!req.authorization.auth){
        return res.status(403).json({status:false,error:'Not logged in'})
    }
    let newGoal = { ...req.body, createdBy:req.authorization.user._id};

    const response = await GoalSchema.create(newGoal);
    if (response.error){
        return res.status(403).json(response.message)
    }
    return res.status(200).json(response);
})

router.put('/', async (req,res)=>{
    if (!req.authorization.auth){
        return res.status(403).json({status:false,error:'Not logged in'})
    }
    try {
        let goalUpdate = req.body;
        if (!goalUpdate){
            throw 'no data sent'
        }
        if (!Array.isArray(goalUpdate)){
            goalUpdate = [goalUpdate]
        }
        const statuses = await GoalSchema.update(goalUpdate);
        return res.status(200).json({status:true,message:statuses});
    } catch (err){
        return res.status(403).json(err)
    }
})

module.exports = router;