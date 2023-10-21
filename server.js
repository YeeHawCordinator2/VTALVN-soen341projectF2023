

const express = require('express');
const {MongoClient} = require('mongodb');
const bodyParser = require('body-parser');
const {get1Broker, get1User, get1Admin} = require("./model/database/getDB");
const {checkBroker, checkUser, checkAdmin} = require("./model/database/checkPassword");
const {addNewUser} = require("./model/database/addBD");
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


app.post("/login", async (req,res)=> {
    const username = req.body.username;
    const password = req.body.password;

    if (await get1Admin(client, username) != null) {
    //user = await get1Admin(client, username);
    if (await checkAdmin(client, username, password) === true)
        res.redirect("/login_successA")
    else console.log("Password incorrect");
}
else if (await get1Broker(client, username) != null) {
    if (await checkBroker(client, username, password) === true)
        res.redirect("/login_successB")
    else console.log("Password incorrect");
}
else if (await get1User(client, username) != null) {
    if (await checkUser(client, username, password) === true)
        res.redirect("/login_successU");
    else console.log("Password incorrect");
}
else console.log("No user with that username");

});

app.post("/register",async(req,res)=> {
    const username = req.body.username;
    const name = req.body.name;
    const password = req.body.password;

    try{
        const user = await addNewUser(client, username, name, password);
        res.redirect("/login");
    }catch (e) {
        console.log("Error adding user");
        res.redirect("/register");
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
app.get('/buy_rentB',(req,res)=> {
    res.render( 'buy_rentB.ejs' ); // opens localhost on index.html
});
app.get('/buy_rentU',(req,res)=> {
    res.render( 'buy_rentU.ejs' );
});
app.get('/calendarU',(req,res)=> {
    res.render('calendarU.ejs');
});
app.get('/calendarB',(req,res)=> {
        res.render( 'calendarB.ejs' );
});
app.get('/fillerA',(req,res)=> {
    res.render( 'fillerA.ejs' );
});
app.get('/fillerB',(req,res)=> {
    res.render( 'fillerB.ejs' );
});
app.get('/fillerU',(req,res)=> {
    res.render( 'fillerU.ejs' );
});
app.get('/login_successB',(req,res)=> {
    res.render( 'login_successB.ejs' );
});
app.get('/login_successU',(req,res)=> {
    res.render( 'login_successU.ejs' );
});
app.get('/login_successA',(req,res)=> {
    res.render( 'login_successA.ejs' );
});

app.get('/myListings',(req,res)=> {
    res.render( 'myListings.ejs' );
});




app.listen(3000);
        console.log("Server listening on port 3000");



