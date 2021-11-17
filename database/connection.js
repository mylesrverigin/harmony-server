const mongoose = require('mongoose');

const URI = process.env.MONGO_CONNECTION_URI

module.exports = mongoose.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true });