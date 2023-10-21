const {get1Admin, get1Broker, get1User} = require("./database/getDB");
const {checkAdmin, checkBroker, checkUser} = require("./database/checkPassword");
const LocalStrategy = require('passport-local').Strategy;

  function initialize(client, passport, username, password){
    const authenticateUser = async (username, password, done) => {
        let user = null;
        if (await get1Admin(client, username) != null) {
            user = await get1Admin(client, username);
            if (await checkAdmin(client, username, password) === true)
                return done(null, user, 1 );
            else done(null, false, {message: 'Password incorrect'});
        }
        else if (await get1Broker(client, username) != null) {
            user = await get1Admin(client, username);
            if (await checkBroker(client, username, password) === true)
                return done(null, user, 2 );
                else done(null, false, {message: 'Password incorrect'});
        }
        else if (await get1User(client, username) != null) {
            user = await get1Admin(client, username);
            if (await checkUser(client, username, password) === true)
                return done(null, user, 3 );
            else done(null, false, {message: 'Password incorrect'});
        }
        else return done(null, false, {message: 'No user with that username'});

    }
    passport.use(new LocalStrategy({usernameField: 'username', typeField: 'type'},
        authenticateUser));
passport.serializationUser((user, done) => { })
passport.deserializationUser((id, done) => { })





}

module.exports = initialize;