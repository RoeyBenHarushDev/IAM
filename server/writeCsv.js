const fs = require('fs');


function createUserObject (body) {
    const name = body.name;
    const email = body.mail;
    const password = body.pass;
    let user = new User(1, name, email, password);
    console.log("user in create: " + user);
    user.toCSVRow()
    //addUser(user,  (err)=>{console.log(err);});
}
    class User {
        constructor(id = 1, name, email, password, loginDate = new Date(), suspensionDate = null, suspensionTime = "0", status = "inactive") {
            this.name = name;
            this.email = email;
            this.loginDate = loginDate;
            this.password = password;
            this.suspensionDate = suspensionDate;
            this.suspensionTime = suspensionTime;
            this.status = status;
            this.id = id;
        }

        toCSVRow() {
            const new_user = `${this.id},${this.name},${this.email},${this.password},${this.loginDate},${this.suspensionDate},${this.suspensionTime},${this.status}\n`;
            try {
                appendFileSync('./test.csv', new_user);
            } catch (err) {
                console.error(err);
            }

        }
    }


        module.exports = {User,createUserObject};








/*


/!*function POST(request, callback) {
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
*/
