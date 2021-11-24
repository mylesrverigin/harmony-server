const dbcollection = require('./connection');

module.exports = class userModel extends dbcollection{
    constructor () {
        super('Users');
        this.fields = {
            _id : {},
            username : {},
            email : {},
            password : {},
            created : {
                required : true,
                default : Date.now()
            },
            refreshTokenVersion : {
                required : true,
                default : 0
            },
            authTokenVersion : {
                required : true,
                default : 0
            },
            birthday : {},
            deathage : {},

        }
    }
  }
