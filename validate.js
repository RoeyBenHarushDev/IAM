const crypto = require('crypto');
const fs = require('fs');
// const csv_parser = require('csv-parser');
// const buffer = require("buffer");
// const http = require('http');
// const { parse } = require('querystring');
const server = require('./index.js');
const path = require('path');
require('dotenv').config();

let result = [];

const secret = process.env.secret;

function hash(key) {
    return crypto.createHmac('sha256', secret).update(key).digest('hex');
}

function validateSuspension(user) {
    console.log(user);
    const suspendTime = user["suspensionTime"];
    const suspendStartDate = user["suspensionDate"];
    const [day, month, year] = suspendStartDate.split('/');
    const suspendStartDate_date = new Date(year,month,day);
    const today = new Date();
    let expiredDate = new Date();
    expiredDate.setDate(suspendStartDate_date.getDate()+ parseInt(suspendTime));
    console.log(`suspend : ${suspendStartDate_date} time: ${suspendTime}  expired: ${expiredDate} today: ${today}`);
    /*console.log(`after sum: `);*/
    if(expiredDate.getDate() < today.getDate()){
        /*user is not suspend*/
        server.logger.log(`user with id: ${user["id"]} is not suspended- login succeeded`);
    }
    else {
        server.logger.log(`user with id: ${user["id"]} is suspended- login failed`);
        /*event*/
    }
}
/*check if user password equal to user hashedPassword from csv*/
function validatePassword(userObj) {
    const user = emailToUser(userObj.mail)
    if (hash(userObj.pass) === hash(user.password)){
        server.logger.log(`user with id: ${userObj.mail} entered correct password- starts confirm suspension`);
        validateSuspension(user); //add try
    }
    else {
        server.logger.log(`user with id: ${userObj.mail} entered wrong password- login failed`)
        throw new Error("Incorrect password")
        //emit bad Pass and logger
    }
}

function emailToUser(email) {
    const user = result.find(user => user => {
        return user.email === email;})
    return user ? user : 'No match found';
}

/*reading csv file into result -> array of jsons*/
function readCsvFile() {
    let filePath = path.join(__dirname, 'test.csv');
    let f = fs.readFileSync(filePath, {encoding: 'utf-8'},
        function(err){console.log(err);});
    f = f.split("\n");
    let headers = f.shift().split(",");
       f.forEach(function(d){
        let tmp = {}
        let row = d.split(",")
        for(let i = 0; i < headers.length-1; i++){
            tmp[headers[i]] = row[i];
        }
           result.push(tmp);
    });
}

const statusOfUser=(status)=>{
     if(status === 'admin') {return 'admin';}
     else {return  status === "user"}
}

module.exports= {readCsvFile,validatePassword,hash,emailToUser}




