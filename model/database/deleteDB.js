
//delete fcts
async function deleteHouse(client, nameOfListing) {
    try {
        const houseList = await client.db("soen_341").collection("houses").deleteOne({name: nameOfListing});
        await client.db("soen_341").collection("house_pic").deleteOne({_id: houseList.image_id});

    }catch (e) {
        console.log("element not found");
    }

}

async function deleteBroker(client, brokerName){
    try {
        return await client.db("soen_341").collection("brokers").deleteOne({name: brokerName});
        //maybe edit listing to remove any instance of that broker
    }catch (e) {
        console.log("element not found");
    }
}

async function deleteUser(client, username){

} //delete house pref with

async function deleteAdmin(client,username){
    try{
        return await client.db("soen_341").collection("system_admin").deleteOne({username: username});
    }catch (e) {
        console.log("user not found or user preference not found");
    }
}

module.exports = {deleteHouse, deleteBroker, deleteUser, deleteAdmin};