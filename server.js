const express = require('express');
const {MongoClient} = require('mongodb');
//const bcrypt = require('bcryptjs');



const app = express();


app.listen(3000, function()
{
    console.log("Server running on port 3000.");
});

async function connectToDatabase(){
    /**
     * Connection URI. Update <username>, <password>, and <your-cluster-url> to reflect your cluster.
     * See https://docs.mongodb.com/ecosystem/drivers/node/ for more details
     */
    const uri = "mongodb+srv://naolal30:ConnectdatabasetoWebstorm100.@cluster0.ttfusik.mongodb.net/test?retryWrites=true&w=majority";


    const client = new MongoClient(uri); // create a new MongoClient

    try {
        // Connect to the MongoDB cluster
        await client.connect();

        // Make the appropriate DB calls
//call fct here



    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}

connectToDatabase().catch(console.error);

// list all the databases in the cluster
async  function listDatabases(client){
    let databasesList = await client.db().admin().listDatabases();

    console.log("Databases:");
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
}

