const restaurantsRoutes = require("./restaurants");
const reviewsRoutes = require("./reviews");

const constructorMethod = (app) => {
    app.use("/restaurants", restaurantsRoutes);
    app.use("/reviews", reviewsRoutes);
    app.use("*", (request, response) => {
        response.status(404).json({ error: "Not Found" });
    });
};

module.exports = constructorMethod;
