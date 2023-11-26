const {checkEmails, checkName, checkPhone, checkDates, checkPrice} = require("../public/js/CheckForm");

test('form check Name True', () => {
    expect(checkName("hello kitty")).toBe(true);
});
test('form check Name False', () => {
    expect(checkName("potato")).toBe(false);
});
test('form check phone true', () => {
    expect(checkPhone("544-324-3221")).toBe(true);
});
test('form check phone false', () => {
    expect(checkPhone("EGGSMELLSBAD")).toBe(false);
});
test('form check email true', () => {
    expect(checkEmails("apple@tree.coom")).toBe(true);
});
test('form check email false', () => {
    expect(checkEmails("cherrios")).toBe(false);
});
test('form check date true', () => {
    expect(checkDates("01/01/2001")).toBe(true);
});
test('form check date false', () => {
    expect(checkDates("23433564")).toBe(false);
});
test('form check price true', () => {
    expect(checkPrice("2948922")).toBe(true);
});
test('form check price false', () => {
    expect(checkPrice("hehehehehee")).toBe(false);
});
