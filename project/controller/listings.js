const express = require('express');
const {get1Broker, get1House} = require("../model/database/getDB");
const {MongoClient} = require("mongodb");
const {deleteHouse} = require("../model/database/deleteDB");
const {deleteOffer} = require("../model/database/deleteDB");
const bodyParser = require("body-parser");
const router  = express.Router();

const app = express();
app.use(bodyParser.json());

app.set('poop-engine', 'ejs');
app.use(express.static(__dirname+'/poop'));
app.use(bodyParser.urlencoded({
    extended: true
}));


const uri = "mongodb+srv://naolal30:ConnectdatabasetoWebstorm100.@cluster0.ttfusik.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri);

try{
    client.connect();
    console.log("Connected to database");
}   catch (e) {
    console.log("Error connecting to database");
}

router.get('/requestU/:id', async (req, res) => {
    const houses = await get1House(client, req.params.id);
    res.render('../project/views/listings/requestU.ejs', {houses: houses})
});

router.get('/showU/:id', async (req, res) => {
    const houses = await get1House(client, req.params.id);
    const pics= await client.db("soen_341").collection("house_pic").findOne({_id: houses.image_id});
    houses.image=pics.file;
    res.render('../project/views/listings/showU.ejs', {houses: houses})
})


router.get('/requestB/:id', async (req, res) => {
    const houses = await get1House(client, req.params.id);
    res.render('../project/views/listings/requestB.ejs', {houses: houses})
});

router.get('/showB/:id', async (req, res) => {
    const houses = await get1House(client, req.params.id);
    const pics= await client.db("soen_341").collection("house_pic").findOne({_id: houses.image_id});
    houses.image=pics.file;
    res.render('../project/views/listings/showB.ejs', {houses: houses})
})



router.get('/edit/:id', async (req, res) => {
    const houses = await get1House(client,  req.params.id);
    const broker = await client.db("soen_341").collection("brokers").findOne({_id: houses.broker});
    const user = await client.db("soen_341").collection("users").findOne({_id: houses.seller});
    //console.log(await get1Broker(client, houses[0].broker));
    houses.brk = broker.username;
    houses.seller = user.username;

    res.render('../project/views/listings/editListings.ejs', {houses: houses})
})

router.get('/offer/:id', async (req, res) => {
    const houses = await get1House(client,  req.params.id);
    const broker = await client.db("soen_341").collection("brokers").findOne({_id: houses.broker});
    //console.log(await get1Broker(client, houses[0].broker));
    
    res.render('../project/views/listings/offerListing.ejs', {houses: houses, brokers:broker, message: ""})
})
router.get('/showOffers/:id', async (req, res) => {
    const houses = await get1House(client, req.params.id);
    const offers = await client.db("soen_341").collection("offers").find().toArray();
    const pics= await client.db("soen_341").collection("house_pic").findOne({_id: houses.image_id});
    houses.image=pics.file;
    res.render('../project/views/listings/showOffers.ejs', {houses: houses, offers: offers, message: ""})
})

router.delete('/delete/:id', async (req, res) => {
    await deleteOffer(client, req.params.id);
    res.redirect('/showOffers')
})

router.delete('/:id', async (req, res) => {
    await deleteHouse(client, req.params.id);
    res.redirect('/myListings')
})


module.exports = router;