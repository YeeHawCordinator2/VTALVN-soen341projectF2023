const {checkStatus} = require("../routes/listings");


test('check status', () => {
    expect(checkStatus()).toBe(true);
});
