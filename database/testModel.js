const mongoose = require('mongoose')

// Schema
const testSchema = new mongoose.Schema({
    test1:String,
    test2:String
});

// Model 
const testSchemaModel = mongoose.model('testSchema',testSchema)

// to make info = new testSchemaModel({info})
// to save info.save()
// search  model.findOne({query},(err,data)=>{})

module.exports = testSchemaModel;