const express = require('express');
const {MongoClient} = require('mongodb');
const bcrypt = require('bcryptjs');


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
// add to database
async function addNewHouse(client, listingName, price, location, seller, broker, numOfBed, numOfBath, furnished, buildYRS, extra, type, buildType, stories, photo, clName, brkName, sizeOfProp, garage, listingType){

    const house = await client.db("soen_341").collection("houses").insertOne({
        name: listingName
    });
    const details = await client.db("soen_341").collection("house_details").insertOne({
        house_id: house.insertedId,
        price: price,
        location: location,
        numOfBath: numOfBath,
        numOfBed: numOfBed,
        furnished: furnished,
        buildYRS: buildYRS,
        extra: extra, // heating, pool, gym, ect.
        buildType: buildType,
        stories: stories,
        photo: photo,
        sizeOfProp: sizeOfProp,
        garage: garage,
        listingType: listingType,
        listingDate: new Date()

    });
    const sellers = await client.db("soen_341").collection("seller").insertOne({
        house_id: house.insertedId,
        seller: getUserID(client, clName),  // maybe fine seller id
        broker: getBrokerID(client, brkName) // maybe find broker id
    });

    console.log(`New house listing created with the following id: ${house.insertedId}`);
console.log(`New house detail listing created with the following id: ${details.insertedId}`);
console.log(`New seller detail listing created with the following id: ${sellers.insertedId}`);
}

async function addNewBroker(client, username, name, password){  //encrypt user n pass
    const broker = await client.db("soen_341").collection("brokers").insertOne({
        name: name,
        username: username,
        password: bcrypt.hash(password, 10)
    });
}


async function addNewUser(client, username, name, password){ //encrypt user n pass
    const user = await client.db("soen_341").collection("users").insertOne({
        name: name,
        username: username,
        password: bcrypt.hash(password, 10)
    });
    const userPref = await client.db("soen_341").collection("user_preference").insertOne({
        user_id: user.insertedId,

    });


    // will create user preferences but it will all be null for now
}

//edit fcts

async function editHouse(client, listingName, tag, newText){
    try {
        const house = await client.db("soen_341").collection("houses").findOne({name: listingName});
        const listing = await client.db("soen_341").collection("house_details").findOne({house_id: house.insertedId});
        // have specific listing now have to update
    }catch (e) {
        console.log("house not found");
    }
} // include details

async function editBroker(){} //broker #, user &pass, name

// maybe edit user to change pass or name or smt

async function editHousePreference(){} //user


//delete fcts
async function deleteHouse(client, nameOfListing) {
      try {
          const houseList = await client.db("soen_341").collection("houses").deleteOne({name: nameOfListing});
          const housedetailsList = await client.db("soen_341").collection("house_details").deleteOne({house_id: houseList.insertedId}); // maybe have to find before delete
          const houseSellerList = await client.db("soen_341").collection("seller").deleteOne({house_id: houseList.insertedId});
      }catch (e) {
          console.log("element not found");
      }

}

async function deleteBroker(client, brokerName){
    try {
        const houseList = await client.db("soen_341").collection("brokers").deleteOne({name: brokerName});
        //maybe edit listing to remove any instance of that broker
         }catch (e) {
        console.log("element not found");
    }
}

async function deleteUser(client, username){
    try{
        const userList = await client.db("soen_341").collection("users").deleteOne({username: username});
        const userPrefList = await client.db("soen_341").collection("user_preference").deleteOne({user_id: userList.insertedId});
    }catch (e) {
        console.log("user not found or user preference not found");
    }
} //delete house pref with





//read fcts - user aggregate and pipeline
async function readHouse(client){
    const houseList = await client.db("soen_341").collection("houses").find();

return houseList
}

async function getHouseList(){}

async function getHouseBYDetails(){}

async function getHouseSellerAndBroker(){

}

async function getHousePreferences(){} //from user

async function getHouseByBroker(){}







//check password DONE
async function checkUser(client, username, password){
    const hashPass = await client.db("soen_341").collection("users").findOne({username: username});
    return bcrypt.compare(password, hashPass.password) // check if good return

}

async function checkBroker(client, username, password){
    const hashPass = await client.db("soen_341").collection("brokers").findOne({username: username});
    return bcrypt.compare(password, hashPass.password) // check if good return

}

async function checkAdmin(client, username, password){
    const hashPass = await client.db("soen_341").collection("brokers").findOne({username: username});
    return bcrypt.compare(password, hashPass.password); // check if good return

}

// get LISTING ID, done

async function getHouseID(client, listingName){
    try {
        const houseid = client.db("soen_341").collection("houses").findOne({name: listingName});
        return houseid.insertedId;
    }catch (e) {
        console.log("houselisting not found");
    }
}

async function getBrokerID(client, brokerName){
    try {
        const brokerid = client.db("soen_341").collection("brokers").findOne({name: brokerName});
        return brokerid.insertedId;
    }catch (e) {
        console.log("broker not found");
    }
}

async function getUserID(client, username){
    try{
    const userid = client.db("soen_341").collection("users").findOne({username: username});
    return userid.insertedId;
    }catch (e) {
        console.log("user not found");
    }
}