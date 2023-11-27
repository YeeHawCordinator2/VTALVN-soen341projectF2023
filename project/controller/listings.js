const express = require('express');
const { get1House} = require("../model/database/getDB");
const {MongoClient, ObjectId} = require("mongodb");
const {deleteHouse} = require("../model/database/deleteDB");
const {deleteOffer} = require("../model/database/deleteDB");
const bodyParser = require("body-parser");
const {buy_rentJS, returnHouse} = require("./serverListing");
const {addNewBroker, addNewHouse, addNewOffer} = require("../model/database/addBD");
const fs = require("fs");
const path = require("path");
const encode = require("nodejs-base64-encode");
const {
    checkYES_NO,
    checklistingType,
    checkBuildtype,
    checkPhone,
    checkPrice,
    checkName,
    checkEmails,
    checkDates
} = require("../public/js/CheckForm");
const {edit1HouseAllProperty} = require("../model/database/editDB");
const router  = express.Router();

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
    houses.brk = broker.username;
    houses.seller = user.username;

    res.render('../project/views/listings/editListings.ejs', {houses: houses})
})

router.get('/offer/:id', async (req, res) => {
    const houses = await get1House(client,  req.params.id);
    const broker = await client.db("soen_341").collection("brokers").findOne({_id: houses.broker});
    res.render('../project/views/listings/offerListing.ejs', {houses: houses, brokers:broker, message: ""})
})
router.get('/showOffers/:id', async (req, res) => {
    const houses = await get1House(client, req.params.id);
    const all_offers = await client.db("soen_341").collection("offers").find().toArray();
    const offers = [];
    for (let i = 0; i < all_offers.length; i++) {
        if (all_offers[i].broker == houses.name) {
            offers.push(all_offers[i]);
            
        }
    }

    const pics= await client.db("soen_341").collection("house_pic").findOne({_id: houses.image_id});
    houses.image=pics.file;
    res.render('../project/views/listings/showOffers.ejs', {houses: houses, offers: offers, message: ""})
})

router.post('/status/:id', async (req, res) => {
    await client.db("soen_341").collection("offers").findOneAndUpdate(
        { house_name: req.params.id},
        { $set: { status: "rejected" } },
    );
    res.redirect('/showOffers')
})

router.delete('/:id', async (req, res) => {
    await deleteHouse(client, req.params.id);
    res.redirect('/myListings')
})

//when the form from showOffers is submitted, this method is called. It will update the listingType of the house to sold and delete the offer.
router.post('/actions/:id', async (req, res) => {
    const house_name = req.params.id;
    try {
        await client.db("soen_341").collection("offers").findOneAndUpdate(
            { house_name: house_name},
            { $set: { status: "sold" } },
        );
        
        console.log("Successfully sold");
        res.redirect('/showOffers');
    } catch (error) {
        console.log("Internal server error");
        res.redirect('/showOffers');
    }
});

router.post('/compare', async (req, res) => {
    const prop1 = req.body.first;
    const prop2 = req.body.second;
    const house1 = await client.db("soen_341").collection("houses").findOne({name:prop1});
    const house2 = await client.db("soen_341").collection("houses").findOne({name:prop2});
    const user = await client.db("soen_341").collection("houses").find().toArray();
    res.render('../project/views/compareProp.ejs', {props: user, prop1: house1, prop2: house2}); // opens localhost on index.html
});



module.exports = router;