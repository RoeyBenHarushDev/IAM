const crypto = require("crypto");
const fs = require("fs");
const server = require("./index.js");
const dbHandler = require("./dbHandler");
const path = require("path");

require("dotenv").config({ path: path.join(__dirname, ".env") });

const { secret } = process.env;

function hash(key) {
  return crypto.createHmac("sha256", secret).update(key).digest("hex");
}

function validateSuspention(user) {
  if (user.suspensionTime =='0' || user.suspendStartDate == null){
    server.logger.log(`user: ${user["email"]} is not suspended- login succeeded`);
    return;
  }
  console.log(user);
  const suspendTime = user["suspensionTime"];
  const suspendStartDate = user["suspensionDate"];
  const [day, month, year] = suspendStartDate.split("/");
  const suspendStartDate_date = new Date(year, month, day);
  const today = new Date();
  let expiredDate = new Date();
  expiredDate.setDate(suspendStartDate_date.getDate() + parseInt(suspendTime));
  console.log(
    `suspend : ${suspendStartDate_date} time: ${suspendTime}  expired: ${expiredDate} today: ${today}`
  );

  /*console.log(`aftet sum: `);*/
  if (expiredDate.getDate() < today.getDate()) {
    /*user is not suspend*/
    server.logger.log(`user: ${user["email"]} is not suspended- login succeeded`);

  } else {
    server.logger.log(`user: ${user["email"]} is suspended- login failed`);
    throw new Error(`User ${user["email"]} is suspended!`);
  }
}
/*check if user password equal to user hashedPassword from csv*/
function validatePassword(userObj) {
  const user = dbHandler.emailToUser(userObj.mail);
  const a=hash(userObj.pass);
    const b=hash(user.password);
  if (hash(userObj.pass) === hash(user.password)) {
    server.logger.log(
      `user: ${userObj.mail} entered correct password- starts confirm suspension`
    );
  
    validateSuspention(user); //add try
    
  } else {
    server.logger.log(
      `user: ${userObj.mail} entered wrong password- login failed`
    );
    throw new Error("Incorrect password");

  }
}

const statusOfUser = (status) => {
  if (status == "admin") {
    return "admin";
  } else {
    return status == "user";
  }
};

module.exports = { validatePassword, hash };
