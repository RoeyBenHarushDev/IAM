const crypto = require('crypto');


user= {
    "user": "roni",
    "password": "123"
}
const secret = 'IAM_team';

function hash (key){
    const hash = crypto.createHmac('sha256', secret).update(key).digest('hex');
    return hash;
}

function validatePassword (user_name) {

}

function readCsv() {

}

console.log(hash);



