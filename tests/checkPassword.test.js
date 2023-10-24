const sum = require('../model/database/checkPassword');
const {MongoClient} = require("mongodb");
const {checkBroker, checkUser, checkAdmin, checkUsername} = require("../model/database/checkPassword");

const uri = "mongodb+srv://naolal30:ConnectdatabasetoWebstorm100.@cluster0.ttfusik.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri);

try{
    client.connect();
    console.log("Connected to database");
}   catch (e) {
    console.log("Error connecting to database");
}



test('check broker right user right pass', () => {
    expect(checkBroker(client,"broker1","password")).toBe(true);
});
test('check broker right user wrong pass', () => {
    expect(checkBroker(client, "broker1","potato11")).toBe(false);
});
test('check broker wrong user random pass', () => {
    expect(checkBroker(client,"hanseltime","potatoland")).toBe(false);
});


test('check user right user right pass', () => {
    expect(checkUser(client,"user1","password")).toBe(true);
});
test('check user right user wrong pass', () => {
    expect(checkUser(client,"user1","abcdefghi")).toBe(false);
});
test('check user wrong user random pass', () => {
    expect(checkUser(client,"user0","pepeppooj")).toBe(false);
});


test('check admin right user right pass', () => {
    expect(checkAdmin(client,"Admin1","password")).toBe(true);

});
test('check admin right user wrong pass', () => {
    expect(checkAdmin(client,"Admin1","h12brr22")).toBe(false);
});
test('check admin wrong user random pass', () => {
    expect(checkAdmin(client,"jehfbehf","jejejejedd")).toBe(false);
});



test('check user right username', () => {
    expect(checkUsername(client,"user1")).toBe(true);
} );
test('check user wrong username', () => {
    expect(checkUsername(client,"user0")).toBe(false);
});


