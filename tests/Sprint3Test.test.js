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
    let x = await client.db("soen_341").collection("brokers").find().toArray();
    expect(x).toBeGreaterThan(3)
});
test('check if there are user', async() => {
    let x = await client.db("soen_341").collection("brokers").find().toArray();
    expect(x).toBeGreaterThan(0)
});
test('check if there are admin', async() => {
    let x = await client.db("soen_341").collection("brokers").find().toArray();
    expect(x).toBeGreaterThan(4)
});
test('check if there are listings', async() => {
    let x = await client.db("soen_341").collection("brokers").find().toArray();
    expect(x).toBeGreaterThan(15)
});
test('check if there are offers', async() => {
    let x = await client.db("soen_341").collection("offers").find().toArray();
    expect(x).toBeGreaterThan(15)
});
test('check if the listings broker exists', async() => {
let val = await client.db("soen_341").collection("listings").find().toArray();
let answer=false;
    for(let i=0;i<val.length;i++){
if(val[0].broker!=null){
    answer=true;

}}
expect(answer).toBe(true);
});
test('check if the listings user exists', async() => {
    let val = await client.db("soen_341").collection("listings").find().toArray();
    let answer=false;
    for(let i=0;i<val.length;i++){
        if(val[i].user!=null){
            answer=true;
        }

    }
    expect(answer).toBe(true);
});
test('check if the listings image exists', async() => {
    let val = await client.db("soen_341").collection("listings").find().toArray();
    let answer=false;
    for(let i=0;i<val.length;i++){
        if(val[i].image_id!=null){
            answer=true;
        }

    }
    expect(answer).toBe(true);
});