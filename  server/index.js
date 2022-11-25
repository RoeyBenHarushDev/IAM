const http = require("http")
const port = process.env.PORT || 8080;
const {sendEmail,otpCompare,forgotPass} = require("./Auth.js")
const validate = require("./validate");
const Logger = require('./logger');
const logger = new Logger().getInstance();
const ObjectsToCsv = require('objects-to-csv')
exports.logger =logger;
const { constructResponse } = require("./utils");
const {compile} = require("ejs");

http.createServer((request, response) => {
    response.writeHeader(200, {'Accept': 'application/json','Access-Control-Allow-Origin' : '*'});
    let body = [];
    request.on('error', (err) => {
        console.error(err);
    }).on('data', (chunk) => {
        body.push(chunk);
    }).on('end', () => {
   validate.readCsvFile() //first func
    body = Buffer.concat(body).toString();
    if (body === []) {
        console.log("body is empty")
        response.statusCode = 400
        return response.end()
    }
    body = JSON.parse(body)
    if (request.url==="/signUp") urlSignUp(body,response)
    if (request.url==="/login") urlLogin(body, response)
    if (request.url==="/confirm") urlConfirm (body,response)
    if (request.url==="/forgotPassword") urlForgotPassword(body,response)
     response.on('error', (err) => {
    console.error(err);
     });
    response.end();
    });

}).listen(port,()=>logger.log("listening on port: " + port));

function urlLogin(body, response){
    try {
        console.log("url login")
        validate.validatePassword(body)
        response.writeHeader(307, {'Location': './HomePage.html','Accept': 'application/json','Access-Control-Allow-Origin' : '*'});
        return response.end();
    }
    catch (e){
        console.log(e);
        // response.statusCode=401
        response.writeHeader(401, {'Accept': 'application/json','Access-Control-Allow-Origin' : '*'});
        return response.end(e.message)
    }
}
async function urlSignUp(body, response){
    try {
        console.log("url sign up")

       await sendEmail(body.mail)
        response.writeHeader(200, {'Accept': 'application/json', 'Access-Control-Allow-Origin': '*'});
        return constructResponse(response, { error: "received" }, 200);
    }catch (e){
            console.log(e);
            // response.statusCode=401
            response.writeHeader(401, {'Accept': 'application/json','Access-Control-Allow-Origin' : '*'});
            return constructResponse(response, { error: e.error }, 403);
        }
}
function urlConfirm (body,response){
    try {
        console.log("url: /confirm")
        let log = otpCompare(body.name,body.mail,body.pass,body.code);        console.log(log)
        //response.write(log);
        let pass = validate.hash(body.pass)
        console.log("hashed: " + pass)

        response.writeHeader(200, {
            'Accept': 'application/json',
            'Access-Control-Allow-Origin': '*'
        });
        return constructResponse(response, { error: "OTP is correct" }, 200);
    }catch (e){
        console.log(e);
        // response.statusCode=401
        // response.writeHeader(401, {'Accept': 'application/json','Access-Control-Allow-Origin' : '*'});
        return constructResponse(response, { error: "OTP code is false" }, 403);
    }
}
async function  urlForgotPassword(body,response){
    try { console.log("url forgotten")

        response.writeHeader(200, {
            'Accept': 'application/json',
            'Access-Control-Allow-Origin': '*'
        });
        let log = await forgotPass(body.mail)
        // console.log("log: " + log)
        return response.end("h");
    }catch (e){
        console.log(e);
        // response.statusCode=401
        response.writeHeader(403, {'Accept': 'application/json','Access-Control-Allow-Origin' : '*'});
        return response.end(e.message)
    }
}

