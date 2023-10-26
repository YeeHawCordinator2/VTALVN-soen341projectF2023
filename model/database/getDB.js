
async function getHouseImage(client, listingName) {
    try {
        const imageid = await client.db("soen_341").collection("houses").findOne({name: listingName});
        return await client.db("soen_341").collection("house_pic").findOne({house_id: imageid});
    } catch (e) {
        return void 0;
    }
}


//read fcts - user aggregate and pipeline
async function readHouses(client){
    return await client.db("soen_341").collection("houses").find({}).toArray();
}
async function readBrokers(client){
    return await client.db("soen_341").collection("brokers").find().toArray()
}
async function get1House(client, listingname){
    return await client.db("soen_341").collection("houses").findOne({name:listingname})
}
async function get1Broker(client, brokername){
    return await client.db("soen_341").collection("brokers").findOne({username:brokername})
}
async function get1User(client, username){
    return await client.db("soen_341").collection("users").findOne({username:username});
}
async function get1Admin(client, username) {
    return await client.db("soen_341").collection("system_admin").findOne({username:username})
}

async function getHouseSeller(client, Listingname){
    const result= await client.db("soen_341").collection("houses").findOne({name:Listingname});
    return result.seller;
}
async function getHouseBroker(client, Listingname){
    const result= await client.db("soen_341").collection("houses").findOne({name:Listingname});
    return result.broker;
}
async function getHousePreferences(client, username){
    try {
        const user = await client.db("soen_341").collection("users").findOne({username: username});
        return await client.db("soen_341").collection("user_preference").findOne({user_id: user._id});
    }catch (e) {
        console.log("user not found");
    }
} //from user

async function getHousesBy1Broker(client, username){
    const broker = await client.db("soen_341").collection("brokers").findOne({username: username});
    return client.db("soen_341").collection("brokers").aggregate( [{$match: { $expr: { broker: broker._id }}}] );
}

async function getHousePriceLower(client, price){
    return await client.db("soen_341").collection("houses").find({ price : { $lt : price }}).toArray();
}
async function getHousePriceHigher(client, price){
    return await client.db("soen_341").collection("houses").find( {price: {$gt: price}}).toArray();
}
async function getHouseBeforeDate(client, date){
    return await client.db("soen_341").collection("houses").find( {listingDate: {$lte: date}});
}
async function getHouseAfterDate(client, date){
    return await client.db("soen_341").collection("houses").find( {listingDate: {$gte: date}}).toArray();
}
async function getHouseLocation(client, location){
    return await client.db("soen_341").collection("houses").find( {location: location}).toArray();
}
async function getHouseBathgreaterThan(client, numOfBath){
    return await client.db("soen_341").collection("houses").find( {numOfBath: {$gte: numOfBath}}).toArray();
}
async function getHouseBedgreaterThan(client, numOfBed){
   return await client.db("soen_341").collection("houses").find( {numOfBed: {$gte: numOfBed}}).toArray();
}
async function getHouseFurnished(client, furnished){
    return await client.db("soen_341").collection("houses").find( {furnished: furnished}).toArray();
}
async function getHouseBuildYRSGreater(client, buildYRS){
    return await client.db("soen_341").collection("houses").find( {buildYRS: {$gte: buildYRS}}).toArray();
}
async function getHouseBuildType(client, buildType){
    return await client.db("soen_341").collection("houses").find( {buildType: buildType}).toArray();
}
async function getHouseStories(client, stories){
    return await client.db("soen_341").collection("houses").find( {stories:{$gte: stories}}).toArray();
}
async function getHouseSizeOfPropGreater(client, sizeOfProp){
    return await client.db("soen_341").collection("houses").find( {sizeOfProp: {$gte: sizeOfProp}}).toArray();
}
async function getHouseSizeOfPropLess(client, sizeOfProp){
    return await client.db("soen_341").collection("houses").find( {sizeOfProp: {$lte: sizeOfProp}}).toArray();
}
async function getHouseGarage(client, garage){
    return await client.db("soen_341").collection("houses").find( {garage: garage}).toArray();
}
async function getHouseListingType(client, listingType){
    return await client.db("soen_341").collection("houses").find( {listingType: listingType}).toArray();
}
async function getHouseextra(client, extra){
    return await client.db("soen_341").collection("houses").find( {extra: extra}).toArray();
}



module.exports = {  getHouseextra, get1Admin, get1Broker, get1User, getHousesBy1Broker, readHouses, get1House, getHouseSeller,getHouseBroker , getHousePreferences, readBrokers, getHouseImage, getHouseLocation, getHousePriceLower, getHousePriceHigher, getHouseBeforeDate, getHouseAfterDate, getHouseBathgreaterThan, getHouseBedgreaterThan, getHouseFurnished, getHouseBuildYRSGreater, getHouseBuildType, getHouseStories, getHouseSizeOfPropGreater, getHouseSizeOfPropLess, getHouseGarage, getHouseListingType};
