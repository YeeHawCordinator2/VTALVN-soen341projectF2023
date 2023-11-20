const express = require('express');
const {MongoClient, ObjectId} = require('mongodb');
const bodyParser = require('body-parser');
const path = require('path');
const cookieParser = require("cookie-parser");
const session = require('express-session');
const multer = require("multer");
const fs = require("fs");
const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, "project/uploads");
        },
        filename: (req, file, cb) => {
            cb(null, file.fieldname + '-' + Date.now());
        }
    }
);
const encode = require('nodejs-base64-encode');

const upload = multer({storage: storage});
const {
    get1Broker, get1User, get1Admin, getHouseGarage, getHouseLocation, getHousePriceLower, getHousePriceHigher,
    getHouseBathgreaterThan, getHouseBuildYRSGreater, getHouseBedgreaterThan, getHouseBuildType, getHouseFurnished,
    getHouseStories, getHouseextra, getHouseSizeOfPropGreater, getHouseListingType, readHouses,
    getHouseAfterDate,
    get1House
} = require("./project/model/database/getDB");
const {checkBroker, checkUser, checkAdmin, checkUsername} = require("./project/model/database/checkPassword");
const {addNewUser, addNewBroker, addNewHouse, addNewOffer} = require("./project/model/database/addBD");
const listingsRouter = require('./project/controller/listings');
const app = express();
const brkRouter = require('./project/controller/brokers');
const methodOverride = require('method-override')
const {editBroker, edit1HouseAllProperty} = require("./project/model/database/editDB");
const bcrypt = require("bcrypt");
const {checkPhone, checkPrice, checkName, checkEmails, checkDates} = require("./project/public/js/CheckForm");

app.use(bodyParser.json());
app.set('views-engine', 'ejs');
app.use(express.static(__dirname + '/project/views'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.urlencoded({extended: true}));
app.use(methodOverride('_method'));
app.use(cookieParser());

const uri = "mongodb+srv://naolal30:ConnectdatabasetoWebstorm100.@cluster0.ttfusik.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri);

try {
    client.connect();
    console.log("Connected to database");
} catch (e) {
    console.log("Error connecting to database");
}
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
const oneDay = 1000 * 60 * 60 * 24;
app.set('trust proxy', 1)
//session middleware
app.use(session({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized: true,
    cookie: {maxAge: oneDay},
    resave: false,
    // store: new MongoStore({ })
}));


app.post("/login", async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    if (await get1Admin(client, username) != null) {
        //user = await get1Admin(client, username);
        if (await checkAdmin(client, username, password) === true) {
            res.redirect("/login_successA")
            session.userid = username;
            session.type = "admin";
        } else res.redirect("/logins")
    } else if (await get1Broker(client, username) != null) {
        if (await checkBroker(client, username, password) === true) {
            session.userid = username;
            session.type = "broker";
            res.redirect("/login_successB")
        } else res.redirect("/logins")
    } else if (await get1User(client, username) != null) {
        if (await checkUser(client, username, password) === true) {
            res.redirect("/login_successU");
            session.userid = username;
            session.type = "user";
        } else res.redirect("/logins")
    } else res.redirect("/loginss");

});


app.post("/logout", (req, res) => {
    req.session.userid = undefined;
    req.session.type = undefined;
    req.session.destroy();
    res.redirect("/buy_rentU");
});

app.post("/register", async (req, res) => {
    const username = req.body.username;
    const name = req.body.name;
    const password = req.body.password;

    try {
        if (await checkUsername(client, username) === false) {
            await addNewUser(client, username, name, password);
            res.redirect("/login");
        } else
            res.redirect("/registerUserExist");
    } catch (e) {
        console.log("Error adding user");
        res.redirect("/register");
    }
});

app.post("/addBroker", async (req, res) => {
    const username = req.body.username;
    const name = req.body.name;
    const password = req.body.password;
    const agency = req.body.agency;
    const phone = req.body.phone;
    const email = req.body.email;
    const license = req.body.license;


    try {
        await addNewBroker(client, username, name, password, license, agency, email, phone);
        res.redirect("/ViewBrokers");
    } catch (e) {
        console.log("Error adding user");
        res.redirect("/addBroker");
    }
});
app.post("/editBroker", async (req, res) => {
    const username = req.body.username;
    const name = req.body.name;
    const password = req.body.password;
    const og = req.body.user_id;
    const agency = req.body.agency;
    const phone = req.body.phone;
    const email = req.body.email;
    const license = req.body.license;


    console.log(og);
    try {
        await editBroker(client, og, {
            name: name,
            username: username,
            password: await bcrypt.hash(password, 10),
            agency: agency,
            phone: phone,
            email: email,
            license: license
        });
        res.redirect("/ViewBrokers");
    } catch (e) {
        console.log("Error adding user");
        res.redirect("/editBroker");
    }
    console.log("edit broker");


});


app.post("/searchBroker", async (req, res) => {
    const username = req.body.username;
    let brokers = await client.db("soen_341").collection("brokers").find().toArray();
    let broker = [];
    let isEmpty = true;
    for (let i = 0; i < brokers.length; i++) {
        if (((brokers[i].name).toLowerCase()).includes(username.toLowerCase())) {
            broker.push(brokers[i]);
            isEmpty = false;
        }
    }

    let message = "";
    if (isEmpty === true) {
        message = "No results found";
        broker = await client.db("soen_341").collection("brokers").find().toArray();
    }
    res.render('../project/views/broker/searchBroker.ejs', {brokers: broker, message: message}); // opens localhost on index.html
});

app.post("/buy_rentU", async (req, res) => {
    let location = req.body.location.toLowerCase();
    let minPrice = req.body.minPrice;
    let maxPrice = req.body.maxPrice;
    let bath = req.body.bath;
    let beds = req.body.beds;
    let yearBuild = req.body.yearBuild;
    let floors = req.body.floors;
    let garage = req.body.garage;
    let prop = req.body.prop;
    let furnished = req.body.furnished;
    let extra = req.body.extra;
    let propsize = req.body.propsize;
    let listingType = req.body.listing;
    let time = req.body.time;

    arr = [];
    let arr11 = [];
    let isEmpty = false; // if is empty is true at the end whatever that was search was no good

    if (location !== "") {
        location = await getHouseLocation(client, location);
        if (location.length !== 0) {
            for (let i = 0; i < location.length; i++) {
                arr11.push(location[i]._id.toString());
            }
            arr.push(arr11);
            arr11 = [];
        } else if (isEmpty === true) isEmpty = true;
    }
    if (minPrice !== "") {
        minPrice = await getHousePriceHigher(client, parseInt(minPrice));
        if (minPrice.length !== 0) {
            for (let i = 0; i < minPrice.length; i++) {
                arr11.push(minPrice[i]._id.toString());
            }
            arr.push(arr11);
            arr11 = [];
        } else if (isEmpty === true) isEmpty = true;

    }
    if (maxPrice !== "") {
        maxPrice = await getHousePriceLower(client, parseInt(maxPrice));
        if (maxPrice.length !== 0) {

            for (let i = 0; i < maxPrice.length; i++) {
                arr11.push(maxPrice[i]._id.toString());
            }
            arr.push(arr11);
            arr11 = [];
        } else if (isEmpty === true) isEmpty = true;
    }
    if (bath !== "any") {
        bath = await getHouseBathgreaterThan(client, parseInt(bath));
        if (bath.length !== 0) {

            for (let i = 0; i < bath.length; i++) {
                arr11.push(bath[i]._id.toString());
            }
            arr.push(arr11);
            arr11 = [];

        }
    }
    if (beds !== "any") {
        beds = await getHouseBedgreaterThan(client, parseInt(beds));
        if (beds.length !== 0) {

            for (let i = 0; i < beds.length; i++) {
                arr11.push(beds[i]._id.toString());
            }
            arr.push(arr11);
            arr11 = [];

        }

    }
    if (yearBuild !== "") {
        yearBuild = await getHouseBuildYRSGreater(client, parseInt(yearBuild));
        if (yearBuild.length !== 0) {
            for (let i = 0; i < yearBuild.length; i++) {
                arr11.push(yearBuild[i]._id.toString());
            }
            arr.push(arr11);
            arr11 = [];
        } else if (isEmpty === true) isEmpty = true;

    }
    if (floors !== "any") {
        floors = await getHouseStories(client, parseInt(floors));

        if (floors.length !== 0) {
            for (let i = 0; i < floors.length; i++) {
                arr11.push(floors[i]._id.toString());
            }
            arr.push(arr11);
            arr11 = [];

        }

    }

    if (garage !== "any") {
        garage = await getHouseGarage(client, garage);
        if (garage.length !== 0) {
            for (let i = 0; i < garage.length; i++) {
                arr11.push(garage[i]._id.toString());
            }
            arr.push(arr11);
            arr11 = [];

        }

    }
    if (prop !== "any") {
        prop = await getHouseBuildType(client, prop);
        if (prop.length !== 0) {
            for (let i = 0; i < prop.length; i++) {
                arr11.push(prop[i]._id.toString());
            }
            arr.push(arr11);
            arr11 = [];

        }
    }
    if (furnished !== "any") {
        furnished = await getHouseFurnished(client, furnished);
        if (furnished.length !== 0) {
            for (let i = 0; i < furnished.length; i++) {
                arr11.push(furnished[i]._id.toString());
            }
            arr.push(arr11);
            arr11 = [];
        }

    }
    if (extra !== "any") {
        extra = await getHouseextra(client, extra);
        if (extra.length !== 0) {
            for (let i = 0; i < extra.length; i++) {
                arr11.push(extra[i]._id.toString());
            }
            arr.push(arr11);
            arr11 = [];
        }
    }
    if (propsize !== "") {
        propsize = await getHouseSizeOfPropGreater(client, propsize);
        if (propsize.length !== 0) {
            for (let i = 0; i < propsize.length; i++) {
                arr11.push(propsize[i]._id.toString());
            }
            arr.push(arr11);
            arr11 = [];
        } else if (isEmpty === true) isEmpty = true;

    }
    if (listingType !== "any") {
        listingType = await getHouseListingType(client, listingType);
        if (listingType.length !== 0) {

            for (let i = 0; i < listingType.length; i++) {
                arr11.push(listingType[i]._id.toString());
            }
            arr.push(arr11);
            arr11 = [];
        }
    }
    if (time !== "") { //CHECK
        time = await getHouseAfterDate(client, new Date(time));
        if (time.length !== 0) {
            for (let i = 0; i < time.length; i++) {
                arr11.push(time[i]._id.toString());
            }
            arr.push(arr11);
            arr11 = [];
        } else if (isEmpty === true) isEmpty = true;

    }

    let holdArr = [];
    if (arr.length === 0) {
        isEmpty = true;
        holdArr = await readHouses(client);
        for (let i = 0; i < holdArr.length; i++) {
            arr11.push(holdArr[i]._id.toString());
        }
        arr.push(arr11);
    }

    let newArr = arr.reduce((x, y) => x.filter((z) => y.includes(z)));


    console.log(newArr);

    let houseArr = [];
    if (newArr.length === 0) {
        isEmpty = true;
        houseArr = await client.db("soen_341").collection("houses").find().toArray();

    } else {
        for (let i = 0; i < newArr.length; i++) {
            houseArr.push(await client.db("soen_341").collection("houses").findOne({_id: new ObjectId(newArr[i])}));
        }
    }

    //  const houses = await client.db("soen_341").collection("houses").find().toArray();
    const pics = await client.db("soen_341").collection("house_pic").find().toArray();
    for (let i = 0; i < houseArr.length; i++) {
        for (let j = 0; j < pics.length; j++) {
            if (houseArr[i].image_id.toString() === pics[j]._id.toString())
                houseArr[i].image = pics[j].file;
        }
    }

    let message = "";
    if (isEmpty === true) message = "No results found";

    res.render('../project/views/listings/buy_rentU.ejs', {houses: houseArr, message: message}); // opens localhost on index.html
});
app.post("/buy_rentB", async (req, res) => {
    let location = req.body.location.toLowerCase();
    let minPrice = req.body.minPrice;
    let maxPrice = req.body.maxPrice;
    let bath = req.body.bath;
    let beds = req.body.beds;
    let yearBuild = req.body.yearBuild;
    let floors = req.body.floors;
    let garage = req.body.garage;
    let prop = req.body.prop;
    let furnished = req.body.furnished;
    let extra = req.body.extra;
    let propsize = req.body.propsize;
    let listingType = req.body.listing;
    let time = req.body.time;

    arr = [];
    let arr11 = [];
    let isEmpty = false; // if is empty is true at the end whatever that was search was no good

    if (location !== "") {
        location = await getHouseLocation(client, location);
        if (location.length !== 0) {
            for (let i = 0; i < location.length; i++) {
                arr11.push(location[i]._id.toString());
            }
            arr.push(arr11);
            arr11 = [];
        } else if (isEmpty === true) isEmpty = true;
    }
    if (minPrice !== "") {
        minPrice = await getHousePriceHigher(client, parseInt(minPrice));
        if (minPrice.length !== 0) {
            for (let i = 0; i < minPrice.length; i++) {
                arr11.push(minPrice[i]._id.toString());
            }
            arr.push(arr11);
            arr11 = [];
        } else if (isEmpty === true) isEmpty = true;

    }
    if (maxPrice !== "") {
        maxPrice = await getHousePriceLower(client, parseInt(maxPrice));
        if (maxPrice.length !== 0) {

            for (let i = 0; i < maxPrice.length; i++) {
                arr11.push(maxPrice[i]._id.toString());
            }
            arr.push(arr11);
            arr11 = [];
        } else if (isEmpty === true) isEmpty = true;

    }
    if (bath !== "any") {
        bath = await getHouseBathgreaterThan(client, parseInt(bath));
        if (bath.length !== 0) {

            for (let i = 0; i < bath.length; i++) {
                arr11.push(bath[i]._id.toString());
            }
            arr.push(arr11);
            arr11 = [];

        }

    }
    if (beds !== "any") {
        beds = await getHouseBedgreaterThan(client, parseInt(beds));
        if (beds.length !== 0) {

            for (let i = 0; i < beds.length; i++) {
                arr11.push(beds[i]._id.toString());
            }
            arr.push(arr11);
            arr11 = [];

        }

    }
    if (yearBuild !== "") {
        yearBuild = await getHouseBuildYRSGreater(client, parseInt(yearBuild));
        if (yearBuild.length !== 0) {
            for (let i = 0; i < yearBuild.length; i++) {
                arr11.push(yearBuild[i]._id.toString());
            }
            arr.push(arr11);
            arr11 = [];
        } else if (isEmpty === true) isEmpty = true;

    }
    if (floors !== "any") {
        floors = await getHouseStories(client, parseInt(floors));

        if (floors.length !== 0) {
            for (let i = 0; i < floors.length; i++) {
                arr11.push(floors[i]._id.toString());
            }
            arr.push(arr11);
            arr11 = [];

        }

    }

    if (garage !== "any") {
        garage = await getHouseGarage(client, garage);
        if (garage.length !== 0) {
            for (let i = 0; i < garage.length; i++) {
                arr11.push(garage[i]._id.toString());
            }
            arr.push(arr11);
            arr11 = [];

        }

    }
    if (prop !== "any") {
        prop = await getHouseBuildType(client, prop);
        if (prop.length !== 0) {
            for (let i = 0; i < prop.length; i++) {
                arr11.push(prop[i]._id.toString());
            }
            arr.push(arr11);
            arr11 = [];

        }

    }
    if (furnished !== "any") {
        furnished = await getHouseFurnished(client, furnished);
        if (furnished.length !== 0) {
            for (let i = 0; i < furnished.length; i++) {
                arr11.push(furnished[i]._id.toString());
            }
            arr.push(arr11);
            arr11 = [];
        }

    }
    if (extra !== "any") {
        extra = await getHouseextra(client, extra);
        if (extra.length !== 0) {
            for (let i = 0; i < extra.length; i++) {
                arr11.push(extra[i]._id.toString());
            }
            arr.push(arr11);
            arr11 = [];
        }

    }
    if (propsize !== "") {
        propsize = await getHouseSizeOfPropGreater(client, propsize);
        if (propsize.length !== 0) {
            for (let i = 0; i < propsize.length; i++) {
                arr11.push(propsize[i]._id.toString());
            }
            arr.push(arr11);
            arr11 = [];
        } else if (isEmpty === true) isEmpty = true;

    }
    if (listingType !== "any") {
        listingType = await getHouseListingType(client, listingType);
        if (listingType.length !== 0) {

            for (let i = 0; i < listingType.length; i++) {
                arr11.push(listingType[i]._id.toString());
            }
            arr.push(arr11);
            arr11 = [];
        }

    }
    if (time !== "") { //CHECK
        time = await getHouseAfterDate(client, new Date(time));
        if (time.length !== 0) {
            for (let i = 0; i < time.length; i++) {
                arr11.push(time[i]._id.toString());
            }
            arr.push(arr11);
            arr11 = [];
        } else if (isEmpty === true) isEmpty = true;

    }


    let holdArr = [];
    if (arr.length === 0) {
        isEmpty = true;
        holdArr = await readHouses(client);
        for (let i = 0; i < holdArr.length; i++) {
            arr11.push(holdArr[i]._id.toString());
        }
        arr.push(arr11);
    }

    let newArr = arr.reduce((x, y) => x.filter((z) => y.includes(z)));


    console.log(newArr);

    let houseArr = [];
    for (let i = 0; i < newArr.length; i++) {
        houseArr.push(await client.db("soen_341").collection("houses").findOne({_id: new ObjectId(newArr[i])}));
    }

    //  const houses = await client.db("soen_341").collection("houses").find().toArray();
    const pics = await client.db("soen_341").collection("house_pic").find().toArray();
    for (let i = 0; i < houseArr.length; i++) {
        for (let j = 0; j < pics.length; j++) {
            if (houseArr[i].image_id.toString() === pics[j]._id.toString())
                houseArr[i].image = pics[j].file;
        }
    }

    let message = "";
    if (isEmpty === true) message = "No results found";


    res.render('../project/views/listings/buy_rentB.ejs', {houses: houseArr, message: message}); // opens localhost on index.html
});

app.post("/newListings", upload.single("picpic"), async (req, res) => {

    const name = req.body.name;
    const price = req.body.price;
    const location = req.body.location;
    const numOfBed = req.body.numOfBed;
    const numOfBath = req.body.numOfBath;
    const furnished = req.body.furnished;
    const buildYRS = req.body.buildYRS;
    const extra = req.body.extra;
    const buildType = req.body.buildType;
    const stories = req.body.stories;
    const clName = req.body.clName;
    const brkName = req.body.brkName;
    const sizeOfProp = req.body.sizeOfProp;
    const garage = req.body.garage;
    const listingType = req.body.listingType;
    const piclink = fs.readFileSync(path.join(__dirname + '/project/uploads/' + req.file.filename));
    const base64data = encode.encode(piclink, 'base64');
    const pic = "data:image/jpeg;base64," + base64data;


    try {
        const message = await addNewHouse(client, name, price, location, numOfBed, numOfBath, furnished, buildYRS, extra, buildType, stories, clName, brkName, sizeOfProp, garage, listingType, pic);
        if (message === 1)
            res.redirect("/myListings");
        else
            res.redirect("/newListingsFail")

    } catch (e) {
        console.log(e)
        console.log("Error adding house");
        res.redirect("/newListingsFail");
    }
});
app.post("/editListingss", async (req, res) => {

    const name = req.body.name;
    const price = req.body.price;
    const location = req.body.location;
    const numOfBed = req.body.numOfBed;
    const numOfBath = req.body.numOfBath;
    const furnished = req.body.furnished;
    const buildYRS = req.body.buildYRS;
    const extra = req.body.extra;
    const buildType = req.body.buildType;
    const stories = req.body.stories;
    const clName = req.body.clName;
    const brkName = req.body.brkName;
    const sizeOfProp = req.body.sizeOfProp;
    const garage = req.body.garage;
    const listingType = req.body.listingType;
    const piclink = req.body.piclink;
    const og = req.body.house_id;

    try {
        res.redirect("/myListings");
    } catch (e) {
        console.log("Error editing house");
        res.redirect("/editListings");
    }


});
app.post('/offerSubmit', async (req, res) => {
    let message = "";

    const price = req.body.price;
    let house_id = req.body.name;
    const occupancy_date = req.body.occupancy_date;
    const deed_date = req.body.deed_date;
    const user_adress = req.body.Uadress;
    const user_email = req.body.Uemail;
    const user_name = req.body.Uname;
    const user_phone = req.body.Uphone;
    const houses = await client.db("soen_341").collection("houses").find().toArray();
    const pics = await client.db("soen_341").collection("house_pic").find().toArray();
    for (let i = 0; i < houses.length; i++) {
        for (let j = 0; j < pics.length; j++) {
            if (houses[i].image_id.toString() === pics[j]._id.toString())
                houses[i].image = pics[j].file;
        }
    }

    if (checkPhone(user_phone) === false) {
        message = "Invalid phone number";
        res.render('../project/views/listings/buy_rentB.ejs', {houses: houses, message: message});
    }
    if (checkPrice(price) === false) {
        message = "Invalid price";
        res.render('../project/views/listings/buy_rentB.ejs', {houses: houses, message: message});
    }
    if (checkName(user_name) === false) {
        message = "Invalid name";
        res.render('../project/views/listings/buy_rentB.ejs', {houses: houses, message: message});
    }
    if (checkEmails(user_email) === false) {
        message = "Invalid email";
        res.render('../project/views/listings/buy_rentB.ejs', {houses: houses, message: message});
    }
    if (checkDates(deed_date) === false) {
        message = "Invalid deed date";
        res.render('../project/views/listings/buy_rentB.ejs', {houses: houses, message: message});
    }

    try {
        await addNewOffer(client, user_name, user_adress, user_email, price, house_id, deed_date, occupancy_date);
        res.redirect("/buy_rentB");
    } catch (e) {
        console.log("Error");
        res.redirect("/offerListing");
    }
});
app.post('/request', async (req, res) => {

    const houses = await client.db("soen_341").collection("houses").find().toArray();
    const pics = await client.db("soen_341").collection("house_pic").find().toArray();
    for (let i = 0; i < houses.length; i++) {
        for (let j = 0; j < pics.length; j++) {
            if (houses[i].image_id.toString() === pics[j]._id.toString())
                houses[i].image = pics[j].file;
        }
    }
    let message = "";

    res.render('../project/views/listings/buy_rentU.ejs', {houses: houses, message: message}); // opens localhost on index.html
});
app.post('/compare', async (req, res) => {
    const prop1 = req.body.first;
    const prop2 = req.body.second;
    const house1 = await client.db("soen_341").collection("houses").findOne({name:prop1});
    const house2 = await client.db("soen_341").collection("houses").findOne({name:prop2});
    const user = await client.db("soen_341").collection("houses").find().toArray();



    res.render('../project/views/compareProp.ejs', {props: user, prop1: house1, prop2: house2}); // opens localhost on index.html
});
app.get('/', async (req, res) => {
    const houses = await client.db("soen_341").collection("houses").find().toArray();

    const pics = await client.db("soen_341").collection("house_pic").find().toArray();
    for (let i = 0; i < houses.length; i++) {
        for (let j = 0; j < pics.length; j++) {
            if (houses[i].image_id.toString() === pics[j]._id.toString())
                houses[i].image = pics[j].file;
        }
    }
    let message = "";
    res.render('../project/views/listings/buy_rentU.ejs', {houses: houses, message: message});

});
app.get('/login', (req, res) => {
    res.render('../project/views/login.ejs'); // opens localhost on index.html
});
app.get('/logins', (req, res) => {
    res.render('../project/views/login_WRONGPASS.ejs'); // opens localhost on index.html
});
app.get('/loginss', (req, res) => {
    res.render('../project/views/login_WRONGUSER.ejs'); // opens localhost on index.html
});
app.get('/register', (req, res) => {
    res.render('../project/views/register.ejs'); // opens localhost on index.html
});
app.get('/registerUserExist', (req, res) => {
    res.render('../project/views/registerUserExist.ejs'); // opens localhost on index.html
});

app.get('/buy_rentU', async (req, res) => {
    const houses = await client.db("soen_341").collection("houses").find().toArray();
    const pics = await client.db("soen_341").collection("house_pic").find().toArray();
    for (let i = 0; i < houses.length; i++) {
        for (let j = 0; j < pics.length; j++) {
            if (houses[i].image_id.toString() === pics[j]._id.toString())
                houses[i].image = pics[j].file;
        }
    }
    let message = "";

    res.render('../project/views/listings/buy_rentU.ejs', {houses: houses, message: message}); // opens localhost on index.html
});
app.get('/buy_rentB', async (req, res) => {
    const houses = await client.db("soen_341").collection("houses").find().toArray();
    const pics = await client.db("soen_341").collection("house_pic").find().toArray();
    for (let i = 0; i < houses.length; i++) {
        for (let j = 0; j < pics.length; j++) {
            if (houses[i].image_id.toString() === pics[j]._id.toString())
                houses[i].image = pics[j].file;
        }
    }
    let message = "";

    res.render('../project/views/listings/buy_rentB.ejs', {houses: houses, message: message}); // opens localhost on index.html

});

app.get('/calendarU', (req, res) => {
    res.render('../project/views/calendarU.ejs');
});
app.get('/calendarB', (req, res) => {
    res.render('../project/views/calendarB.ejs');
});
app.get('/fillerA', (req, res) => {
    res.render('../project/views/fillerA.ejs');
});
app.get('/fillerB', (req, res) => {
    res.render('../project/views/fillerB.ejs');
});
app.get('/fillerU', (req, res) => {
    res.render('../project/views/fillerU.ejs');
});
app.get('/login_successB', (req, res) => {
    res.render('../project/views/login_successB.ejs');
});
app.get('/login_successU', (req, res) => {
    res.render('../project/views/login_successU.ejs');
});
app.get('/login_successA', (req, res) => {
    res.render('../project/views/login_successA.ejs');
});
app.get('/ViewBrokers', async (req, res) => {
    const brokers = await client.db("soen_341").collection("brokers").find().toArray();

    res.render('../project/views/broker/ViewBrokers.ejs', {brokers: brokers});
});
app.get('/addBroker', (req, res) => {
    res.render('../project/views/broker/addBroker.ejs');
});
app.get('/editBroker', (req, res) => {
    res.render('../project/views/broker/editBroker.ejs');
});

//connects to server
app.get('/myListings', async (req, res) => {

    const houses = await client.db("soen_341").collection("houses").find().toArray();
    const pics = await client.db("soen_341").collection("house_pic").find().toArray();
    for (let i = 0; i < houses.length; i++) {
        for (let j = 0; j < pics.length; j++) {
            if (houses[i].image_id.toString() === pics[j]._id.toString())
                houses[i].image = pics[j].file;
        }
    }

    //NEEDS .EJS EXTENSION, ELSE IT THROWS NO EXTENSION ERROR
    res.render('../project/views/listings/myListings.ejs', {houses: houses});
});

//connects to server
app.get('/newListings', (req, res) => {
    res.render('../project/views/listings/newListings.ejs',);
});
app.get('/newListingsFail', (req, res) => {
    res.render('../project/views/listings/newListingsFail.ejs',);
});
app.get('/editListings', (req, res) => {
    res.render('../project/views/listings/editListings.ejs');
});

app.get('/showU.ejs', async (req, res) => {

    res.render('../project/views/listings/showU.ejs');
});

app.get('/requestU.ejs', async (req, res) => {
    res.render('../project/views/listings/requestU.ejs');
});

app.get('/showB.ejs', async (req, res) => {

    res.render('../project/views/listings/showB.ejs');
});

app.get('/requestB.ejs', async (req, res) => {
    res.render('../project/views/listings/requestB.ejs');
});
app.get('/offerListing.ejs', async (req, res) => {
    res.render('../project/views/listings/offerListing.ejs', {message: ""});
});
app.get('/showOffers', async (req, res) => {

    const offers = await client.db("soen_341").collection("offers").find().toArray(); //works
    // const houses = await get1House(client, offers[0].house_name); //works
    // console.log(houses);
    for (let i = 0; i < offers.length; i++) {
        const houses = await get1House(client, offers[i].house_name);
        console.log(houses);
    }
    res.render('../project/views/listings/showOffers.ejs', {offers: offers});
})
app.get('/searchBroker', async (req, res) => {
    const broker = await client.db("soen_341").collection("brokers").find().toArray();
    res.render('../project/views/broker/searchBroker.ejs', {brokers: broker, message: ""});
});
app.get('/showBroker.ejs', async (req, res) => {
    res.render('../project/views/broker/showBroker.ejs');
});

app.get('/brokerListings.ejs', async (req, res) => {
    res.render('../project/views/broker/brokerListings.ejs');
});
app.get('/editMyInfoA', async (req, res) => {
    if (session.userid === undefined || session.type !== "admin") {
        res.redirect("/login");
    } else {
        const admin = await client.db("soen_341").collection("system_admin").findOne({username: session.userid});
        res.render('../project/views/editMyInfoA.ejs', {admin: admin});
    }
});
app.get('/editMyInfoB', async (req, res) => {
    if (session.userid === undefined || session.type !== "broker") {
        res.redirect("/login");
    } else {
        const broker = await client.db("soen_341").collection("brokers").findOne({username: session.userid});
        console.log(broker.license);
        res.render('../project/views/editMyInfoB.ejs', {broker: broker});

    }
});

app.get('/compareProp', async (req, res) => {

        const user = await client.db("soen_341").collection("houses").find({}).toArray();
        res.render('../project/views/compareProp.ejs', {props: user, prop1: null, prop2: null});
});

//controller
app.use('/listings', listingsRouter);
app.use('/broker', brkRouter);

//server
app.listen(3000);
console.log("Server listening on port 3000");





