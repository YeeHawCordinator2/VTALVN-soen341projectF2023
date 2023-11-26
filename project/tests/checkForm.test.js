const {checkEmails, checkName, checkPhone, checkDates, checkPrice} = require("../public/js/CheckForm");
const {checkBuildtype, checkYES_NO, checklistingType} = require("../views/js/CheckForm");
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
// sprint 4
test('form check build type true', () => {
    expect(checkBuildtype("house")).toBe(true);
});
test('form check build type true', () => {
    expect(checkBuildtype("apartment")).toBe(true);
});
test('form check build type true', () => {
    expect(checkBuildtype("condo")).toBe(true);
});
test('form check build type false', () => {
    expect(checkBuildtype("hehehehehee")).toBe(false);
});

test('form check yes_no true', () => {
    expect(checkYES_NO("yes")).toBe(true);
});
test('form check yes_no false', () => {
    expect(checkYES_NO("no")).toBe(true);
});
test('form check yes_no false', () => {
    expect(checkYES_NO("hehehehehee")).toBe(false);
});
test('form check listing type true', () => {
    expect(checklistingType("sell")).toBe(true);
});
test('form check listing type true', () => {
    expect(checklistingType("rent")).toBe(true);
});
test('form check listing type true', () => {
    expect(checklistingType("sold")).toBe(true);
});

test('form check listing type false', () => {
    expect(checklistingType("hehehehehee")).toBe(false);
});
