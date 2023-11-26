//when updating house: you have to re-set all of the paramete - so get house first to get all the params and then keep good ones and change the ones to change
// exp:         await upsertListingByName(client, "Cozy Cottage", { name: "Cozy Cottage", bedrooms: 2, bathrooms: 1 }); EVERYTHING WILL BE UPDATING DONT FORGET ANYTHING

//House
const {deleteUser} = require("./deleteDB");
const bcrypt = require("bcrypt");
const {ObjectId} = require("mongodb");
//HOUSE
async function edit1HouseAllProperty(client, listingName, updatedListing){
    try {
        const house = await client.db("soen_341").collection("houses").updateOne({name: listingName}, {$set:updatedListing});
        // have specific listing now have to update
    }catch (e) {
        console.log("house not found");
    }
} // include details

async function editImage(client, newpic, listingName){
    try {
        const house = await client.db("soen_341").collection("houses").findOne({name: listingName});
        const image = await client.db("soen_341").collection("house_pic").updateOne({_id: house.image_id}, {$set:{file:newpic}});
            await client.db("soen_341").collection("houses").updateOne({name: listingName}, {$set:{image_id:image._id}});
    }catch (e) {
        console.log("house not found");
    }
}


//BROKER

async function editBrokerPassword(client,listingName, pass){
    try {
        const brk = await client.db("soen_341").collection("brokers").updateOne({name: listingName}, {$set:{password: await bcrypt.hash(pass, 10)}});
return await editBrokerHouse(client, listingName, brk);

    }catch (e) {
        console.log("house not found");
    }

}
async function editBrokerName(client,listingName, name){
    try {
        const brk = await client.db("soen_341").collection("brokers").updateOne({name: listingName}, {$set:({name:name})});
        return await editBrokerHouse(client, listingName, brk);
    }catch (e) {
        console.log("house not found");
    }
}
async  function editBrokerUsername(client, listingName,user){
    try {
        const brk = await client.db("soen_341").collection("brokers").updateOne({name: listingName}, {$set: {username: user}});
        return await editBrokerHouse(client, listingName, brk);
    }catch (e) {
        console.log("house not found");
    }
}
async function editBroker(client, listingName,all){
    try {
        const brk = await client.db("soen_341").collection("brokers").updateOne({username: listingName}, {$set: all});
        return await editBrokerHouse(client, listingName, brk);
    }catch (e) {
        console.log("broker not found");
    }
}

async function editBrokerHouse(client, listingName, broker){
    try{
        const broks = await client.db("soen_341").collection("brokers").findOne({name: broker});

        return await client.db("soen_341").collection("houses").update({name: listingName}, {$set:{broker: broks._id}});
    }catch(e){
        console.log("broker not found");
    }

}



// USER

async function editHousePreference(client, listingName, updatedListing){
    try {
        const house = await client.db("soen_341").collection("users").find({name: listingName});
        const pref = await client.db("soen_341").collection("user_preference").updateOne({user_id: house._id}, {$set:updatedListing});
return await editUserHouse(client, listingName, usr);
    }catch (e) {
        console.log("house not found");
    }
}


async function editUserPassword(client, listingName, pass){
    try {
        const user = await client.db("soen_341").collection("users").updateOne({name: listingName}, {$set:{password: await bcrypt.hash(pass, 10)}});
        return await editUserHouse(client, listingName, user);
    }catch (e) {
        console.log("house not found");
    }

}
async function editUserName(client,ogName, name){
    try {
        const user = await client.db("soen_341").collection("users").updateOne({name: ogName}, {$set:{name:name}});
        return await editUserHouse(client, name, user);
    }catch (e) {
        console.log("house not found");
    }
}
async  function editUserUsername(client, listingName, users){
    try {
        const user = await client.db("soen_341").collection("users").updateOne({name: listingName}, {$set:{username:users}});
        return await editUserHouse(client, listingName, user);
    }catch (e) {
        console.log("house not found");
    }
}

async function editUser(client, listingName, all){
    try{

    const user = await client.db("soen_341").collection("users").updateOne({name: listingName}, {$set:all});
        return await editUserHouse(client, listingName, user);
    }catch(e){
        console.log("user not found");
    }

}

async function editUserHouse(client, listingName, user){
    try{
        const usr = await client.db("soen_341").collection("users").findOne({name: user});

        return await client.db("soen_341").collection("houses").update({name: listingName}, {$set:{seller: user}});
    }catch(e){
        console.log("broker not found");
    }

}
async function upgradeToBroker(client,username){
    const user = await client.db("soen_341").collection("users").findOne({username: username});
    const broker = await client.db("soen_341").collection("brokers").insertOne({name: user.name, username: user.username, password: user.password});
    await deleteUser(client, user.username);
}

module.exports = {edit1HouseAllProperty, editBroker, editHousePreference, upgradeToBroker, deleteUser, editUser, editUserName, editUserUsername, editUserPassword, editBrokerName, editBrokerUsername, editBrokerPassword, editImage};
