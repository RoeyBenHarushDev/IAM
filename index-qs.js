const http = require("http")
const port = process.env.PORT || 8080;
const routes = require("./router")
const {sendEmail} = require("./Auth.js")
const fs = require("fs")
const qs = require("querystring")






http.createServer((request, response) => {
    response.writeHeader(200)
    // response.setHeader("Access-Control-Allow-Origin", "*");
    // response.setHeader("Access-Control-Request-Method", "*");
    // response.setHeader("Access-Control-Allow-Methods", "OPTIONS, GET");
    // response.setHeader("Access-Control-Allow-Headers", "*");

    // fs.readFile('./index.html','UTF-8', (err,data)=> {
    //     if(err){
    //         response.writeHead(404)
    //         response.write('file not found')
    //     }
    //     else {
    //
    //         response.writeHead(200)
    //         response.setHeader({"Content-Type": "text/html"})
    //         response.end(data)
    //     }
    // })
    const { headers ,method, url } = request;
    let body = [];
    request.on('error', (err) => {
        console.error(err);
    }).on('data', (chunk) => {
        body.push(chunk);
    }).on('end', () => {
        body = Buffer.concat(body).toString();
            if(body == []){
                console.log("body is empty")
                response.end("failed")
            }
        // let form = qs.parse(body)
        console.log(form)
        // console.log("body: " + body)
            // let json = JSON.parse(body)
            if(request.method === 'POST' && form["action"] === 'signup'){
                console.log(form["email"])
                console.log("form-email: " + form['email'] + " name: " + form['name'] + " pass: " + form['pass'])
                let log = sendEmail(form["email"])
                console.log(log)

            }
            if (request.method === 'POST' && form['action']=== 'login'){

            }if (request.method === 'POST' && form['action']=== 'OTP'){
                    console.log('user code: ' + form['OTP'])
            }
        response.on('error', (err) => {
            console.error(err);
        });

        response.statusCode = 200;
        // response.setHeader('Content-Type', 'application/json');
        // Note: the 2 lines above could be replaced with this next one:
        // response.writeHead(200, {'Content-Type': 'application/json'})

        const responseBody = { headers, method, url, body };

        // response.write(JSON.stringify(responseBody));
        // response.write("data received");
        response.end();
        // Note: the 2 lines above could be replaced with this next one:
        // response.end(JSON.stringify(responseBody))

        // END OF NEW STUFF
    });
}).listen(port,()=>console.log("listening on port: " + port));



// http.createServer(function(req, res) {
//     res.writeHead(200);
//     let body = "";
//     req.on('data',buffer=> {
//         body += buffer.toString();
//     });
//     req.on ('end', ()=> {
//         console.log(JSON.parse(body));
//     })
//     res.end('ok');
//     }).listen(8080);
