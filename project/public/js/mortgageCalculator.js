
function calculateMortgage(homePrice, downPayment, interestRate, duration) {

    var principal = homePrice - (downPayment * homePrice / 100);
    var monthlyInterestRate = interestRate / (12 * 100);
    var numPayments = 12 * duration;
    return  principal * ((monthlyInterestRate * Math.pow(1 + monthlyInterestRate, numPayments)) / (Math.pow(1 + monthlyInterestRate, numPayments) - 1));

}
module.exports = calculateMortgage;