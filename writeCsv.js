const fs = require('fs');
const User = require('./Models/User');



 function createUserObject (request, body){
            let { firstName, lastName, birthDate, loginDate, password, suspensionDate, suspensionTime, statusOfUser } = body;
            let user = new User(firstName, lastName, birthDate, loginDate, password, suspensionDate, suspensionTime, statusOfUser);
            response.writeHead(200, { 'Content-Type': 'application/json' });
            addUser(user, function (err) {
                if (err) {
                    response.write(`{ status: "failed" }`);
                }
                else {
                    response.write(`{ status: "success" }`);
                }
                response.end();
            })

    }

/*

function POST(request, callback) {
    let body = '';
    request.on('data', function (data) {
        body += data;
        // Too much POST data, kill the connection!
        // 1e6 === 1 * Math.pow(10, 6) === 1 * 1000000 ~~~ 1MB
        // if (body.length > 1e6)
        //     request.connection.destroy();
    });
    request.on('end', function () {
        if (request.headers['content-type'] == 'application/json')
            callback(JSON.parse(body));
        // callback(body);
    });
}
*/



function addUser(user, callback) {
    fs.appendFile("test.csv", user.toCSVRow(), "utf-8", (err) => {
        if (err)
            callback(err)
        else
            callback()
    });
}