const express = require('express')
const {get1Broker, get1House} = require("../model/database/getDB");
const {MongoClient, ObjectId} = require("mongodb");
const {deleteBroker} = require("../model/database/deleteDB");
const bodyParser = require("body-parser");
const {addNewBroker} = require("../model/database/addBD");
const router = express.Router()
const app = express();
app.use(bodyParser.json());

const uri = "mongodb+srv://naolal30:ConnectdatabasetoWebstorm100.@cluster0.ttfusik.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri);

try{
    client.connect();
    console.log("Connected to database");
}   catch (e) {
    console.log("Error connecting to database");
}

router.get('/edit/:id', async (req, res) => {
    const broker = await get1Broker(client, req.params.id);
    res.render('../project/views/broker/editBroker.ejs', {broker: broker})
})

router.get('/show/:id', async (req, res) => {
    const broker = await get1Broker(client, req.params.id);
    res.render('../project/views/broker/showBroker.ejs', {broker: broker})
    
})

router.get('/brokerListings/:id', async (req, res) => {
    
    const houses = await client.db("soen_341").collection("houses").find({broker: new ObjectId(req.params.id)}).toArray();
    res.render('../project/views/broker/brokerListings.ejs', {houses: houses})
});

router.delete('/:id', async (req, res) => {
    await deleteBroker(client, req.params.id);
    res.redirect('/ViewBrokers')
})


router.post("/addBroker", async (req, res) => {
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



module.exports = router