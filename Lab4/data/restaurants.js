const mongoCollections = require("../config/mongoCollections");
let { ObjectId } = require("mongodb");

const restaurants = mongoCollections.restaurants;

const checkEmptyArgs = (
    name,
    location,
    phoneNumber,
    website,
    priceRange,
    cuisines,
    overallRating,
    serviceOptions,
) => {
    if (
        name == null ||
        location == null ||
        phoneNumber == null ||
        website == null ||
        priceRange == null ||
        cuisines == null ||
        overallRating == null ||
        serviceOptions == null
    )
        throw new Error(
            "You must provide valid information to add a new restaurant",
        );
};

const checkifStringOrEmpty = (
    name,
    location,
    phoneNumber,
    website,
    priceRange,
) => {
    if (typeof name !== "string") {
        throw new Error(`${name} you have entered is not string`);
    }
    if (name.trim().length == 0) {
        throw new Error(`restarurant name string is empty`);
    }

    if (typeof location !== "string") {
        throw new Error(`${location} you have entered is not string`);
    }
    if (location.trim().length == 0) {
        throw new Error(`restarurant location string is empty`);
    }

    if (typeof phoneNumber !== "string") {
        throw new Error(`${phoneNumber} you have entered is not string`);
    }
    if (phoneNumber.trim().length == 0) {
        throw new Error(`restarurant phone number string is empty`);
    }

    if (typeof website !== "string") {
        throw new Error(`${website} you have entered is not string`);
    }
    if (website.trim().length == 0) {
        throw new Error(`restarurant website string is empty`);
    }

    if (typeof priceRange !== "string") {
        throw new Error(`${priceRange} you have entered is not string`);
    }
    if (priceRange.trim().length == 0) {
        throw new Error(`restarurant price range string is empty`);
    }
};

const checkPhoneNumber = (phoneNumber) => {
    if (
        !(
            phoneNumber.length == 12 &&
            !isNaN(phoneNumber.split("")[0]) &&
            !isNaN(phoneNumber.split("")[1]) &&
            !isNaN(phoneNumber.split("")[2]) &&
            phoneNumber.split("")[3] == "-" &&
            !isNaN(phoneNumber.split("")[4]) &&
            !isNaN(phoneNumber.split("")[5]) &&
            !isNaN(phoneNumber.split("")[6]) &&
            phoneNumber.split("")[7] == "-" &&
            !isNaN(phoneNumber.split("")[8]) &&
            !isNaN(phoneNumber.split("")[9]) &&
            !isNaN(phoneNumber.split("")[10]) &&
            !isNaN(phoneNumber.split("")[11])
        )
    ) {
        throw new Error(`Enter Valid phone number`);
    }
};

const checkWebsite = (website) => {
    const regExURL = /(http:\/\/www.)[a-zA-Z0-9]{5,}(.com)/g;
    if (!website.match(regExURL)) {
        throw new Error(`Enter a valid Website`);
    }
};

const checkPriceRange = (priceRange) => {
    const regExPR = /^[$]{1,4}$/g;
    if (!priceRange.match(regExPR)) {
        throw new Error(`Enter a valid price range`);
    }
};

const checkCuisineArr = (cuisines) => {
    if (!Array.isArray(cuisines)) {
        throw new Error(`You must provide array of cuisines`);
    }
    if (cuisines.length === 0) {
        throw new Error(`Cuisines array must have atleast one cuisine`);
    }
    for (i = 0; i < cuisines.length; i++) {
        if (typeof cuisines[i] !== "string") {
            throw new Error(`You must add cuisines as string`);
        }
    }
};

const checkServiceOptions = (serviceOptions) => {
    if (typeof serviceOptions !== "object" || Array.isArray(serviceOptions)) {
        throw new Error(`You must provide object of service options`);
    }
    for (const key in serviceOptions) {
        if (typeof serviceOptions[key] !== "boolean") {
            throw new Error(`You must enter valid service key values`);
        }
    }
};

const checkId = (id) => {
    if (id == null) {
        throw new Error(`you must provide an id`);
    }
    if (typeof id !== "string") {
        throw new Error(`${id} you have entered is not string`);
    }
    if (id.trim().length == 0) {
        throw new Error(`id string is empty`);
    }
};

const checkNewWeb = (newWebsite) => {
    if (typeof newWebsite !== "string") {
        throw new Error(`${website} you have entered is not string`);
    }
    if (newWebsite.trim().length == 0) {
        throw new Error(`restarurant website string is empty`);
    }
    const regExURL = /(http:\/\/www.)[a-zA-Z0-9]{5,}(.com)/g;
    if (!newWebsite.match(regExURL)) {
        throw new Error(`Enter a valid Website`);
    }
};

const create = async (
    name,
    location,
    phoneNumber,
    website,
    priceRange,
    cuisines,
    overallRating,
    serviceOptions,
) => {
    //check if argument is passed or not
    checkEmptyArgs(
        name,
        location,
        phoneNumber,
        website,
        priceRange,
        cuisines,
        overallRating,
        serviceOptions,
    );
    //check if string entered of null
    checkifStringOrEmpty(
        name,
        location,
        phoneNumber,
        website,
        priceRange,
        cuisines,
        overallRating,
        serviceOptions,
    );
    //check for valid phonenumber
    checkPhoneNumber(phoneNumber);
    //check for valid website
    checkWebsite(website);
    //check for valid pricerange
    checkPriceRange(priceRange);
    //check for valid cuisines array
    checkCuisineArr(cuisines);
    //check if serviceoptions is not an object
    checkServiceOptions(serviceOptions);

    const restaurantsCollection = await restaurants();
    let newRestaurant = {
        name: name,
        location: location,
        phoneNumber: phoneNumber,
        website: website,
        priceRange: priceRange,
        cuisines: cuisines,
        overallRating: overallRating,
        serviceOptions: serviceOptions,
    };
    const insertInfo = await restaurantsCollection.insertOne(newRestaurant);
    if (insertInfo.insertedCount === 0)
        throw new Error(`Could not add restaurant`);

    return get(insertInfo.insertedId.toString());
};

const getAll = async () => {
    const restaurantsCollection = await restaurants();
    const restarurantlist = await restaurantsCollection.find({}).toArray();
    for (let i = 0; i < restarurantlist.length; i++) {
        restarurantlist[i]._id = restarurantlist[i]._id.toString();
    }
    return restarurantlist;
};

const get = async (id) => {
    checkId(id);
    id = ObjectId(id);
    const restaurantsCollection = await restaurants();
    const restarurant = await restaurantsCollection.findOne({
        _id: id,
    });
    if (restarurant === null) {
        throw new Error(`No restaurant found for id ${id}`);
    }

    restarurant._id = restarurant._id.toString();
    return restarurant;
};

const remove = async (id) => {
    checkId(id);
    id = ObjectId(id);

    let restaurant = await get(id.toString());

    const restaurantsCollection = await restaurants();
    const deletionInfo = await restaurantsCollection.deleteOne({ _id: id });

    if (deletionInfo.deletedCount === 0) {
        throw new Error(`Could not remove restaurant of id ${id}`);
    }
    restaurant._id = restaurant._id.toString();
    return `${restaurant.name} has been successfully deleted!`;
};

const rename = async (id, newWebsite) => {
    checkId(id);
    checkNewWeb(newWebsite);

    id = ObjectId(id);
    const restaurantsCollection = await restaurants();
    const restaurant = await get(id.toString());
    if (restaurant.website == newWebsite) {
        throw new Error(
            `New website is same as current website, try different website`,
        );
    }
    const updatedRestaurant = {
        website: newWebsite,
    };

    const updatedInfo = await restaurantsCollection.updateOne(
        { _id: id },
        { $set: updatedRestaurant },
    );
    if (updatedInfo.modifiedCount === 0) {
        throw new Error("could not update website of restaurant");
    }
    restaurant._id = restaurant._id.toString();
    return await get(id.toString());
};

const update = async (
    id,
    name,
    location,
    phoneNumber,
    website,
    priceRange,
    cuisines,
    overallRating,
    serviceOptions,
) => {
    checkEmptyArgs(
        id,
        name,
        location,
        phoneNumber,
        website,
        priceRange,
        cuisines,
        overallRating,
        serviceOptions,
    );
    checkifStringOrEmpty(
        id,
        name,
        location,
        phoneNumber,
        website,
        priceRange,
        cuisines,
        overallRating,
        serviceOptions,
    );
    checkPhoneNumber(phoneNumber);
    checkWebsite(website);
    checkPriceRange(priceRange);
    checkCuisineArr(cuisines);
    checkServiceOptions(serviceOptions);
    const restaurantsCollection = await restaurants();
    const updatedRestaurant = {
        name: name,
        location: location,
        phoneNumber: phoneNumber,
        website: website,
        priceRange: priceRange,
        cuisines: cuisines,
        overallRating: overallRating,
        serviceOptions: serviceOptions,
    };

    const updatedInfo = await restaurantsCollection.updateOne(
        { _id: id },
        { $set: updatedRestaurant },
    );
    if (updatedInfo.modifiedCount === 0) {
        throw new Error(`Could not Update restaurant of id ${id}`);
    }
    updatedRestaurant._id = updatedRestaurant._id.toString();
    return await this.get(id);
};

module.exports = { create, getAll, get, remove, rename, update };
