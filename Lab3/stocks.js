const axios = require("axios");
const { getPeople } = require("./people");
const people = require("./people");

async function getStocks() {
    //try removing the await keyword and run the application
    let { data } = await axios.get(
        "https://gist.githubusercontent.com/graffixnyc/8c363d85e61863ac044097c0d199dbcc/raw/7d79752a9342ac97e4953bce23db0388a39642bf/stocks.json",
    );
    // console.dir(data, { depth: null });
    return data;
}

const checkifStringOrExist = (str, name) => {
    if (str == null) {
        throw `\nFunction has not correct parameters.\n`;
    }
    if (typeof str !== "string") {
        throw `\n"${name}" is not a string.\n`;
    }
    if (str.trim().length === 0) {
        throw `\n"${name}" is empty string.\n`;
    }
};

const checkForListShareholders = (flag) => {
    if (flag != null) {
        throw `\nYou are not supposed to pass any arguments.\n`;
    }
};

const listShareholders = async (flag) => {
    checkForListShareholders(flag);
    let stocksdata = await getStocks();
    let peopledata = await getPeople();

    for (i = 0; i < stocksdata.length; i++) {
        for (j = 0; j < peopledata.length; j++) {
            for (k = 0; k < stocksdata[i].shareholders.length; k++) {
                if (stocksdata[i].shareholders[k].userId == peopledata[j].id) {
                    delete stocksdata[i].shareholders[k].userId;
                    if (stocksdata[i].shareholders[k].length == 0) {
                        stocksdata[i].shareholders[k] = [];
                    } else {
                        stocksdata[i].shareholders[k]["first_name"] =
                            peopledata[j].first_name;
                        stocksdata[i].shareholders[k]["last_name"] =
                            peopledata[j].last_name;
                    }
                }
            }
        }
        // for (j = 0; j < stocksdata[i].shareholders.length; i++) {
        //     console.log(stocksdata[i].shareholders[j].userId);
        // }
    }
    return stocksdata;
};

const topShareholder = async (stockName) => {
    checkifStringOrExist(stockName, "stockName");
    let stocksdata = await getStocks();
    let peopledata = await getPeople();
    let stocksArr = [];
    let max = Number.MIN_VALUE;
    for (i = 0; i < stocksdata.length; i++) {
        stocksArr.push(stocksdata[i].stock_name);
        for (j = 0; j < peopledata.length; j++) {
            for (k = 0; k < stocksdata[i].shareholders.length; k++) {
                if (stockName == stocksdata[i].stock_name) {
                    if (stocksdata[i].shareholders[k].number_of_shares > max) {
                        max = stocksdata[i].shareholders[k].number_of_shares;
                    }
                }
            }
        }
    }
    if (!stocksArr.includes(stockName)) {
        throw `\n"${stockName} not found in data."\n`;
    }
    for (i = 0; i < stocksdata.length; i++) {
        for (j = 0; j < peopledata.length; j++) {
            for (k = 0; k < stocksdata[i].shareholders.length; k++) {
                if (
                    stocksdata[i].shareholders[k].number_of_shares == max &&
                    stocksdata[i].shareholders[k].userId == peopledata[j].id &&
                    stocksdata[i].stock_name == stockName
                ) {
                    return `With ${max} shares in ${stockName}, ${peopledata[j].first_name} ${peopledata[j].last_name} is the top shareholder.`;
                }
            }
        }
    }
    throw `\n"${stockName} currently has no shareholders."\n`;

    // console.log(maxName);
};

const listStocks = async (firstName, lastName) => {
    checkifStringOrExist(firstName, "firstName");
    checkifStringOrExist(lastName, "lastName");
    let stocksdata = await getStocks();
    let peopledata = await getPeople();
    let finalArr = [];
    for (i = 0; i < stocksdata.length; i++) {
        for (j = 0; j < peopledata.length; j++) {
            for (k = 0; k < stocksdata[i].shareholders.length; k++) {
                if (
                    firstName.toLowerCase() ==
                        peopledata[j].first_name.toLowerCase() &&
                    lastName.toLowerCase() ==
                        peopledata[j].last_name.toLowerCase()
                ) {
                    if (
                        peopledata[j].id == stocksdata[i].shareholders[k].userId
                    ) {
                        let stockObj = {};
                        stockObj["stock_name"] = stocksdata[i].stock_name;
                        stockObj["number_of_shares"] =
                            stocksdata[i].shareholders[k].number_of_shares;
                        finalArr.push(stockObj);
                    }
                }
            }
        }
    }
    if (finalArr.length == 0) {
        throw `\n${firstName} ${lastName} not found\n`;
    } else if (finalArr.length == 1) {
        throw `\n${firstName} ${lastName} owns only one stock.\n`;
    } else {
        return finalArr;
    }
};

const getStockById = async (id) => {
    checkifStringOrExist(id, "id");
    let stocksdata = await getStocks();
    for (i = 0; i < stocksdata.length; i++) {
        if (id == stocksdata[i].id) {
            return stocksdata[i];
        }
    }
    throw `\nStock not found\n`;
};

module.exports = {
    firstName: "Utsav",
    lastName: "Italiya",
    CWID: "10475248",
    getStocks,
    listShareholders,
    topShareholder,
    listStocks,
    getStockById,
};
