const crypto = require("crypto");
const server = require("./index.js");
const dbHandler = require("./dbHandler");
const path = require("path");

require("dotenv").config({ path: path.join(__dirname, ".env") });
const secret = process.env.secret;

function hash(key) {
  return crypto.createHmac("sha256", secret).update(key).digest("hex");
}

function validateSuspension(user) {
  if (user.suspensionTime =='0' || user.suspensionDate== null){
    server.logger.log(`user: ${user["email"]} is not suspended- login succeeded`);
    return;
  }

  const suspendTime = user["suspensionTime"];
  const suspendStartDate = user["suspensionDate"];
  const [day, month, year] = suspendStartDate.split("/");
  const suspendStartDate_date = new Date(year, month, day);
  const today = new Date();
  let expiredDate = new Date();
  expiredDate.setDate(suspendStartDate_date.getDate() + parseInt(suspendTime));
  server.logger.log(
    `suspend : ${suspendStartDate_date} time: ${suspendTime}  expired: ${expiredDate} today: ${today}`
  );

  if (expiredDate.getDate() < today.getDate()) {
    /*user is not suspend*/
    server.logger.log(`user: ${user["email"]} is not suspended- login succeeded`);

  } else {
    server.logger.log(`user: ${user["email"]} is suspended- login failed`,'ERROR');
    return 0;
  }
  return 1;
}
/*check if user password equal to user hashedPassword from csv*/
function validatePassword(userObj) {
  const user = dbHandler.emailToUser(userObj.mail);
  if (user==="no match found"){
    throw new Error("no match found");
  }
  if (hash(userObj.pass) === user.password) {
    server.logger.log(
      `user: ${userObj.mail} entered correct password- starts confirm suspension`
    );
  
   if(validateSuspension(user) === 0){throw "suspended!";}
    
  } else {
    server.logger.log(
      `user: ${userObj.mail} entered wrong password- login failed`,'ERROR'
    );
    throw new Error("Incorrect password");

  }
}

const statusOfUser = (status) => {
  if (status === "admin") {
    return "admin";
  } else {
    return status === "user";
  }
};

module.exports = { validatePassword, hash };
