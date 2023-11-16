const express = require('express')
const {get1Broker, get1House} = require("../model/database/getDB");
const {MongoClient, ObjectId} = require("mongodb");
const {deleteBroker} = require("../model/database/deleteDB");
const bodyParser = require("body-parser");
const router = express.Router()
const app = express();
app.use(bodyParser.json());

app.set('poop-engine', 'ejs');
app.use(express.static(__dirname+'/poop'));
app.use(bodyParser.urlencoded({
    extended: true
})); //



const uri = "mongodb+srv://naolal30:ConnectdatabasetoWebstorm100.@cluster0.ttfusik.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri);

try{
    client.connect();
    console.log("Connected to database");
}   catch (e) {
    console.log("Error connecting to database");
}


//Not for creating new brokers, this function takes REGISTERED brokers and 'gets' them from the database
router.get('/edit/:id', async (req, res) => {
    const broker = await get1Broker(client, req.params.id);
//console.log(broker.name)
    res.render('../project/views/broker/editBroker.ejs', {broker: broker})
//res.send("patoe")

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



module.exports = router