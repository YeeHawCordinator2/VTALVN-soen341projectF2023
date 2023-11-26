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

function checkBuildtype(build){
    return build == "house" ||  build == "apartment" || build == "condo";
}
function checkYES_NO(furnished){
    return furnished == "yes" || furnished == "no";

}
function checklistingType(listingType){
    return listingType == "sell" || listingType == "rent" || listingType  === "sold";

}
module.exports = {checkPhone,checkPrice,checkName,checkEmails,checkDates, checklistingType, checkYES_NO, checkBuildtype}