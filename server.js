const express = require('express');
const {MongoClient} = require('mongodb');
const http = require('http');
const path = require("path");
const bodyParser = require('body-parser');
const helmet = require('helmet');
const rateLimit = require("express-rate-limit");
const {addNewUser, addNewBroker, addNewAdmin, addNewHouse} = require("./model/database/addBD");
const {get1Broker, get1User} = require("./model/database/getDB");
const app = express();
const server = http.createServer(app);


const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
});
const uri = "mongodb+srv://naolal30:ConnectdatabasetoWebstorm100.@cluster0.ttfusik.mongodb.net/test?retryWrites=true&w=majority";


const client = new MongoClient(uri); // create a new MongoClient

try {
    // Connect to the MongoDB cluster
    await client.connect();

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname,'./views')));
app.use(helmet());
app.use(limiter);



// ADD NEW
app.get('/', function(req,res){
    res.sendFile(path.join(__dirname,'./views/signUp.html'));//change to wtv ADD FNCT - SYSTEM ADMIN + HOUSE+ USER + BROKER
}); //X4
app.post('/signUp', function(req,res){
        addNewUser(client, req.body.uUsername, req.body.uName, req.body.uPassword).then(r => console.log("New employee has been added")).catch(console.error);
        res.send("New employee has been added into the database with ID = " + req.body.id + " and Name = " + req.body.name);

});
app.get('/', function(req,res){
    res.sendFile(path.join(__dirname,'./views/houseAdd.html'));//change to wtv ADD FNCT - SYSTEM ADMIN + HOUSE+ USER + BROKER
}); //X4

app.post('/newHouse', function(req,res){
        addNewHouse(client, req.body.listingName, req.body.price, req.body.loc, req.body.bed, req.body.bath, req.body.furnished, req.body.buildYRS, req.body.extra, req.body.buildType, req.body.stories, req.body.client, req.body.broker, req.body.propSize, req.body.garage, req.body.type , req.body.pic).then(r => console.log("New house has been added")).catch(console.error);
});

app.get('/', function(req,res){
    res.sendFile(path.join(__dirname,'./views/adminAdd.html'));//change to wtv ADD FNCT - SYSTEM ADMIN + HOUSE+ USER + BROKER
}); //X4
app.post('/newAdmin', function(req,res){
        addNewAdmin(client, req.body.aUsername, req.body.aName, req.body.aPassword).then(r => console.log("New admin has been added")).catch(console.error);
        res.send("New broker has been added into the database with ID = " + req.body.id + " and Name = " + req.body.name);
});
app.get('/', function(req,res){
    res.sendFile(path.join(__dirname,'./views/brokerAdd.html'));//change to wtv ADD FNCT - SYSTEM ADMIN + HOUSE+ USER + BROKER
}); //X4

app.post('/newBroker', function(req,res){
        addNewBroker(client, req.body.bUsername, req.body.bName, req.body.bPassword).then(r => console.log("New broker has been added")).catch(console.error);
});

// retrieve login info -> check if broker or admin -> call js fct that change the menu bar .

// View
    app.post('/login', function(req,res){

        get1Broker()
        get1User()
        get1A

        db.serialize(()=>{
            db.each('SELECT id ID, name NAME FROM emp WHERE id =?', [req.body.id], function(err,row){     //db.each() is only one which is funtioning while reading data from the DB
                if(err){
                    res.send("Error encountered while displaying");
                    return console.error(err.message);
                }
                res.send(` ID: ${row.ID},    Name: ${row.NAME}`);
                console.log("Entry displayed successfully");
            });
        });
    });








app.listen(3000, function()
{
    console.log("Server running on port 3000.");
});

// HANDLE CLOSE DIFFF????? + IDK IF BEFORE OR AFTER APP.LISTEN
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }



// list all the databases in the cluster
async  function listDatabases(client){
    databasesList = await client.db().admin().listDatabases();

    console.log("Databases:");
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
}

