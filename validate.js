const crypto = require('crypto');
const fs = require('fs');
const csv_parser = require('csv-parser');
const buffer = require("buffer");
const validate = require('./validate');
const http = require('http');
const { parse } = require('querystring');
const server = require('./server');
const {onServerConnect} = require("../hash - Copy (2)/validate");
require('dotenv').config();
let result = [];

user= {
    "userID": "roni",
    "userPassword": "123"
}

const secret = process.env.secret;

function hash(key) {
    const hash = crypto.createHmac('sha256', secret).update(key).digest('hex');
    return hash;
};

function validateSuspention(user) {
    console.log(user);
    const suspendTime = user["suspensionTime"];
    const suspendStartDate = user["suspensionDate"];
    const [day, month, year] = suspendStartDate.split('/');
    const suspendStartDate_date = new Date(year,month,day);
    const today = new Date();
    let expiredDate = new Date();
    expiredDate.setDate(suspendStartDate_date.getDate()+ parseInt(suspendTime));
    console.log(`suspend : ${suspendStartDate_date} time: ${suspendTime}  expired: ${expiredDate} today: ${today}`);
    /*console.log(`aftet sum: `);*/
    if(expiredDate.getDate() < today.getDate()){
        /*user is not suspend*/
        server.logger.log(`user with id: ${user["id"]} is not suspended- login succeeded`);
    }
    else {
        server.logger.log(`user with id: ${user["id"]} is suspended- login failed`);
        /*event*/
    }
};

exports.validatePassword= function validatePassword(userObj) {
    const user = result.find(user=>{
        return user.id==userObj["userID"]
    })
    /*check if user password equal to user hashedPassword from csv*/
    if (hash(userObj["userPassword"]) === hash(user.password)){
        server.logger.log(`user with id: ${user["id"]} entered correct password- starts confirm suspension`);
        validateSuspention(user);
    }
    else {
        server.logger.log(`user with id: ${user["id"]} entered wrong password- login failed`)
        //emit bad Pass and logger
    }
};

function emailToId(email) {
    const user = result.find(user => {
        return user.email === email;
    })
    return user.id;
};

/*reading csv file into result -> array of jsons*/
exports.onServerConnect = function onServerConnect(res) {
    var filename = 'test.csv';
    var readStream = fs.createReadStream(filename);
    readStream.pipe(csv_parser()).on('data',(data)=>{
        result.push(data);
    })
    readStream.on('error', function(err) {
        res.end(err);
    });
};




