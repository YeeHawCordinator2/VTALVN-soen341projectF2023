// Monthly Mortgage Payment Calculation
// const principal:  Mortgage Amount (Loan)
// const interestRate: Fixed interest rate
// const monthlyInterestRate: Interest Rate divided by 12 months
// const duration: Total amortization period in years
// const numPayments: Total number of monthly payments: n = m*t = 12 months * amount of years (duration)
// const monthlyAmount: PMT or Monthly Mortgage Payment Amount

// Function to calculate PMT
function calculateMortgage (principal, interestRate,duration){
    let monthlyInterestRate = interestRate/12;
    let numPayments = 12 * duration;
    let monthlyAmount = principal * (monthlyInterestRate/(1-((1+monthlyInterestRate)**(-numPayments))));

    return Math.round(monthlyAmount * 100) / 100;

}
module.exports = calculateMortgage;