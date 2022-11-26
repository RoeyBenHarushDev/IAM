const { appendFileSync } = require("fs");
const path = require("path");
const {hash} = require("../validate");

module.exports = class User {
  constructor(
    name,
    email,
    password,
    loginDate = new Date(),
    suspensionDate = null,
    suspensionTime = "0",
    status = "active",
    type= "user"
  ) {
    this.name = name;
    this.email = email;
    this.loginDate = loginDate;
    this.password = hash(password);
    this.suspensionDate = suspensionDate;
    this.suspensionTime = suspensionTime;
    this.status = status;
    this.type= type;
  }

  toCSVRow() {
    const new_user = `\n${this.name},${this.email},${this.password},${this.loginDate},${this.suspensionDate},${this.suspensionTime},${this.status}, ${this.type}`;
    try {
      console.log({ new_user });
      appendFileSync(path.join("./db.csv"), new_user);
    } catch (err) {
      console.error({ err });
    }
  }
};
