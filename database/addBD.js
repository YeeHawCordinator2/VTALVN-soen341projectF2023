// add to database


async function addNewHouse(client, listingName, price, location, seller, broker, numOfBed, numOfBath, furnished, buildYRS, extra, type, buildType, stories, photo, clName, brkName, sizeOfProp, garage, listingType){
    const user= await getUserID(client, clName);  // maybe fine seller id
    const brokers= await getBrokerID(client, brkName);

    const house = await client.db("soen_341").collection("houses").insertOne({
        name: listingName,
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
        seller: user,
        broker: brokers
    });

    console.log(`New house listing created with the following id: ${house.insertedId}`);

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
        pricelow: "NA",
        pricehigh: "NA",
        location: "NA",
        numOfBath: "NA",
        numOfBed: "NA",
        furnished: "NA",
        extra: "NA", // heating, pool, gym, ect.
        buildType: "NA",
        stories: "NA",
        sizeOfProp: "NA",
        garage: "NA",
        listingType: "NA",
    });

    // will create user preferences but it will all be null for now
}

async function addNewAdmin(client, username, name, password){ //encrypt user n pass
    const admin = await client.db("soen_341").collection("system_admin").insertOne({
        name: name,
        username: username,
        password: bcrypt.hash(password, 10)
    });
}
module.exports = { addNewHouse, addNewBroker, addNewUser, addNewAdmin};
