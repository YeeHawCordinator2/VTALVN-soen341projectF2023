const express = require('express')
const {get1Broker} = require("./model/database/getDB");
const {MongoClient} = require("mongodb");
const {deleteBroker} = require("./model/database/deleteDB");
const router = express.Router()


const uri = "mongodb+srv://naolal30:ConnectdatabasetoWebstorm100.@cluster0.ttfusik.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri);

try{
    client.connect();
    console.log("Connected to database");
}   catch (e) {
    console.log("Error connecting to database");
}

router.get('/edit/:id', async (req, res) => {
    const broker = await get1Broker(client, req.params.username);
    res.render('views/editBroker.js', { broker: broker })
})


router.delete('/:id', async (req, res) => {
    await deleteBroker(client, req.params.username)
    res.redirect('/ViewBrokers')
})



module.exports = router