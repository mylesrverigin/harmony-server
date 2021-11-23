const dbcollection = require('./connection');

module.exports = class userModel extends dbcollection{
    constructor () {
        super('Users');
        this.fields = ['created','refreshTokenVersion','authTokenVersion','birthday','deathday'];

        this.required = {
            authTokenVersion:true,
            created:true,
            refreshTokenVersion:true
        };
        
        this.defaults = {
            created:Date.now(),
            refreshTokenVersion:0,
            authTokenVersion:0
        }

        
    }
  }
