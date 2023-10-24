require('../model/database/checkPassword');
const {MongoClient} = require("mongodb");
const {checkBroker, checkUser, checkAdmin, checkUsername} = require("../model/database/checkPassword");

const uri = "mongodb+srv://naolal30:ConnectdatabasetoWebstorm100.@cluster0.ttfusik.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri);



test('check broker right user right pass', async () => {
    await client.connect();
    expect(await checkBroker(client, "broker1", "password")).toBe(true);
    await client.close();
});

test('check broker right user wrong pass', async() => {
    await client.connect();
    expect(await checkBroker(client, "broker1","potato11")).toBe(false);
    await client.close();

});
test('check broker wrong user random pass', async() => {
    await client.connect();
    expect(await checkBroker(client,"hanseltime","potatoland")).toBe(false);
    await client.close();

});


test('check user right user right pass', async() => {
    await client.connect();
    expect(await checkUser(client,"user1","password")).toBe(true);
    await client.close();

});
test('check user right user wrong pass',async () => {
    await client.connect();

    expect(await checkUser(client,"user1","abcdefghi")).toBe(false);
    await client.close();

});
test('check user wrong user random pass',async () => {
    await client.connect();

    expect(await checkUser(client,"user0","pepeppooj")).toBe(false);
    await client.close();

});


test('check admin right user right pass', async() => {
    await client.connect();

    expect(await checkAdmin(client,"Admin1","password")).toBe(true);
    await client.close();


});
test('check admin right user wrong pass',async () => {
    await client.connect();

    expect(await checkAdmin(client,"Admin1","h12brr22")).toBe(false);
    await client.close();

});
test('check admin wrong user random pass', async() => {
    await client.connect();

    expect(await checkAdmin(client,"jehfbehf","jejejejedd")).toBe(false);
    await client.close();

});



test('check user right username', async() => {
    await client.connect();

    expect(await checkUsername(client,"user1")).toBe(true);
    await client.close();

} );
test('check user wrong username', async() => {
    await client.connect();

    expect(await checkUsername(client,"user0")).toBe(false);
    await client.close();

});

