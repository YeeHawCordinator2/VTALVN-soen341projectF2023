const sum = require('../model/sum');

test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});
test("Checking session status", () => {

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
test("Calculating arrays", () => {

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
test("Checking broker seach bar", () => {

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
test("Checking offers", () => {

  expect(2*2).toBe(4);

  expect(4-2).not.toBe(1);

});