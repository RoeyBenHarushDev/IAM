const { constructResponse } = require("../utils");
const validate = require("../validate");
const writeCsv = require("../writeCsv");
const { sendEmail, otpCompare } = require("../Auth.js");

module.exports = {
  "/login": function handleLogin(body, response) {
    try {
      validate.emailToUser(body.mail);
      validate.validatePassword(body);
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
