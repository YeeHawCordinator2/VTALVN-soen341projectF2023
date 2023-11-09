const {checkStatus} = require("../routes/listings");
const {checkSession} = require("../server");
const {MongoClient} = require("mongodb");

const uri = "mongodb+srv://naolal30:ConnectdatabasetoWebstorm100.@cluster0.ttfusik.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri);

test('check status', () => {
    expect(checkStatus()).toBe(true);
});

test('check session status', () => {
    expect(checkSession(true)).toBe(true);
});

test('check if there are brokers', async() => {
    await client.connect();

    let x = await client.db("soen_341").collection("brokers").find().toArray();
    await expect(x).resolves.toBeGreaterThan(3)
    await client.close();

});
test('check if there are user', async() => {
    await client.connect();

    let x = await client.db("soen_341").collection("brokers").find().toArray();
    await expect(x).resolves.toBeGreaterThan(0)
    await client.close();

});
test('check if there are admin', async() => {
    await client.connect();

    let x = await client.db("soen_341").collection("brokers").find().toArray();
    await expect(x).resolves.toBeGreaterThan(4)
    await client.close();

});
test('check if there are listings', async() => {
    await client.connect();

    let x = await client.db("soen_341").collection("brokers").find().toArray();
    await expect(x).resolves.toBeGreaterThan(15)
    await client.close();

});
test('check if there are offers', async() => {
    await client.connect();

    let x = await client.db("soen_341").collection("offers").find().toArray();
    await expect(x).resolves.toBeGreaterThan(15)
    await client.close();

});
test('check if the listings broker exists', async() => {
    await client.connect();

    let val = await client.db("soen_341").collection("listings").find().toArray();
let answer=false;
    for(let i=0;i<val.length;i++){
if(val[0].broker!=null){
    answer=true;

}}
await expect(answer).resolves.toBe(true);
    await client.close();

});
test('check if the listings user exists', async() => {
    await client.connect();

    let val = await client.db("soen_341").collection("listings").find().toArray();
    let answer=false;
    for(let i=0;i<val.length;i++){
        if(val[i].user!=null){
            answer=true;
        }

    }
    await expect(answer).resolves.toBe(true);
    await client.close();

});
test('check if the listings image exists', async() => {
    await client.connect();

    let val = await client.db("soen_341").collection("listings").find().toArray();
    let answer=false;
    for(let i=0;i<val.length;i++){
        if(val[i].image_id!=null){
            answer=true;
        }

    }
    await expect(answer).resolves.toBe(true);
    await client.close();

});