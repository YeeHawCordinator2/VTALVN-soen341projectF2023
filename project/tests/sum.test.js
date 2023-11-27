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
