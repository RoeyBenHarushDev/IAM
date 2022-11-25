const crypto = require("crypto");
const fs = require("fs");
const server = require("./index.js");
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, ".env") });

let result = [];

const { secret } = process.env;

function hash(key) {
  return crypto.createHmac("sha256", secret).update(key).digest("hex");
}

function validateSuspention(user) {
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
    throw new Error(`User ${user["email"]} is suspended!`);
    server.logger.log(`user: ${user["email"]} is suspended- login failed`);
  }
}
/*check if user password equal to user hashedPassword from csv*/
function validatePassword(userObj) {
  const user = emailToUser(userObj.mail);
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
    //emit bad Pass and logger
  }
}

function emailToUser(email) {
  const user = result.find((user) => (user) => {
    return user.email === email;
  });
  return user ? user : "No match found";
}

/*reading csv file into result -> array of jsons*/
function readCsvFile() {
  var filePath = path.join(__dirname, "test.csv");
  var f = fs.readFileSync(filePath, { encoding: "utf-8" }, function (err) {
    console.log(err);
  });
  f = f.split("\n");
  headers = f.shift().split(",");
  f.forEach(function (d) {
    tmp = {};
    row = d.split(",");
    for (var i = 0; i < headers.length - 1; i++) {
      tmp[headers[i]] = row[i];
    }
    result.push(tmp);
  });
}

const statusOfUser = (status) => {
  if (status == "admin") {
    return "admin";
  } else {
    return status == "user";
  }
};

module.exports = { readCsvFile, validatePassword, hash, emailToUser };
