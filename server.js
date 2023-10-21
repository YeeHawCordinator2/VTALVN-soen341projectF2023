const express = require('express');
const {MongoClient} = require('mongodb');
const http = require('http');
const bodyParser = require('body-parser');
const {get1Broker, get1User, get1Admin} = require("./model/database/getDB");
const {checkBroker, checkUser, checkAdmin} = require("./model/database/checkPassword");
const app = express();


//stuff for request????
app.use(bodyParser.json());
app.set('view-engine', 'ejs');
app.use(express.static(__dirname+'/views'));
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


app.post("/login",async (req,res)=> {
    const username = req.body.username;
    const password = req.body.password;
if(await get1Admin(client, username) != null) {
    if(await checkAdmin(client, username, password)===true)
        res.redirect('login_success'); // once done it redirect to new page
    else console.log("WRONG PASSWORD");
}
    if(await get1Broker(client, username) != null) {
        if(await checkBroker(client, username, password)===true)
            res.redirect('login_success'); // once done it redirect to new page
        else console.log("WRONG PASSWORD");
    }
    if(await get1User(client, username) != null) {
        if(await checkUser(client, username, password)===true)
            res.redirect('login_success'); // once done it redirect to new page
        else console.log("WRONG PASSWORD");
    }

});

app.get('/',(req,res)=> {
            res.render( 'Homepage.ejs' ); // opens localhost on index.html
        });
app.get('/login',(req,res)=> {
    res.render( 'login.ejs' ); // opens localhost on index.html
});
app.get('/register',(req,res)=> {
    res.render( 'register.ejs' ); // opens localhost on index.html
});
app.get('/addBroker',(req,res)=> {
    res.render( 'addBroker.ejs' ); // opens localhost on index.html
});
app.get('/buy_rent',(req,res)=> {
    res.render( 'buy_rent.ejs' ); // opens localhost on index.html
});app.get('/calendar',(req,res)=> {
    res.render( 'calendar.ejs' ); // opens localhost on index.html
});app.get('/editBroker',(req,res)=> {
    res.render( 'editBroker.ejs' ); // opens localhost on index.html
});app.get('/filler',(req,res)=> {
    res.render( 'filler.ejs' ); // opens localhost on index.html
});app.get('/login_success',(req,res)=> {
    res.render( 'login_success.ejs' ); // opens localhost on index.html
});
app.get('/ViewBrokers',(req,res)=> {
    res.render( 'ViewBrokers.ejs' ); // opens localhost on index.html
});




app.listen(3000);
        console.log("Server listening on port 3000");



