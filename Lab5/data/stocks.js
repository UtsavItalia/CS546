const axios = require("axios");

async function getStocks() {
    //try removing the await keyword and run the application
    let { data } = await axios.get(
        "https://gist.githubusercontent.com/graffixnyc/8c363d85e61863ac044097c0d199dbcc/raw/7d79752a9342ac97e4953bce23db0388a39642bf/stocks.json",
    );
    // console.dir(data, { depth: null });
    return data;
}

const getStockById = async (id) => {
    let stocksdata = await getStocks();
    for (i = 0; i < stocksdata.length; i++) {
        if (id == stocksdata[i].id) {
            return stocksdata[i];
        }
    }
    throw `there is no stock with that ID`;
};

module.exports = {
    getStockById,
    getStocks,
};
