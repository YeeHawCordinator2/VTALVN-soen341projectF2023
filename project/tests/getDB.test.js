test("string matchers",() => {

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

});