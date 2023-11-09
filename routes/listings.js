const express = require('express');
const {get1Broker, get1House} = require("../model/database/getDB");
const {MongoClient} = require("mongodb");
const {deleteHouse} = require("../model/database/deleteDB");
const bodyParser = require("body-parser");
const router  = express.Router();

const app = express();
app.use(bodyParser.json());

app.set('view-engine', 'ejs');
app.use(express.static(__dirname+'/views'));
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
    res.render('listings/requestU.ejs', {houses: houses})
});
async function checkStatus(client, id){
    try{
        const uri = "mongodb+srv://naolal30:ConnectdatabasetoWebstorm100.@cluster0.ttfusik.mongodb.net/test?retryWrites=true&w=majority";
        const client = new MongoClient(uri);
        return true
    }catch (e) {
        console.log("Error connecting to database");
        return false;
}}

router.get('/showU/:id', async (req, res) => {
    const houses = await get1House(client, req.params.id);
    const pics= await client.db("soen_341").collection("house_pic").findOne({_id: houses.image_id});
    houses.image=pics.file;
    res.render('listings/showU.ejs', {houses: houses})
})


router.get('/requestB/:id', async (req, res) => {
    const houses = await get1House(client, req.params.id);
    res.render('listings/requestB.ejs', {houses: houses})
});

router.get('/showB/:id', async (req, res) => {
    const houses = await get1House(client, req.params.id);
    const pics= await client.db("soen_341").collection("house_pic").findOne({_id: houses.image_id});
    houses.image=pics.file;
    res.render('listings/showB.ejs', {houses: houses})
})



router.get('/edit/:id', async (req, res) => {
    const houses = await get1House(client,  req.params.id);
    const broker = await client.db("soen_341").collection("brokers").findOne({_id: houses.broker});
    const user = await client.db("soen_341").collection("users").findOne({_id: houses.seller});
    //console.log(await get1Broker(client, houses[0].broker));
    houses.brk = broker.username;
    houses.seller = user.username;

    res.render('listings/editListings.ejs', {houses: houses})
})

router.delete('/:id', async (req, res) => {
    await deleteHouse(client, req.params.id);
    res.redirect('/myListings')
})


module.exports = router;
module.exports = {checkStatus};