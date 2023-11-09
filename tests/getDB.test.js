test("server check",() => {

    var string1 = "BrowserStack - Automation tool"

    // test for match the string - Success

    expect(string1).toMatch(/tool/);




    // test for not match the string - Failure

    expect(string1).not.toMatch(/abc/)});
test("numeric comparison", () => {

    var number1 = 100;

    var number2 = -20;

    var number3 = 0;

    // validate greater than

    expect(number1).toBeGreaterThan(10)

    // validate less than or equal

    expect(number2).toBeLessThanOrEqual(0)

    // validate greater than or equal

    expect(number3).toBeGreaterThanOrEqual(0)

});
test("truthiness Assertion", () => {

    var test="Software Testing demo"

    var n = null

    expect(n).toBeNull()

    expect(n).not.toBeNull

    // test should have a valid value

    expect(test).toBeTruthy()



    // pass - null worked as false or negative

    expect(n).toBeFalsy()

    // 0 - work as false

    expect(0).toBeFalsy()

});
test("Exact value matchers", () => {

    expect(2*2).toBe(4);

    expect(4-2).not.toBe(1);

});const {checkStatus} = require("../routes/listings");
const {MongoClient} = require("mongodb");
const sum = require("../model/sum");

const uri = "mongodb+srv://naolal30:ConnectdatabasetoWebstorm100.@cluster0.ttfusik.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri);

test('adds 1 + 2 to equal 3', () => {
    expect(sum(1, 2)).toBe(3);
});
/*
test('check status', () => {
    expect(checkStatus(client)).toBe(true);
})

test('check session status', () => {
    var n= null;
    expect(n).toBe(null);
});
*/
/*
test('check if there are brokers', async() => {
    await client.connect();

    let x = await client.db("soen_341").collection("brokers").find().toArray();
    expect(x.length).toBeGreaterThan(3)
    await client.close();

});
test('check if there are user', async() => {
    await client.connect();

    let x = await client.db("soen_341").collection("users").find().toArray();
    expect(x.length).toBeGreaterThan(0)
    await client.close();

});
test('check if there are admin', async() => {
    await client.connect();

    let x = await client.db("soen_341").collection("system_admin").find().toArray();
     expect(x.length).toBeGreaterThan(4)
    await client.close();

});
test('check if there are listings', async() => {
    await client.connect();

    let x = await client.db("soen_341").collection("houses").find().toArray();
     expect(x.length).toBeGreaterThan(15)
    await client.close();

});
test('check if there are offers', async() => {
    await client.connect();

    let x = await client.db("soen_341").collection("offers").find().toArray();
     expect(x.length).toBeGreaterThanOrEqual(0)
    await client.close();

}); /*
test('check if the listings broker exists', async() => {
    await client.connect();

    let val = await client.db("soen_341").collection("listings").find().toArray();
let answer=false;
    for(let i=0;i<val.length;i++){
if(val[0].broker!=null){
    answer=true;

}}
 expect(answer).toBe(false);
    await client.close();

});
test('check if the listings user exists', async() => {
    await client.connect();

    let val = await client.db("soen_341").collection("listings").find().toArray();
    let answer=false;
    for(let i=0;i<val.length;i++){
        if(val[i].user!==null){
            answer=true;
        }

    }
     expect(answer).toBe(false);
    await client.close();

});
test('check if the listings image exists', async() => {
    await client.connect();

    let val = await client.db("soen_341").collection("listings").find().toArray();
    let answer=false;
    for(let i=0;i<val.length;i++){
        if(val[i].image_id!==null){
            answer=true;
        }

    }
    expect(answer).toBe(false);
    await client.close();

});*/

