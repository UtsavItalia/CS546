const express = require("express");
const app = express();
const configRoutes = require("./routes");

configRoutes(app);

app.listen(3000, () => {
    console.log("hello");
    console.log("Server Created");
});
