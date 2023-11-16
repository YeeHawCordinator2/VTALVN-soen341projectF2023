function computeLoan(){
  const amount = document.getElementById('amount').value
  const interest_rate = document.getElementById('interest_rate').value
  const months = document.getElementById('months').value
  const interest = (amount*(interest_rate*0.01))/months

  let payment = ((amount/months) + interest).toFixed(2);

  // to add coma after every 3 digits
  payment = payment.toString().replace(/\B(?=(\d{3})+(?!\d))/g,",");
document.getElementById('payment').innerHTML = `Monthly Payment = ${payment}`


}
// css style to be implemented later on
