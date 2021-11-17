const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username:String,
    password:String,
    email:String,
    created:Date,
    refreshTokenVersion:Number,
    authTokenVersion:Number,
    isAdmin:Boolean
});

module.exports = mongoose.model('Users',userSchema)
