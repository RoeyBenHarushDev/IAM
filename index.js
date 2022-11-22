const http = require("http")
const port = process.env.PORT || 8080;
const routes = require("./router")
const {sendEmail} = require("./Auth.js")

http.createServer((request, response) => {
    response.setHeader('Access-Control-Allow-Origin', '*');
    const { headers ,method, url } = request;
    let body = [];
    request.on('error', (err) => {
        console.error(err);

    }).on('data', (chunk) => {
        body.push(chunk);

    }).on('end', () => {
        body = Buffer.concat(body).toString();
        let json = JSON.parse(body)
        if(request.method === 'POST' && json.action === 'signup'){
            let log = sendEmail(json.email)
            console.log(log)
        }

        //////// testing:
        // console.log("before:" + body)
        console.log("Json-email: " + json.email + " name: " + json.name + " pass: " + json.pass)


        response.on('error', (err) => {
            console.error(err);
        });

        response.statusCode = 200;
        response.setHeader('Content-Type', 'application/json');
        // Note: the 2 lines above could be replaced with this next one:
        // response.writeHead(200, {'Content-Type': 'application/json'})

        const responseBody = { headers, method, url, body };

        // response.write(JSON.stringify(responseBody));
        response.write("data received");
        response.end();
        // Note: the 2 lines above could be replaced with this next one:
        // response.end(JSON.stringify(responseBody))

        // END OF NEW STUFF
    });
}).listen(port,()=>console.log("listening on port: " + port));