const express = require('express');
const {MongoClient} = require('mongodb');


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

main().catch(console.error);

// list all the databases in the cluster
async  function listDatabases(client){
    databasesList = await client.db().admin().listDatabases();

    console.log("Databases:");
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
}
// new fcts
async function addNewHouse(client, listingName, price, location, seller, broker, numOfBed, furnished, buildYRS, extra, type, buildType, stories){

    const house = await client.db("soen_341").collection("houses").insertOne({
        name: listingName
    });
    const details = await client.db("soen_341").collection("details").insertOne({
        house_id: house.insertedId,
        price: price,
        location: location,
        numOfBed: numOfBed,
        furnished: furnished,
        buildYRS: buildYRS,
        extra: extra,
        type: type,
        buildType: buildType,
        stories: stories
    });
    const sellers = await client.db("soen_341").collection("seller").insertOne({
        house_id: house.insertedId,
        seller: seller,
        broker: broker
    });

    console.log(`New listing created with the following id: ${house.insertedId}`);
console.log(`New listing created with the following id: ${details.insertedId}`);

console.log(`New listing created with the following id: ${sellers.insertedId}`);

}

async function addNewBroker(){  //encrypt user n pass

}


async function addNewUser(){ //encrypt user n pass


    // will create user preferences but it will all be null for now
}

//edit fcts

async function editHouse(){} // include details

async function editBroker(){} //broker #, user &pass, name

// maybe edit user to change pass or name or smt

async function editHousePreference(){} //user


//delete fcts
async function deleteHouse(){}

async function deleteBroker(){}

async function deleteUser(){} //delete house pref with





//read fcts - user aggregate and pipeline
async function readHouse(){}

async function getHouseList(){}

async function getHouseBYDetails(){}

async function getHouseSellerAndBroker(){}

async function getHousePreferences(){} //from user

async function getHouseByBroker(){}

