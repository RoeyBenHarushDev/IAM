const http = require("http")
const port = process.env.PORT || 8080;
const routes = require("./router")
const {sendEmail} = require("./Auth.js")
const fs = require("fs")
const qs = require("querystring")
const validate = require("./validate");
const Logger = require('./Logger');
const {otpCompare} = require("./Auth");
const logger = new Logger().getInstance();
const ObjectsToCsv = require('objects-to-csv')
exports.logger =logger;

// response.writeHeader(200, {'Accept': 'application/json','Access-Control-Allow-Origin' : '*'});
http.createServer((request, response) => {

    request.on('error', (err) => {
        console.error(err);
    }).on('data', (chunk) => {
        body.push(chunk);
    }).on('end', () => {

    let body = [];
   validate.readCsvFile() //first func
        body = Buffer.concat(body).toString();
        body = JSON.parse(body)

            if (body == []) {
                console.log("body is empty")
                response.statusCode = 400
                return response.end()
            }

            if (request.url=="/signUp") urlSignUp(body,response)
            if (request.url=="/login") urlLogin(body, response)
            if (request.url=="/confirm") urlConfirm (body,response)
            if (request.url=="/forgotPassword") urlForgotPassword(body,response)

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
function urlSignUp(body, response){
    try {
        console.log("url sign up")

        let log = sendEmail(body.mail)
        response.writeHeader(200, {'Accept': 'application/json', 'Access-Control-Allow-Origin': '*'});
        return response.end();
    }catch (e){
            console.log(e);
            // response.statusCode=401
            response.writeHeader(401, {'Accept': 'application/json','Access-Control-Allow-Origin' : '*'});
            return response.end(e.message)
        }
}
function urlConfirm (body,response){
    try {
        let log = otpCompare(body.mail, body.code);
        //response.write(log);
        let pass = validate.hash(body.pass)

        response.writeHeader(200, {
            'Accept': 'application/json',
            'Access-Control-Allow-Origin': '*'
        });
        return response.end();
    }catch (e){
        console.log(e);
        // response.statusCode=401
        response.writeHeader(401, {'Accept': 'application/json','Access-Control-Allow-Origin' : '*'});
        return response.end(e.message)
    }
}
function urlForgotPassword(body,response){
    try { console.log("url forgen")

        response.writeHeader(200, {
            'Accept': 'application/json',
            'Access-Control-Allow-Origin': '*'
        });

        return response.end("h");
    }catch (e){
        console.log(e);
        // response.statusCode=401
        response.writeHeader(401, {'Accept': 'application/json','Access-Control-Allow-Origin' : '*'});
        return response.end(e.message)
    }
}

