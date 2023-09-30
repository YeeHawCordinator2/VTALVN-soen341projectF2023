/*name: listingName,
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
    listingDate: new Date(),
    seller: getUserID(client, clName),  // maybe fine seller id
    broker: getBrokerID(client, brkName) // maybe find broker id */


//edit fcts

const {deleteUser} = require("./deleteDB");

async function edit1HouseAllProperty(client, listingName, updatedListing){
    try {
        const house = await client.db("soen_341").collection("houses").updateOne({name: listingName}, {$set:updatedListing});
        // have specific listing now have to update
    }catch (e) {
        console.log("house not found");
    }
} // include details
async function edit1House1Property(client, listingName, $tag, update){
    try {
        const house = await client.db("soen_341").collection("houses").updateOne({tag: listingName}, {$set:updatedListing});
        // have specific listing now have to update
    }catch (e) {
        console.log("house not found");
    }
}

async function editMultipleHouse(clinet, ){

}

async function editBroker(){


} //broker #, user &pass, name

// maybe edit user to change pass or name or smt

async function editHousePreference(){






} //user


async function upgradeToBroker(client,username){
    const user = await client.db("soen_341").collection("users").findOne({username: username});
    const broker = await client.db("soen_341").collection("brokers").insertOne({name: user.name, username: user.username, password: user.password});
    await deleteUser(client, user.username);
}

module.exports = {edit1HouseAllProperty, edit1House1Property, editMultipleHouse, editBroker, editHousePreference, upgradeToBroker};
