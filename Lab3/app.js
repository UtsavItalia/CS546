const {
    getPersonById,
    getPeople,
    sameStreet,
    manipulateSsn,
    sameBirthday,
} = require("./people");
const people = require("./people");
const {
    listShareholders,
    topShareholder,
    listStocks,
    getStockById,
} = require("./stocks");
const stocks = require("./stocks");

// console.log(getPersonById(100));

const main = async () => {
    //people.js
    //
    //getPersonById() function test cases.
    //Should pass
    try {
        let peopledata = await getPersonById(
            "7989fa5e-8f3f-458d-ad58-23c8d9ef5a10",
        );
        console.dir(peopledata, { depth: null });
    } catch (e) {
        console.log(e);
    }

    //Should fail
    try {
        let peopledata = await getPersonById(
            "7989fa5e-5617-43f7-a931-46036f9dbcff",
        ); //Person not found
        // let peopledata = await getPersonById(); //Function has no parameters exist.
        // let peopledata = await getPersonById(1001); //"id" is not a string.
        // let peopledata = await getPersonById(-1); // "id" is not a string.
        // let peopledata = await getPersonById("           "); // "id" is empty.
        console.dir(peopledata, { depth: null });
    } catch (e) {
        console.log(e);
    }

    //sameStreet() function test cases.
    //should pass
    try {
        let peopledata = await sameStreet("sutherland", "point");
        console.dir(peopledata, { depth: null });
    } catch (e) {
        console.log(e);
    }

    //should fail
    try {
        let peopledata = await sameStreet("Crownhardt", "Park");
        // let peopledata = await sameStreet();
        // let peopledata = await sameStreet("Street");
        // let peopledata = await sameStreet(1, "Street"); //"streetName" is not a string.
        // let peopledata = await sameStreet("Street", 1); //"streetSuffix" is not a string.
        console.dir(peopledata, { depth: null });
    } catch (e) {
        console.log(e);
    }

    //manipulateSsn() function test case.
    try {
        let peopledata = await manipulateSsn();
        console.dir(peopledata, { depth: null });
    } catch (e) {
        console.log(e);
    }

    //sameBirthday() function test cases
    //Should pass
    try {
        let peopledata = await sameBirthday("09", "25");
        // let peopledata = await sameBirthday(09, 25);
        // let peopledata = await sameBirthday(9, 25);
        console.dir(peopledata, { depth: null });
    } catch (e) {
        console.log(e);
    }

    //Should fail
    try {
        let peopledata = await sameBirthday(09, 31); //There are not 31 days in Sept
        // let peopledata = await sameBirthday(13, 25); // Month > 12
        // let peopledata = await sameBirthday(0, 25); // Month <1
        // let peopledata = await sameBirthday(5, 0); // Month <1
        // let peopledata = await sameBirthday(02, 29); //There are not 29 days in Feb
        // let peopledata = await sameBirthday("09", "31"); //There are not 31 days in Sept
        // let peopledata = await sameBirthday("      ", "25"); //Throws Error
        console.dir(peopledata, { depth: null });
    } catch (e) {
        console.log(e);
    }

    //stocks.js
    //
    // listShareHolders() test Cases.
    //should pass
    try {
        let stocksdata = await listShareholders();
        console.dir(stocksdata, { depth: null });
    } catch (e) {
        console.log(e);
    }

    //should pass
    try {
        let stocksdata = await listShareholders(
            "7283e5d6-7481-41cb-83b3-5a4a2da34717",
        );
        // let stocksdata = await listShareholders(
        //     "Nuveen Preferred and Income 2022 Term Fund",
        // );
        console.dir(stocksdata, { depth: null });
    } catch (e) {
        console.log(e);
    }

    //topShareholder() test cases.
    //should pass
    try {
        let stocksdata = await topShareholder(
            "Nuveen Floating Rate Income Fund",
        );
        // let stocksdata = await topShareholder("Aeglea BioTherapeutics, Inc.");
        console.dir(stocksdata, { depth: null });
    } catch (e) {
        console.log(e);
    }

    //should fail
    try {
        let stocksdata = await topShareholder("foobar Inc");
        // let stocksdata = await topShareholder(43);
        // let stocksdata = await topShareholder("    ");
        // let stocksdata = await topShareholder();

        console.dir(stocksdata, { depth: null });
    } catch (e) {
        console.log(e);
    }

    //listStocks() test cases.
    //should pass
    try {
        let stocksdata = await listStocks("Grenville", "Pawelke");
        console.dir(stocksdata, { depth: null });
    } catch (e) {
        console.log(e);
    }

    //should fail
    try {
        let stocksdata = await listStocks("Patrick", "Hill");
        // let stocksdata = await listStocks();
        // let stocksdata = await listStocks("foo");
        // let stocksdata = await listStocks("      ", "        ");
        // let stocksdata = await listStocks(1, 2);s
        console.dir(stocksdata, { depth: null });
    } catch (e) {
        console.log(e);
    }

    //getStockById() test cases
    //should pass
    try {
        let stocksdata = await getStockById(
            "f652f797-7ca0-4382-befb-2ab8be914ff0",
        );
        console.dir(stocksdata, { depth: null });
    } catch (e) {
        console.log(e);
    }

    //should fail
    try {
        let stocksdata = await getStockById(
            "7989fa5e-5617-43f7-a931-46036f9dbcff",
        );
        // let stocksdata = await getStockById();
        // let stocksdata = await getStockById(-1);
        // let stocksdata = await getStockById(1001);

        console.dir(stocksdata, { depth: null });
    } catch (e) {
        console.log(e);
    }
};

main();
