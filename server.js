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
const {returnHouse} = require("./project/controller/serverListing");
const {get1Broker, get1User, get1Admin,get1House} = require("./project/model/database/getDB");
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
app.use(session({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized: true,
    cookie: {maxAge: oneDay},
    resave: false,
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
        edit1HouseAllProperty(client, og, {
            name: name,
            image_id: new ObjectId(piclink),
            price: price,
            location: location,
            numOfBath: numOfBath,
            numOfBed: numOfBed,
            furnished: furnished,
            buildYRS: buildYRS,
            extra: extra,
            buildType: buildType,
            stories: stories,
            sizeOfProp: sizeOfProp,
            garage: garage,
            listingType: listingType,
            listingDate: new Date(),
            seller: (await client.db("soen_341").collection("users").findOne({username: clName}))._id,
            broker: (await client.db("soen_341").collection("brokers").findOne({username: brkName}))._id
        })
        res.redirect("/myListings");
    } catch (e) {
        console.log("Error editing house");
        res.redirect("/myListings");
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
    const houses =  await returnHouse(client);
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
    const houses =  await returnHouse(client);
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
    const houses =  await returnHouse(client);
    let message = "";

    res.render('../project/views/listings/buy_rentU.ejs', {houses: houses, message: message}); // opens localhost on index.html
});
app.get('/buy_rentB', async (req, res) => {
    const houses =  await returnHouse(client);
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
    const houses = await returnHouse(client)
    res.render('../project/views/listings/myListings.ejs', {houses: houses});
});

//connects to server
app.get('/newListings', (req, res) => {
    res.render('../project/views/listings/newListings.ejs',);
});
app.get('/newListingsFail', (req, res) => {
    res.render('../project/views/listings/newListingsFail.ejs',);
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

app.get('/mortgageCalculator', async (req, res) => {
    res.render('../project/views/mortgageCalculator.ejs');
});

//controller
app.use('/listings', listingsRouter);
app.use('/broker', brkRouter);

//server
app.listen(3000);
console.log("Server listening on port 3000");





