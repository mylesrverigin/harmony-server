const { MongoClient } = require("mongodb");

class dbConnection {
    constructor (name) {
        this.init(name);
    }

    init = async (name) => {
        const client = await new MongoClient(process.env.MONGO_CONNECTION_URI).connect()
        this.collection = client.db(process.env.DB_NAME).collection(name);
    }
    
    find = async (query) => {
        const cursor = await this.collection.find(query);
        return cursor.toArray()
    }
    
    findAll = async () => {
        return await this.collection.find({});
    }

    delete = async (query) => {
        return await this.collection.deleteMany(query);
    }

    create = async (user) => {
        return await this.collection.insertOne(user);
    }
}

module.exports = dbConnection;