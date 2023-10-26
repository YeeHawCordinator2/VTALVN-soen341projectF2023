require('../model/database/checkPassword');
const {MongoClient} = require("mongodb");
const {checkBroker, checkUser, checkAdmin, checkUsername} = require("../model/database/checkPassword");

const uri = "mongodb+srv://naolal30:ConnectdatabasetoWebstorm100.@cluster0.ttfusik.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri);


test('check broker right user right pass', async () => {
    await client.connect();
    await expect( checkBroker(client, "broker1", "password")).resolves.toBe(true);
    await client.close();
});

test('check broker right user wrong pass', async() => {
    await client.connect();
    await expect( checkBroker(client, "broker1","potato11")).resolves.toBe(false);
    await client.close();

});
test('check broker wrong user random pass', async() => {
    await client.connect();
    await expect( checkBroker(client,"hanseltime","potatoland")).resolves.toBe(false);
    await client.close();

});


test('check user right user right pass', async() => {
    await client.connect();
    await expect (checkUser(client,"user1","password")).resolves.toBe(true);
    await client.close();

});
test('check user right user wrong pass',async () => {
    await client.connect();

    await expect( checkUser(client,"user1","abcdefghi")).resolves.toBe(false);
    await client.close();

});
test('check user wrong user random pass',async () => {
    await client.connect();

    await expect( checkUser(client,"user0","pepeppooj")).resolves.toBe(false);
    await client.close();

});


test('check admin right user right pass', async() => {
    await client.connect();

    await expect( checkAdmin(client,"Admin1","password")).resolves.toBe(true);
    await client.close();


});
test('check admin right user wrong pass',async () => {
    await client.connect();

    await expect( checkAdmin(client,"Admin1","h12brr22")).resolves.toBe(false);
    await client.close();

});
test('check admin wrong user random pass', async() => {
    await client.connect();

    await expect( checkAdmin(client,"jehfbehf","jejejejedd")).resolves.toBe(false);
    await client.close();

});



test('check user right username', async() => {
    await client.connect();
    await expect(checkUsername(client,"user1")).resolves.toBe(true);
    await client.close();

} );

test('check user wrong username', async() => {
    await client.connect();
    await expect(checkUsername(client,"user0")).resolves.toBe(false);
    await client.close();
});

