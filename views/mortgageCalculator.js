// Monthly Mortgage Payment Calculation
// const principal:  Mortgage Amount (Loan)
// const interestRate: Fixed interest rate
// const monthlyInterestRate: Interest Rate divided by 12 months
// const duration: Total amortization period     in years
// const numPayments: Total number of monthly payments: n = m*t = 12 months * amount of years (duration)
// const monthlyAmount: PMT or Monthly Mortgage Payment Amount

// Function to calculate PMT
function calculateMortgage (){
    var homePrice = parseFloat(document.getElementById("homePrice").value);
    var downPayment = parseFloat(document.getElementById("downPayment").value);
    var interestRate = parseFloat(document.getElementById("interestRate").value);
    var duration = parseFloat(document.getElementById("loanPeriod").value);

    var principal = homePrice - (downPayment*homePrice/100);
    var monthlyInterestRate = interestRate/(12*100);
    var numPayments = 12 * duration;
    var monthlyAmount = principal * ((monthlyInterestRate*(1+monthlyInterestRate)**numPayments)/(((1+monthlyInterestRate)**numPayments)-1));
    document.getElementById("calculate").innerHTML = "The monthly mortgage payment is $" + monthlyAmount.toFixed(2);
    // return monthlyAmount.toFixed(2);

}