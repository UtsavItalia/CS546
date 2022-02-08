const peopleRoutes = require("./people");
const stocksRoutes = require("./stocks");

const constructorMethod = (app) => {
    app.use("/people", peopleRoutes);
    app.use("/stocks", stocksRoutes);
    app.use("*", (request, response) => {
        response.status(404).json({ error: "Not Found" });
    });
};

module.exports = constructorMethod;
