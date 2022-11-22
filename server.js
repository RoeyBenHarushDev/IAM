var http = require('http');
const { parse } = require('querystring');
var fs = require('fs');
const csv_parser = require('csv-parser');
const buffer = require("buffer");
const validate = require('./validate');

    http.createServer(function(req, res) {
    res.writeHead(200);
    if (req.url == '/') {
        validate.onServerConnect(res);
    }
    if (req.url == '/index' ){

       res.write("hello");
        let body = "";
        req.on('data',buffer=> {
            body += buffer.toString();
        });
        req.on ('end', ()=> {
            body && validate.validatePassword(JSON.parse(body));
            res.end('ok');
        })
    }
    res.end();

}).listen(8080);

/*
const options = {
    host: "localhost",
    port: "8080",
    path: "/"
}
*/

validate.onServerConnect()