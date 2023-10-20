const express = require('express');
const {MongoClient} = require('mongodb');
const http = require('http');
const path = require("path");
const bodyParser = require('body-parser');
const helmet = require('helmet');
const rateLimit = require("express-rate-limit");
const {addNewUser, addNewBroker, addNewAdmin, addNewHouse} = require("./model/database/addBD");
const {get1Broker, get1User, get1Admin} = require("./model/database/getDB");
const {checkBroker, checkUser, checkAdmin} = require("./model/database/checkPassword");
const app = express();
const server = http.createServer(app);


//stuff for request????
app.use(bodyParser.json());
app.use(express.static("views"));
app.use(bodyParser.urlencoded({
    extended: true
}));
//connect database
const uri = "mongodb+srv://naolal30:ConnectdatabasetoWebstorm100.@cluster0.ttfusik.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri);

try{
    client.connect();
    console.log("Connected to database");
}   catch (e) {
    console.log("Error connecting to database");
}
    /*

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
    }); */

// retrieve login info -> check if broker or admin -> call js fct that change the menu bar .

// View
/*
    app.get('/', function(req,res){
        res.sendFile(path.join(__dirname,'./views/login.html'));
    });

    app.post('/login',  function(req,res) {



        if (get1Broker(client, req.body.username) != null) {
            if (checkBroker(client, req.body.username, req.body.password)) console.log("FOUND BROKER");
            else console.log("WRONG PASSWORD");
        }
        else if (get1User(client, req.body.username) != null) {
            if (checkUser(client, req.body.username, req.body.password)) console.log("FOUND user");
            else console.log("WRONG PASSWORD");
        }
        else if (get1Admin(client, req.body.username) != null) {
            if (checkAdmin(client, req.body.username, req.body.password)) console.log("FOUND admin");
            else console.log("WRONG PASSWORD");
        }
        else console.log("NONE")
        /*
       else if(get1User(client, req.body.username).then(r => checkUser(client, req.body.username, req.body.password)).catch(console.error);
       else if(get1Admin(client, req.body.username).then(r => checkAdmin(client, req.body.username, req.body.password)).catch(console.error);
       console.log (" TEST FINISH")


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

*/
        app.get("/",(req,res)=> {
            res.set({
                "Allow-access-Allow-Origin": '*'
            })
            res.redirect( "Homepage.html" ); // opens localhost on index.html
        }).listen(3000);

        console.log("Server listening on port 3000");




