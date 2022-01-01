const express = require('express');
const router = express.Router();

const { ObjectId } = require('mongodb');
const habitSchema = require('../database/habitModel');
const HabitModel = new habitSchema();

router.get('/', async (req, res)=>{
    if (!req.authorization.auth){
        res.status(403).json({status:false,error:'Not logged in'})
    }
    const allHabits = await HabitModel.findAll();
    return res.status(200).json(allHabits);
})

router.post('/', async (req, res)=>{
    if (!req.authorization.auth){
        res.status(403).json({status:false,error:'Not logged in'})
    }
    let newHabit = { ...req.body, createdBy:req.authorization.user._id};

    const response = await HabitModel.create(newHabit);
    if (response.error){
        return res.status(403).json(response.message)
    }
    return res.status(200).json(response);
})

router.put('/', async (req, res)=>{
    if (!req.authorization.auth){
        res.status(403).json({status:false,error:'Not logged in'})
    }
    try {
        let habitUpdate = req.body;
        if (!habitUpdate){
            throw 'no data sent'
        }
        if (!Array.isArray(habitUpdate)){
            habitUpdate = [habitUpdate]
        }
        const statuses = await HabitModel.update(habitUpdate);
        return res.status(200).json({status:true,message:statuses});
    } catch (err){
        return res.status(403).json(err)
    }
})

module.exports = router;
