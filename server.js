

const express = require('express');
const {MongoClient} = require('mongodb');
const bodyParser = require('body-parser');
const {get1Broker, get1User, get1Admin} = require("./model/database/getDB");
const {checkBroker, checkUser, checkAdmin, checkUsername} = require("./model/database/checkPassword");
const {addNewUser, addNewBroker} = require("./model/database/addBD");
const app = express();
const brkRouter = require('./routes/brokers');
const methodOverride = require('method-override')
const {editBroker} = require("./model/database/editDB");
const bcrypt = require("bcrypt");

app.use(bodyParser.json());
app.set('view-engine', 'ejs');
app.use(express.static(__dirname+'/views'));
app.use(bodyParser.urlencoded({
    extended: true
})); //
app.use(express.urlencoded({
    extended: true
}));
app.use(methodOverride('_method'));

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
        else res.redirect("/logins")
    }
    else if (await get1Broker(client, username) != null) {
        if (await checkBroker(client, username, password) === true)
            res.redirect("/login_successB")
        else res.redirect("/logins")
    }
    else if (await get1User(client, username) != null) {
        if (await checkUser(client, username, password) === true)
            res.redirect("/login_successU");
        else res.redirect("/logins")
    }
    else res.redirect("/loginss");

});

app.post("/register",async(req,res)=> {
    const username = req.body.username;
    const name = req.body.name;
    const password = req.body.password;

    try{
        if(await checkUsername(client, username) === true) {
            const user = await addNewUser(client, username, name, password);
            res.redirect("/login");
        }
        else
            res.redirect("/registerUserExist");
    }catch (e) {
        console.log("Error adding user");
        res.redirect("/register");
    }
});

app.post("/addBroker",async(req,res)=> {
    const username = req.body.username;
    const name = req.body.name;
    const password = req.body.password;

    try{
        const user = await addNewBroker(client, username, name, password);
        res.redirect("/ViewBrokers");
    }catch (e) {
        console.log("Error adding user");
        res.redirect("/addBroker");
    }
});
app.post("/editBroker",async(req,res)=> {
    const username = req.body.username;
    const name = req.body.name;
    const password = req.body.password;
    const og= req.body.user_id;
    console.log(og);
    try{
        const user = await editBroker(client,og, { name: name, username: username, password: await bcrypt.hash(password, 10) });
        res.redirect("/ViewBrokers");
    }catch (e) {
        console.log("Error adding user");
        res.redirect("/editBroker");
    }
    console.log("edit broker");


});




app.get('/',(req,res)=> {
    res.render( 'buy_rentU.ejs' ); // opens localhost on index.html
});
app.get('/login',(req,res)=> {
    res.render( 'login.ejs' ); // opens localhost on index.html
});
app.get('/logins',(req,res)=> {
    res.render( 'login_WRONGPASS.ejs' ); // opens localhost on index.html
});
app.get('/loginss',(req,res)=> {
    res.render( 'login_WRONGUSER.ejs' ); // opens localhost on index.html
});
app.get('/register',(req,res)=> {
    res.render( 'register.ejs' ); // opens localhost on index.html
});
app.get('/registerUserExist',(req,res)=> {
    res.render( 'registerUserExist.ejs' ); // opens localhost on index.html
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
app.get('/ViewBrokers',async (req,res)=> {
    const brokers = await client.db("soen_341").collection("brokers").find().toArray();

    res.render( 'broker/ViewBrokers.ejs' ,{brokers: brokers});
});
app.get('/addBroker',(req,res)=> {
    res.render( 'broker/addBroker.ejs' );
});
app.get('/editBroker',(req,res)=> {
    res.render( 'broker/editBroker.ejs' );
});


app.use('/broker', brkRouter)



app.listen(3000);
console.log("Server listening on port 3000");





