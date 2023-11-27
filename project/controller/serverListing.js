const {
    getHouseLocation,
    getHousePriceHigher,
    getHousePriceLower,
    getHouseBathgreaterThan,
    getHouseBedgreaterThan,
    getHouseBuildYRSGreater,
    getHouseStories,
    getHouseGarage,
    getHouseBuildType,
    getHouseFurnished,
    getHouseextra,
    getHouseSizeOfPropGreater,
    getHouseListingType,
    getHouseAfterDate,
    readHouses
} = require("../model/database/getDB");
const {ObjectId} = require("mongodb");

async function buy_rentJS(req, client) {

    let location = req.body.location.toLowerCase();
    let minPrice = req.body.minPrice;
    let maxPrice = req.body.maxPrice;
    let bath = req.body.bath;
    let beds = req.body.beds;
    let yearBuild = req.body.yearBuild;
    let floors = req.body.floors;
    let garage = req.body.garage;
    let prop = req.body.prop;
    let furnished = req.body.furnished;
    let extra = req.body.extra;
    let propsize = req.body.propsize;
    let listingType = req.body.listing;
    let time = req.body.time;
    arr = [];
    let arr11 = [];
    let isEmpty = false; // if is empty is true at the end whatever that was search was no good

    if (location !== "") {
        location = await getHouseLocation(client, location);
        if (location.length !== 0) {
            for (let i = 0; i < location.length; i++) {
                arr11.push(location[i]._id.toString());
            }
            arr.push(arr11);
            arr11 = [];
        } else if (isEmpty === true) isEmpty = true;
    }
    if (minPrice !== "") {
        minPrice = await getHousePriceHigher(client, parseInt(minPrice));
        if (minPrice.length !== 0) {
            for (let i = 0; i < minPrice.length; i++) {
                arr11.push(minPrice[i]._id.toString());
            }
            arr.push(arr11);
            arr11 = [];
        } else if (isEmpty === true) isEmpty = true;

    }
    if (maxPrice !== "") {
        maxPrice = await getHousePriceLower(client, parseInt(maxPrice));
        if (maxPrice.length !== 0) {

            for (let i = 0; i < maxPrice.length; i++) {
                arr11.push(maxPrice[i]._id.toString());
            }
            arr.push(arr11);
            arr11 = [];
        } else if (isEmpty === true) isEmpty = true;

    }
    if (bath !== "any") {
        bath = await getHouseBathgreaterThan(client, parseInt(bath));
        if (bath.length !== 0) {

            for (let i = 0; i < bath.length; i++) {
                arr11.push(bath[i]._id.toString());
            }
            arr.push(arr11);
            arr11 = [];

        }

    }
    if (beds !== "any") {
        beds = await getHouseBedgreaterThan(client, parseInt(beds));
        if (beds.length !== 0) {

            for (let i = 0; i < beds.length; i++) {
                arr11.push(beds[i]._id.toString());
            }
            arr.push(arr11);
            arr11 = [];

        }

    }
    if (yearBuild !== "") {
        yearBuild = await getHouseBuildYRSGreater(client, parseInt(yearBuild));
        if (yearBuild.length !== 0) {
            for (let i = 0; i < yearBuild.length; i++) {
                arr11.push(yearBuild[i]._id.toString());
            }
            arr.push(arr11);
            arr11 = [];
        } else if (isEmpty === true) isEmpty = true;

    }
    if (floors !== "any") {
        floors = await getHouseStories(client, parseInt(floors));

        if (floors.length !== 0) {
            for (let i = 0; i < floors.length; i++) {
                arr11.push(floors[i]._id.toString());
            }
            arr.push(arr11);
            arr11 = [];

        }

    }

    if (garage !== "any") {
        garage = await getHouseGarage(client, garage);
        if (garage.length !== 0) {
            for (let i = 0; i < garage.length; i++) {
                arr11.push(garage[i]._id.toString());
            }
            arr.push(arr11);
            arr11 = [];

        }

    }
    if (prop !== "any") {
        prop = await getHouseBuildType(client, prop);
        if (prop.length !== 0) {
            for (let i = 0; i < prop.length; i++) {
                arr11.push(prop[i]._id.toString());
            }
            arr.push(arr11);
            arr11 = [];

        }

    }
    if (furnished !== "any") {
        furnished = await getHouseFurnished(client, furnished);
        if (furnished.length !== 0) {
            for (let i = 0; i < furnished.length; i++) {
                arr11.push(furnished[i]._id.toString());
            }
            arr.push(arr11);
            arr11 = [];
        }

    }
    if (extra !== "any") {
        extra = await getHouseextra(client, extra);
        if (extra.length !== 0) {
            for (let i = 0; i < extra.length; i++) {
                arr11.push(extra[i]._id.toString());
            }
            arr.push(arr11);
            arr11 = [];
        }

    }
    if (propsize !== "") {
        propsize = await getHouseSizeOfPropGreater(client, propsize);
        if (propsize.length !== 0) {
            for (let i = 0; i < propsize.length; i++) {
                arr11.push(propsize[i]._id.toString());
            }
            arr.push(arr11);
            arr11 = [];
        } else if (isEmpty === true) isEmpty = true;

    }
    if (listingType !== "any") {
        listingType = await getHouseListingType(client, listingType);
        if (listingType.length !== 0) {

            for (let i = 0; i < listingType.length; i++) {
                arr11.push(listingType[i]._id.toString());
            }
            arr.push(arr11);
            arr11 = [];
        }

    }
    if (time !== "") { //CHECK
        time = await getHouseAfterDate(client, new Date(time));
        if (time.length !== 0) {
            for (let i = 0; i < time.length; i++) {
                arr11.push(time[i]._id.toString());
            }
            arr.push(arr11);
            arr11 = [];
        } else if (isEmpty === true) isEmpty = true;

    }


    let holdArr = [];
    if (arr.length === 0) {
        isEmpty = true;
        holdArr = await readHouses(client);
        for (let i = 0; i < holdArr.length; i++) {
            arr11.push(holdArr[i]._id.toString());
        }
        arr.push(arr11);
    }

    let newArr = arr.reduce((x, y) => x.filter((z) => y.includes(z)));


    console.log(newArr);

    let houseArr = [];
    for (let i = 0; i < newArr.length; i++) {
        houseArr.push(await client.db("soen_341").collection("houses").findOne({_id: new ObjectId(newArr[i])}));
    }

    //  const houses = await client.db("soen_341").collection("houses").find().toArray();
    const pics = await client.db("soen_341").collection("house_pic").find().toArray();
    for (let i = 0; i < houseArr.length; i++) {
        for (let j = 0; j < pics.length; j++) {
            if (houseArr[i].image_id.toString() === pics[j]._id.toString())
                houseArr[i].image = pics[j].file;
        }
    }
    const arr1 = [];
    arr1.push(houseArr);
    arr1.push(isEmpty);

    return arr1;
}


async function returnHouse(client) {
    const houses = await client.db("soen_341").collection("houses").find().toArray();
    const pics = await client.db("soen_341").collection("house_pic").find().toArray();
    for (let i = 0; i < houses.length; i++) {
        for (let j = 0; j < pics.length; j++) {
            if (houses[i].image_id.toString() === pics[j]._id.toString())
                houses[i].image = pics[j].file;
        }
    }
    return houses;

}

module.exports = {buy_rentJS, returnHouse};