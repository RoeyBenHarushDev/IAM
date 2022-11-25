const { constructResponse } = require("../utils");
const dbHandler = require("../dbHandler");
const writeCsv = require("../writeCsv");
const validate = require("../validate")
const { sendEmail, otpCompare } = require("../Auth.js");

module.exports = {
  "/login": function handleLogin(body, response) {
    try {
        console.log(body);
        validate.validatePassword(body);
      dbHandler.readCsvFile();
      return constructResponse(response, { location: "HomePage.html" });
    } catch (e) {
      console.log(e);
      return constructResponse(response, { error: e.message }, 401);
    }
  },
  "/signup": function handleSignup(body, response) {
    try {
      console.log({ body });
      writeCsv.createUserObject(body);
      dbHandler.readCsvFile();
      //sendEmail(body.mail);
      return constructResponse(response, {}, 200);
    } catch (e) {
      console.log(e);
      return constructResponse(response, { error: e.message }, 401);
    }
  },
  "/confirm": function handleConfirm(body, response) {
    try {
      let log = otpCompare(body.mail, body.code);
      //response.write(log);
      let pass = validate.hash(body.pass);
      return constructResponse(response, {});
    } catch (e) {
      return constructResponse(response, { error: e.message }, 401);
    }
  },
  "/forgotPassword": function handleForgotPass(body, response) {
    try {
      console.log("url forgen");
      return constructResponse(response, {});
    } catch (e) {
      console.log(e);
      return constructResponse(response, { error: e.message }, 401);
    }
  },
};
