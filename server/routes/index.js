const {constructResponse} = require("../utils");
const dbHandler = require("../dbHandler");
const writeCsv = require("../writeCsv");
const validate = require("../validate")
const {sendEmail, otpCompare, forgotPass, userExist} = require("../Auth.js");



module.exports = {
    "/login": function handleLogin(body, response) {
        try {
            console.log(body);
            validate.validatePassword(body);
            dbHandler.readCsvFile();
            return constructResponse(response, {location: "HomePage.html"});
        } catch (e) {
            return constructResponse(response, {error: e.message}, 401);
        }
    },
    "/signUp": async function handleSignup(body, response) {
        try {
            console.log(body);
            userExist(body.mail)
                await sendEmail(body.mail)
                writeCsv.createUserObject(body);
                dbHandler.readCsvFile();
                return constructResponse(response, {}, 200);

        } catch (e) {
            console.log(e);
            return constructResponse(response, {error: e.message}, 401);
        }
    },
    "/confirm": function handleConfirm(body, response) {
        try {
            let log = otpCompare(body.name, body.mail, body.pass, body.code);
            console.log(log)
            //response.write(log);
            let pass = validate.hash(body.pass);
            return constructResponse(response, {error: "OTP is correct"}, 200);
        } catch (e) {
            return constructResponse(response, {error: e.message}, 401);
        }
    },
    "/forgotPassword": async function handleForgotPass(body, response) {
        try {

            let log = await forgotPass(body.mail);
            return constructResponse(response, {});
            return response.end();
        } catch (e) {
            console.log(e);
            return constructResponse(response, {error: e.message}, 401);
        }
    },
};
