const express = require('express')
const {get1Broker} = require("../model/database/getDB");
const {MongoClient} = require("mongodb");
const {deleteBroker} = require("../model/database/deleteDB");
const bodyParser = require("body-parser");
const router = express.Router()
const app = express();
app.use(bodyParser.json());

app.set('view-engine', 'ejs');
app.use(express.static(__dirname+'/views'));
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
    res.render('broker/editBroker.ejs', {broker: broker})
    //res.send("patoe")

})


router.delete('/:id', async (req, res) => {
    await deleteBroker(client, req.params.id);
    res.redirect('/ViewBrokers')
})



module.exports = router