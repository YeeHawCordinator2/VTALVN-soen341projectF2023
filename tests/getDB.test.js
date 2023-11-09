const {MongoClient} = require("mongodb");

const uri = "mongodb+srv://naolal30:ConnectdatabasetoWebstorm100.@cluster0.ttfusik.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri);

test("check if add broker works",() => {

    var string1 = "BrowserStack - Automation tool"

    // test for match the string - Success

    expect(string1).toMatch(/tool/);



    // test for not match the string - Failure

    expect(string1).not.toMatch(/abc/)});
test("check if there is only one broker with username", () => {

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
test("test if image is connected to listings", () => {

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
test("test how many admin there is", async() => {
    await client.connect();
    let n = await client.db("soen_341").collection("system_admin").find().toArray();
    expect(n.length).toBe(5);
    await client.close();


});

