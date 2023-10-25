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



//Not for creating new listings, this function takes REGISTERED listings and 'gets' them from the database
router.put('/:id', async (req, res) => {
    const houses = await get1House(client, req.params.id);
    //console.log(broker.name)
    res.render('listings/editListings.ejs', {houses: houses})
    //res.send("patoe")

})
router.get('/edit/:id', async (req, res) => {
    const houses = await get1House(client, req.params.id);
    res.render('listings/editListings.ejs', {houses: houses})
})

router.delete('/:id', async (req, res) => {
    await deleteHouse(client, req.params.id);
    res.redirect('/myListings')
})


module.exports = router;