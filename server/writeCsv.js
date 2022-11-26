const User = require("./modules/User");
const validate = require("./validate")

function createUserObject(body) {
  const name = body.name;
  const email = body.mail;
  const password = validate.hash(body.pass);
  let user = new User(name, email, password);
  // server.logger.log("user in create: " + user);
  user.toCSVRow();
}

module.exports = { createUserObject };

