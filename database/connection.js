const { MongoClient } = require("mongodb");

class dbConnection {
    constructor (name) {
        this.init(name);
        this.required = null;
        this.defaults = null;
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
            this.fields.forEach(field=>{
                if (field in data){
                    insertedData[field] = data[field];
                }else if( this.isFieldRequired(field)){
                    // field required, check if default set
                    let defaultValue = this.getDefault(field)
                    if ( defaultValue ){
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

    isFieldRequired = (field) =>{
        if (!this.required){
            return false;
        }else{
            return field in this.required;
        }
    }

    getDefault = (field) => {
        if (!this.defaults){
            return null;
        }else{
            return this.defaults[field];
        }
    }
}

module.exports = dbConnection;