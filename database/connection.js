const { MongoClient,ObjectId } = require("mongodb");

class dbConnection {
    constructor (name) {
        this.init(name);
        this.fields = null;
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

    create = async (data) => {
        let canInsert = true;
        let error;
        let insertedData = {};
        if (!this.fields){
            insertedData = data
        }else{
            Object.keys(this.fields).forEach(field=>{
                if (field in data){
                    insertedData[field] = data[field];
                }else if( this.fields[field]['required'] ){
                    // field required, check if default set
                    let defaultValue = this.fields[field]['default'];
                    if ( defaultValue != undefined ){
                        insertedData[field] = defaultValue;
                    }else{
                        // no default return error
                        error = {
                            error : true,
                            message : `Missing field ${field}`
                        };
                        canInsert = false;
                    }
                }
            })
        }
        if ( canInsert ){
            return await this.collection.insertOne(insertedData);
        }else{
            return error;
        }
        
    }
    update = async (dataArr) => {
        let updatedList = [];
        const correctedData = this.stripFields(dataArr);
        for (let data of correctedData){
            console.log(data);
            let success
            try{
                let dataId = data._id
                if ( !dataId){
                    throw 'missing Id'
                }
                delete data['_id'];
                success = await this.collection.updateOne({_id:ObjectId(dataId)}, { $set:{ ...data}}, {upsert:true});
                console.log(success);
                updatedList.push(`${dataId} updated`)
            }catch (err){
                console.log(err)
                updatedList.push(err);
            }
        }
        return updatedList;
    }

    stripFields = (arr) => {
        let strippedDatas = []
        arr.forEach(data=>{
            let strippedData = {}
            Object.keys(data).forEach(key=>{
                if (key in this.fields){
                    strippedData[key] = data[key]
                }
            })
            strippedDatas.push(strippedData);
        })
        return strippedDatas;
    }
}

module.exports = dbConnection;