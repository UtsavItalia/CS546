const dbConnection = require("./config/mongoConnection");
const restaurants = require("./data/restaurants");
const connection = require("./config/mongoConnection");

const main = async () => {
    const chipotle = await restaurants.create(
        "chipotle",
        "Hoboken, New Jersey",
        "221-321-6547",
        "http://www.chipotle.com",
        "$$",
        ["Mexican", "Indian"],
        4,
        { dineIn: true, takeOut: true, delivery: true },
    );

    const IndieKitch = await restaurants.create(
        "Indian Kitchen",
        "New York City, New York",
        "551-975-4354",
        "http://www.indiekitch.com",
        "$$$",
        ["indian", "kebab", "barbaque"],
        5,
        { dineIn: false, takeOut: true, delivery: false },
    );

    const McDonald = await restaurants.create(
        "McDonald's",
        "Jersey City, New Jersey",
        "201-949-5464",
        "http://www.mcdonalds.com",
        "$",
        ["american", "burger"],
        3,
        { dineIn: false, takeOut: false, delivery: true },
    );

    const db = await dbConnection();
    await db.serverConfig.close();
    console.log("Connection Closed!");
};

main().catch(async (e) => {
    const db = await dbConnection();
    console.log(e);
    await db.serverConfig.close();
});

/*
{
    "_id": "617a0e9b723f405190bbc728",
    "name": "The Saffron Lounge",
    "location": "New York City, New York",
    "phoneNumber": "123-456-7890",
    "website": "http://www.saffronlounge.com",
    "priceRange": "$$$$",
    "cuisines": [
        "Cuban",
        "Italian"
    ],
    "serviceOptions": {
        "dineIn": true,
        "takeOut": true,
        "delivery": false
    }
}

{
    "_id": "617a10ba723f405190bbc729",
    "name": "chipotle",
    "location": "Hoboken, New Jersey",
    "phoneNumber": "221-321-6547",
    "website": "http://www.chipotle.com",
    "priceRange": "$$",
    "cuisines": [
        "Mexican",
        "Indian"
    ],
    "serviceOptions": {
        "dineIn": true,
        "takeOut": true,
        "delivery": true
    }
}

{
    "_id": "617a1124723f405190bbc72a",
    "name": "Indian Kitchen",
    "location": "New York City, New York",
    "phoneNumber": "551-975-4354",
    "website": "http://www.indiekitch.com",
    "priceRange": "$$$",
    "cuisines": [
        "indian",
        "kebab",
        "barbaque"
    ],
    "serviceOptions": {
        "dineIn": false,
        "takeOut": true,
        "delivery": false
    }
}

*/
