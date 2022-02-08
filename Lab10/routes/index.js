const { request, response } = require("express");
const usersData = require("../data/users");

const checkForValidInputs = (username, password) => {
  // let whiteSpace = new RegExp("/^s+$/");
  let validUsername = new RegExp("^[a-zA-Z0-9 ]*$");
  if (!username || !password) {
    throw new Error(`Enter both username and password`);
  }
  if (username.length < 4) {
    throw new Error(`Username length must be atleast 4.`);
  }
  if (username.indexOf(" ") >= 0) {
    throw new Error(`Username cannot have spaces.`);
  }
  if (!validUsername.test(username)) {
    throw new Error(`Username cannot have special characters.`);
  }
  if (password.length < 6) {
    throw new Error(`password length must be atleast 6.`);
  }
  if (password.indexOf(" ") >= 0) {
    throw new Error(`password cannot have spaces.`);
  }
};

const constructorMethod = (app) => {
  app.get("/", async (request, response) => {
    response.render("login", {
      title: "Enter username and password to Log in",
    });
  });

  app.get("/signup", async (request, response) => {
    response.render("signup", {
      title: "Enter username and password to Sign Up",
    });
  });

  app.post("/signup", async (request, response) => {
    const username = request.body.username;
    const password = request.body.password;

    try {
      checkForValidInputs(username, password);
      let user = await usersData.createUser(username, password);
      if (user.userInserted) {
        response.redirect("/");
      } else {
        response
          .status(500)
          .render("error", { error: `Internal Server Error` });
      }
    } catch (e) {
      response.status(400).render("signup", {
        error: e,
        title: "Enter username and password to SignUp",
      });
    }
  });

  app.post("/login", async (request, response) => {
    const username = request.body.username;
    const password = request.body.password;

    try {
      checkForValidInputs(username, password);
      let user = await usersData.checkUser(username, password);
      if (user.authenticated) {
        request.session.user = username;
        response.redirect("/private");
      } else {
        response
          .status(500)
          .render("error", { error: `Internal Server Error` });
      }
    } catch (e) {
      response.status(400).render("login", {
        error: e,
        title: "Enter username and password to SignUp",
      });
    }
  });

  app.get("/private", async (request, response) => {
    response.render("private", { username: request.session.user });
  });

  app.get("/logout", async (request, response) => {
    request.session.destroy();
    response.render("logout", { title: "You have been logged out" });
  });
};

module.exports = constructorMethod;
