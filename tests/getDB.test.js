const sum = require('../model/database/getDB');
const {MongoClient} = require("mongodb");
const {checkBroker} = require("../model/database/checkPassword");
const {get1Broker, get1House, readHouses, readBrokers, get1User, get1Admin, getHouseSeller, getHousePreferences,
    getHouseBroker
} = require("../model/database/getDB");
const uri = "mongodb+srv://naolal30:ConnectdatabasetoWebstorm100.@cluster0.ttfusik.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri);

try{
    client.connect();
    console.log("Connected to database");
}   catch (e) {
    console.log("Error connecting to database");
}
/*
test('test get 1 Houses exist', () => {
    expect(get1House(client,"Luffy's chalet style house")).toBe(true);
});

test('test get 1 Houses dont exist', () => {
    expect(get1House(client,"Luffy's homeless house")).toBe(true);
});
test('test get 1 broker exist', () => {
    expect(get1Broker(client,"broker1")).toBe(true);
});

test('test get 1 broker dont exist', () => {
    expect(get1Broker(client,"broker00")).toBe(true);
});
test('test get 1 user exist', () => {
    expect(get1User(client,"user1")).toBe(true);
});

test('test get 1 user dont exist', () => {
    expect(get1User(client,"broker00")).toBe(true);
});
test('test get 1 admin exist', () => {
    expect(get1Admin(client,"Admin1")).toBe(true);
});

test('test get 1 admin dont exist', () => {
    expect(get1Admin(client,"broker00")).toBe(true);
});
test('test get house seller with house exist', () => {
    expect(getHouseSeller(client,"Luffy's chalet style house")).toBe(true);
});
test('test get house seller with house no exist', () => {
    expect(getHouseSeller(client,"Luffy's jail")).toBe(true);
});
test('test get house broker with house exist', () => {
    expect(getHouseBroker(client,"Luffy's chalet style house")).toBe(true);
});
test('test get house broker with house no exist', () => {
    expect(getHouseBroker(client,"Luffy's jail")).toBe(true);
});
test('test get house pref with user exist', () => {
    expect(getHousePreferences(client,"user1")).toBe(true);
});
test('test get house pref with user no exist', () => {
    expect(getHousePreferences(client,"user1")).toBe(true);
});


*/
