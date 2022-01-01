const dbcollection = require('./connection');

module.exports = class habitModel extends dbcollection{
    constructor () {
        super('Habit');
        this.fields = {
            _id : {},
            name : {
                required : true
            },
            details : {
                required : true
            },
            createdBy : {
                required : true
            },
            difficult : {
                required : true,
                default : false
            },
            important : {
                required : true,
                default : false
            },
            hasDebuff : {
                required : true,
                default : false
            },
            debuffId : {}
        }
    }
  }