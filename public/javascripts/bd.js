let mongoClient = require("mongodb").MongoClient;

async function main(){
    /**
     * Connection URI. Update <username>, <password>, and <your-cluster-url> to reflect your cluster.
     * See https://docs.mongodb.com/ecosystem/drivers/node/ for more details
     */
    const uri = "mongodb+srv://naolal30:ConnectdatabasetoWebstorm100.@cluster0.ttfusik.mongodb.net/Test1?retryWrites=true&w=majority&appName=AtlasApp"


    const client = new MongoClient(uri);

    try {
        // Connect to the MongoDB cluster
        await client.connect();

        // Make the appropriate DB calls
        await  listDatabases(client);

    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}

main().catch(console.error);

async function listDatabases(client){
    databasesList = await client.db().admin().listDatabases();

    console.log("Databases:");
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
};


/*
function isObject(obj) {
    return Object.keys(obj).length > 0 && obj.constructor === Object;
}

class mongoDbClient {
    async connect(conn, onSuccess, onFailure){
        try {
            let connection = await mongoClient.connect(conn.url, { useNewUrlParser: true });
            this.db = connection.db(conn.dbName);
            logger.info("MongoClient Connection successfull.");
            onSuccess();
        }
        catch(ex) {
            logger.error("Error caught,", ex);
            onFailure(ex);
        }
    }

    async getNextSequence(coll) {
        return await this.db.collection("counters").findOneAndUpdate({
                _id: coll
            },
            {$inc: {seq: 1}},
            {projections: {seq: 1},
                upsert: true,
                returnOriginal: false
            }
        );
    }

    async insertDocumentWithIndex(coll, doc) {
        try {
            if(!isObject(doc)){
                throw Error("mongoClient.insertDocumentWithIndex: document is not an object");
                return;
            }
            var index = await this.getNextSequence(coll);
            doc.idx = index.value.seq;
            return await this.db.collection(coll).insertOne(doc);
        }
        catch(e) {
            logger.error("mongoClient.insertDocumentWithIndex: Error caught,", e);
            return Promise.reject(e);
        }
    }

    async findDocFieldsByFilter(coll, query, projection, lmt) {
        if(!query){
            throw Error("mongoClient.findDocFieldsByFilter: query is not an object");
        }
        return await this.db.collection(coll).find(query, {
            projection: projection || {},
            limit: lmt || 0
        }).toArray();
    }

    async findDocByAggregation(coll, query) {
        if(!query.length){
            throw Error("mongoClient.findDocByAggregation: query is not an object");
        }
        return this.db.collection(coll).aggregate(query).toArray();
    }

    async getDocumentCountByQuery(coll, query) {
        return this.db.collection(coll).estimatedDocumentCount(query || {})
    }

    async findOneAndUpdate(coll, query, values, option) {
        if(!(isObject(values) && isObject(query))){
            throw Error("mongoClient.UpdateDocument: values and query should be an object");
        }
        return this.db.collection(coll).findOneAndUpdate(query, {$set : values}, option || {})
    }

    async modifyOneDocument(coll, query, values, option) {
        if(!(isObject(values) && isObject(query))){
            throw Error("mongoClient.ModifyOneDocument: values, query and option should be an object");
        }
        return await this.db.collection(coll).updateOne(query, values, option || {})
    }

    async close() {
        return await this.db.close();
    }
}

module.exports = {
    mongoDbClient: mongoDbClient
}

 */

/*
const MongoClient = require('mongodb').MongoClient;

var database; //global
class DB {

    constructor(url, dbName) {
        this.url = url;
        this.dbName = dbName;
    }

    connect() {
        console.log('connecting to database ' + this.dbName + ' with URL ' + this.url);
        return new Promise((resolve, reject) => {
            MongoClient.connect(this.url, (err, client) => {
                if (err) {
                    reject(err);
                } else {
                    database = client.db(this.dbName);
                    resolve(client.db(this.dbName));
                }
            });
        })

    }
}
 */