const mongoose = require('mongoose');
require('dotenv').config()

const db = require('./database/connection');
const testmodel = require('./database/testModel');

db.then(res=>{
    console.log(res.connection.readyState)
}).then(()=>{
    let testData = new testmodel({
        test1:'test1',
        test2:'test2'
    });
    testData.save().then(()=>{
        console.log('data saved')
        testmodel.find().then((res)=>{
            console.log('found data', res)
        })
    })
});
// 0: disconnected
// 1: connected
// 2: connecting
// 3: disconnecting

