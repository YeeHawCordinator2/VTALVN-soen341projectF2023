const calculateMortgage = require("../public/js/mortgageCalculator");
test('form check Name True', () => {
    expect(calculateMortgage(1500, 20, 10, 5).toFixed(2)).toBe("25.50");
});
test('form check Name True', () => {
    expect(calculateMortgage(100000, 40, 20, 20).toFixed(2)).toBe("1019.29");
});
test('form check Name True', () => {
    expect(calculateMortgage(1000000, 10, 40, 14).toFixed(2)).toBe("30122.04");
});