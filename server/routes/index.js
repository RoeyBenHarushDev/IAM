const {constructResponse} = require("../utils");
const dbHandler = require("../dbHandler");
const writeCsv = require("../writeCsv");
const validate = require("../validate");
const {sendEmail, otpCompare, forgotPass, userExist} = require("../Auth.js");
const server = require("../index");
const {emailToUser} = require("../dbHandler");

module.exports = {
    "/login": function handleLogin(body, response) {
        try {
            console.log(body);
            const user = emailToUser(body.mail)
            console.log(user)
                     validate.validatePassword(user,0);
            return constructResponse(response, {location:"HomePage.html?mail="+body.mail});
        } catch (e) {
            return constructResponse(response, {error: e.message}, 401);
        }
    },
    "/signUp": async function handleSignup(body, response) {
        try {
            userExist(body.mail)
            await sendEmail(body.mail)
            return constructResponse(response, {}, 200);

        } catch (e) {
            console.log(e);
            return constructResponse(response, {error: e.message}, 401);
        }
    },
    "/confirm": function handleConfirm(body, response) {
        try {
            otpCompare(body);
            writeCsv.createUserObject(body);
            server.logger.log("user in create: " + body.name);
            dbHandler.readCsvFile();
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
    "/suspension": async function handleSuspension(body, response) {
        try {
            console.log("url-suspension")
            dbHandler.updateUser(body.mail,{"suspensionDate": new Date()});
            dbHandler.updateUser(body.mail,{"suspensionTime": body.suspensionDate});
            dbHandler.updateUser(body.mail,{"status": "suspended"});

            return constructResponse(response, {});
            return response.end();
        } catch (e) {
            console.log(e);
            return constructResponse(response, {error: e.message}, 401);
        }
    },
    "/changePassword": function handleLogin(body, response) {
        try {
            console.log(body)
            validate.validatePassword(body, 1);
            dbHandler.updateUser(body.mail, {"password":body.newpass})
            return constructResponse(response, {location: "HomePage.html"});
        } catch (e) {
            return constructResponse(response, {error: e.message}, 401);
        }
    },
};
