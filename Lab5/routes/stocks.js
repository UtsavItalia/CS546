const express = require("express");
const router = express.Router();
const data = require("../data");
const stocksData = data.stocks;

router.get("/", async (request, response) => {
    try {
        const stocks = await stocksData.getStocks();
        response.json(stocks);
    } catch {
        response.status(500).send();
    }
});

router.get("/:id", async (request, response) => {
    try {
        const stocks = await stocksData.getStockById(request.params.id);
        response.json(stocks);
    } catch (e) {
        response.status(404).json({ message: e });
    }
});

module.exports = router;
