const User = require("./modules/User");

function createUserObject(body) {
  const name = body.name;
  const email = body.mail;
  const password = body.pass;
  let user = new User(name, email, password);
  console.log("user in create: " + user);
  user.toCSVRow();
}

module.exports = { createUserObject };

