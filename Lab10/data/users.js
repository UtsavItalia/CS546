const mongoCollections = require("../config/mongoCollections");
const users = mongoCollections.users;
const bcrypt = require("bcrypt");
const saltRounds = 16;

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

async function createUser(username, password) {
  checkForValidInputs(username, password);
  const usersCollection = await users();
  const hash = await bcrypt.hash(password, saltRounds);

  const user = await usersCollection.findOne({
    username: username.toLowerCase(),
  });
  if (user === null) {
    let newUser = {
      username: username.toLowerCase(),
      password: hash,
    };
    const insertInfo = await usersCollection.insertOne(newUser);
    if (insertInfo.insertedCount === 0) {
      throw new Error(`Could not add user.`);
    }
  } else {
    throw new Error(`there is already a user with that username`);
  }

  return { userInserted: true };
}

async function checkUser(username, password) {
  checkForValidInputs(username, password);
  const usersCollection = await users();
  const user = await usersCollection.findOne({
    username: username.toLowerCase(),
  });

  if (user === null) {
    throw new Error(`Either the username or password is invalid`);
  }

  let compareToMatch = false;
  try {
    compareToMatch = await bcrypt.compare(password, user.password);
  } catch (e) {}

  if (compareToMatch) {
    return { authenticated: true };
  } else {
    throw new Error(`Either the username or password is invalid`);
  }
}

module.exports = {
  createUser,
  checkUser,
};
