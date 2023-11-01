

//check password DONE
const bcrypt = require("bcrypt");

async function checkUser(client, username, password){
    const hashPass = await client.db("soen_341").collection("users").findOne({username: username});
    if(hashPass=== null)return false;

        return await bcrypt.compare(password, hashPass.password) // check if good return

}
async function checkUsername(client, username){
    return await client.db("soen_341").collection("users").findOne({username: username}) !== null;

}

async function checkBroker(client, username, password){
    const hashPass = await client.db("soen_341").collection("brokers").findOne({username: username});
    if(hashPass=== null)return false;

        return await bcrypt.compare(password, hashPass.password) // check if good return

}

async function checkAdmin(client, username, password){
    const hashPass = await client.db("soen_341").collection("system_admin").findOne({username: username});
    if(hashPass=== null)return false;
    return await bcrypt.compare(password, hashPass.password); // check if good return

}

module.exports = {checkUser, checkBroker, checkAdmin, checkUsername };
