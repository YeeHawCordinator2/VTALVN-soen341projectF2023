// Monthly Mortgage Payment Calculation
// const principal:  Mortgage Amount (Loan)
// const interestRate: Fixed interest rate
// const monthlyInterestRate: Interest Rate divided by 12 months
// const duration: Total amortization period     in years
// const numPayments: Total number of monthly payments: n = m*t = 12 months * amount of years (duration)
// const monthlyAmount: PMT or Monthly Mortgage Payment Amount

// Function to calculate PMT
function calculateMortgage (){
    var homePrice = document.getElementById("mortgage").elements.namedItem("homePrice").value;
    var downPayment = document.getElementById("mortgage").elements.namedItem("downPayment").value;
    var interestRate = document.getElementById("mortgage").elements.namedItem("interestRate").value;
    var duration = document.getElementById("mortgage").elements.namedItem("loanPeriod").value;
    principal = homePrice - (downPayment*homePrice/100);
    monthlyInterestRate = interestRate/(12*100);
    numPayments = 12 * duration;
    monthlyAmount = principal * ((monthlyInterestRate*(1+monthlyInterestRate)**numPayments)/(((1+monthlyInterestRate)**numPayments)-1));
    document.getElementById("calculate").innerHTML = "The monthly mortgage payment is $" + monthlyAmount.toFixed(2);
    return monthlyAmount.toFixed(2);

}