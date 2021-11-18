require('dotenv').config()
const { MongoClient } = require("mongodb");

(async()=>{
    const client = new MongoClient(process.env.MONGO_CONNECTION_URI);

    await client.connect();
    const collection = client.db('harmonyDb').collection('testSchema');
    await collection.insertOne({ name: "testData", value: "3" })
    const datareturned = await collection.findOne({name:'testData'});
    console.log(datareturned);

    await client.close();
})()