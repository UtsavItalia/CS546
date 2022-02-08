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
    console.log(chipotle);

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

    const updated = await restaurants.update(
        "617a14bc25433e49fc6c128a",
        "Saffron Lounge",
        "SoHo, New York",
        "123-456-1234",
        "http://www.thesaffronlounge.com",
        "$$$",
        ["Italian"],
        3,
        { dineIn: false, takeOut: false, delivery: true },
    );

    const db = await connection();
    await db.serverConfig.close();
    console.log("Connection Closed!");
};

main().catch(async (e) => {
    console.log(e.message);
    const db = await connection();
    await db.serverConfig.close();
});
