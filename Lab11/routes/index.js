const constructorMethod = (app) => {
  app.get("/", function (request, response) {
    response.render("home");
  });

  app.use("*", (request, response) => {
    res.sendStatus(404);
  });
};

module.exports = constructorMethod;
