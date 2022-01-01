const dbcollection = require('./connection');

module.exports = class goalsModel extends dbcollection{
    constructor () {
        super('Goals');
        this.fields = {
            _id:{},
            dateStarted : {
                required : true,
                default : Date.now()
            },
            deadline : {
                required : true
            },
            active : {
                required  : true,
                default : true
            },
            completed : {
                required : true,
                default : false
            },
            dateCompleted : {},
            name : {
                required : true
            },
            details : {
                required : true
            },
            important : {
                required : true,
                default : false
            }, 
            urgent : {
                required : true,
                default : false
            },
            parentGoal : {},
            hasChildren : {
                required : true,
                default : false
            },
            createdBy : {
                required : true
            },
            currentProgress : {
                required : true,
                default : 0
            },
            maxProgress : {
                required : true,
                default : 1
            },
            insentive : {}
        }
    }
}