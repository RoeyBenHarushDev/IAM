const { appendFileSync } = require("fs");
const path = require("path");

module.exports = class User {
  constructor(
    name,
    email,
    password,
    loginDate = new Date(),
    suspensionDate = null,
    suspensionTime = "0",
    status = "inactive"
  ) {
    this.name = name;
    this.email = email;
    this.loginDate = loginDate;
    this.password = password;
    this.suspensionDate = suspensionDate;
    this.suspensionTime = suspensionTime;
    this.status = status;
  }

  toCSVRow() {
    const new_user = `${this.name},${this.email},${this.password},${this.loginDate},${this.suspensionDate},${this.suspensionTime},${this.status}\n`;
    try {
      console.log({ new_user });
      appendFileSync(path.join('server', "test.csv"), new_user);
    } catch (err) {
      console.error({ err });
    }
  }
};
