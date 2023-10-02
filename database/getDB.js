
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




//read fcts - user aggregate and pipeline
async function readHouses(client){
    return await client.db("soen_341").collection("houses").find()
}

async function get1House(client, listingname){
    return await client.db("soen_341").collection("houses").findOne(listingname)
}

async function getHouseBYDetails(){}

async function getHouseSeller(client, Listingname){
    const result= await client.db("soen_341").collection("houses").findOne({name:Listingname});
    return result.seller;
}
async function getHouseBroker(client, Listingname){
    const result= await client.db("soen_341").collection("houses").findOne({name:Listingname});
    return result.broker;
}
async function getHousePreferences(client, username){
    const user = await client.db("soen_341").collection("users").findOne({username: username});
    const result = await client.db("soen_341").collection("user_preference").findOne({user_id: user._id});
    return result;
} //from user

async function getHousesByBroker(client, username){
    const broker = await client.db("soen_341").collection("brokers").findOne({username: username});
    return client.db("soen_341").collection("brokers").aggregate( [{$match: { $expr: { broker: broker._id }}}] )


}


module.exports = { getHouseID, getBrokerID, getUserID, readHouses, get1House, getHouseSeller,getHouseBroker , getHousePreferences, getHouseByBroker};
