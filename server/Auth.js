const node = require("nodemailer")
const smtp = require("nodemailer-smtp-transport")
const otpGenerator = require('otp-generator')
const fs = require('fs')
const ejs = require("ejs");
const JSON = require("JSON")
const list = require("./OTP-pass.json")
const {hash, emailToUser} = require("./validate");
const server = require("./index");
const User = require("./modules/User.js");


// compare emails func
function StrCompare(str1, str2) {
    str1 = str1.toLowerCase();
    str2 = str2.toLowerCase();
    return str1 === str2;
}

// the transport metadata
const transporter = node.createTransport(smtp({
    service: 'gmail',
    host: 'smtp.gmail.com',
    auth: {
        user: 'ShenkarIam@gmail.com',
        pass: 'uozoglubvgojcrtl'
    }
}));

async function sendEmail(email) {
    //parses the Postman JSON
    // let mail = JSON.parse(email)
    //create an OTP Code
    let OTP = otpGenerator.generate(6, {upperCaseAlphabets: false, lowerCaseAlphabets: false, specialChars: false})

    //puts the ejs file into a var (the email structure)
    const data = await ejs.renderFile(__dirname + "/OTP-mail.ejs", {name: 'Stranger', code: OTP});

    //the mailing metadata
    const mainOptions = {
        from: 'IamShenkar@gmail.com',
        to: email,   //mail.emailId,
        subject: 'Please Verify you Account',
        // text: 'Your OTP is: ' + OTP
        html: data
    };


    let json

    // checks if email already exists
    try{
        list.table.forEach(function (i) {
            if (StrCompare(JSON.stringify(i.mail), JSON.stringify(mainOptions.to))) {
                throw new Error("Email already exists");
            }
        })
    } catch (err) {
        return console.log(err)
    }

    // puts the new email into the list
    list.table.push({mail: mainOptions.to, code: OTP});

    json = JSON.stringify(list)
    fs.writeFile("./OTP-pass.json", json, 'utf-8', callback => {
        console.log("wrote file successfully")
    })

    //send the mail with the OTP to the client email
    await transporter.sendMail(mainOptions, (err, info) => {
        if (err) {
            console.log(err);
        } else {
            console.log('Message sent: ' + info.response + "\nwith OTP: " + OTP);
        }
    });
}

function otpCompare(userName, email, pass, code) {
    let user = new User(userName, email, pass);
    list.table.forEach(function (i) {
        if (email === i.mail) {
            if (code === i.code) {
                console.log("user in create: " + user);
                user.toCSVRow();
            }
            else
            {
                throw new Error("OTP is false")
            }
        }
    })
}

async function forgotPass(mail){

    console.log("mail: " + mail)
    //checks if the user exists
    let user = emailToUser(mail)
    console.log("auth: " + user)
    if(user === 'No match found'){

        server.logger.log(`user tried to reset pass with the mail: ${mail} and it was not found`,'WARN')
        throw new Error("User was not Found!")
    }
    user = user.email.toLowerCase()
    // generating the new Pass
    function generatePassword() {
        let length = 12,
            charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
            retVal = "";
        for (let i = 0, n = charset.length; i < length; ++i) {
            retVal += charset.charAt(Math.random() * n);
        }
        return retVal;
    }
    let pass = generatePassword()
    // put the ejs and new pass in data
    let data = await ejs.renderFile(__dirname + "/OTP-mail.ejs", {name: 'Stranger', code: pass});

    //the mailing metadata
    const mainOptions = {
        from: 'IamShenkar@gmail.com',
        to: mail,  //mail.emailId,
        subject: 'New Password for IAM',
        // text: 'Your OTP is: ' + OTP
        html: data
    };


    // send the mail with the new Password to the client email
    await transporter.sendMail(mainOptions, (err, info) => {
        if (err) {
            console.log(err);
        } else {
            console.log('Message sent: ' + info.response + "\nwith new Pass: " + pass);
        }
    });

    let hashed = hash(pass)
    console.log("hashed pass: " + hashed)

}


module.exports = {sendEmail, otpCompare,forgotPass}

