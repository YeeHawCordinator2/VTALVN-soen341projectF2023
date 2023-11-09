// add to database


const {getUserID, getBrokerID} = require("./getDB");
const bcrypt = require("bcrypt");

async function addNewHouse(client, listingName, price, location, numOfBed, numOfBath, furnished, buildYRS, extra, buildType, stories, clName, brkName, sizeOfProp, garage, listingType, piclink){
    try {

        const user = (await client.db("soen_341").collection("users").findOne({username: clName}))._id;
        const brokers = (await client.db("soen_341").collection("brokers").findOne({username: brkName}))._id;


        const image = await client.db("soen_341").collection("house_pic").insertOne({
            file: piclink
        });
        const house = await client.db("soen_341").collection("houses").insertOne({
            name: listingName,
            image_id: image.insertedId,
            price: price,
            location: location,
            numOfBath: numOfBath,
            numOfBed: numOfBed,
            furnished: furnished,
            buildYRS: buildYRS,
            extra: extra, // heating, pool, gym, ect.
            buildType: buildType,
            stories: stories,
            sizeOfProp: sizeOfProp,
            garage: garage,
            listingType: listingType,
            listingDate: new Date(),
            seller: user,
            broker: brokers
        });

        console.log(`New house listing created with the following id: ${house.insertedId}`);
        return 1;
    }catch(e){
        console.log(e);
        console.log("error - add house");
        return 0;
    }

}

async function addNewBroker(client, username, name, password, license, agency, email, phone){  //encrypt user n pass
    try{

     await client.db("soen_341").collection("brokers").insertOne({
        name: name,
        username: username,
        password: await bcrypt.hash(password, 10),
        agency: agency,
        license: license,
        email: email,
        phone: phone
    });}
    catch(e){
        console.log("error - add broker");
    }
}

async function addNewUser(client, username, name, password){ //encrypt user n pass
   try {
       const user = await client.db("soen_341").collection("users").insertOne({
           name: name,
           username: username,
           password: await bcrypt.hash(password, 10)
       });
       return await client.db("soen_341").collection("user_preference").insertOne({
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
   }catch(e){
         console.log("error - add user");
   }

    // will create user preferences but it will all be null for now
}

async function addNewAdmin(client, username, name, password){ //encrypt user n pass
    try {
        return await client.db("soen_341").collection("system_admin").insertOne({
            name: name,
            username: username,
            password: await bcrypt.hash(password, 10)
        });
    }catch(e){
        console.log("error - add admin");
    }
}


async function addNewOffer(client, Uname, Uadress, Uemail, price, houseId, deed_date, occDate){
    try {
        
        await client.db("soen_341").collection("offers").insertOne({
            user_id: Uname,
            address: Uadress,
            email: Uemail,
            price: price,
            house_name: houseId,
            deed_date: deed_date,
            occDate: occDate
            
        });
        console.log("Offer successfully popped out")
    }catch(e){
        console.log("error - add offer");
    }
}
module.exports = { addNewHouse, addNewBroker, addNewUser, addNewAdmin, addNewOffer};
