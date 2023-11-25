function checkPhone(price){
    return /^\d{3}-\d{3}-\d{4}$/.test(price.toString());
}
function checkPrice(price) {
    return /^\d+$/ .test(price.toString());
}
function checkName(name){
    return /^[A-Za-z]+\s[A-Za-z]+$/.test(name.toString());
}
function checkEmails(email){
    return /^[A-Za-z0-9]+@[A-Za-z0-9]+\.[A-Za-z0-9]+$/.test(email.toString());
}
function checkDates(date){
return /^\d{2}\/\d{2}\/\d{4}$/.test(date.toString());
}
function checkUser(user){
    if( client.db("soen_341").collection("users").findOne({name: user})!=null){
        return true;
    }
}
function checkBroker(broker){
    if(client.db("soen_341").collection("brokers").findOne({name: broker})!=null){
        return true;
    }
}
function checkYES_NO(furnished){
    if(furnished=="yes"||furnished=="no"){
        return true;
    }
}
function checklistingType(listingType){
    if(listingType=="sell"||listingType=="rent" ||listingType=="sold"){
        return true;
    }
}
module.exports = {checkPhone,checkPrice,checkName,checkEmails,checkDates};