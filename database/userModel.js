const dbcollection = require('./connection');

module.exports = class userModel extends dbcollection{
    constructor () {
        super('Users');
    }
  }
