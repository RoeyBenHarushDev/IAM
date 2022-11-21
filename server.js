var http = require('http');
const { parse } = require('querystring');
var fs = require('fs');
const csv_parser = require('csv-parser');
const buffer = require("buffer");
let result = [];
http.createServer(function(req, res) {
    res.writeHead(200);
    if (req.url == '/') {
        onServerConnect(res);
    }
    if (req.url == '/index' ){

       /* res.write("hello");*/
        let body = "";
        req.on('data',buffer=> {
            body += buffer.toString();

        });
        req.on ('end', ()=> {
            validatePassword(JSON.parse(body)["id"]);
            res.end('ok');
        })
    }
    res.end();

}).listen(8080);

const options = {
    host: "localhost",
    port: "8080",
    path: "/"
}


onServerConnect = (res) =>{

    var filename = 'test.csv';
    var readStream = fs.createReadStream(filename);
    readStream.pipe(csv_parser()).on('data',(data)=>{
        result.push(data);
    })
    readStream.on('error', function(err) {
        res.end(err);
    });
}


validatePassword = (_id)=> {
    console.log(_id);
    //console.log(result);
    const user = result.find(user=>{
        return user.id==_id
    })
    const passUser =
}


onServerConnect()