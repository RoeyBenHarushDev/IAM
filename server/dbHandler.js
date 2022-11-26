let cache = [];                     //json array to keep all csv
const path = require("path");
const fs = require("fs");
const { channel } = require("diagnostics_channel");
const { stringify } = require("querystring");

/* genaric in order to change a few partameters (one in each call), keep old parameters (like login time) and than delete all row and add new with new parameter. */
function updateUser(email, params) {
    const keys = Object.keys(params);
    const keyForChange = keys[0];
    const value = params[keyForChange];                      // divide the params to key, value

    const oldUser = emailToUser(email);
    console.log(oldUser);
    Object.keys(oldUser).forEach(function (key) {
        if (key === keyForChange) {
            oldUser[key] = value;
        }
    })

    writeCsvFile(cache);
}


function emailToUser(email) {
    const user = cache.find(user => user.email === email);
    return user ? user : "User does'nt exist";
}

/*reading csv file into cache -> array of jsons*/
function readCsvFile() {
    cache = [];
    let filePath = path.join(__dirname, "db.csv");
    let f = fs.readFileSync(filePath, { encoding: "utf-8" }, function (err) {
        console.log(err);
    });
    f = f.split("\n");
    let headers = f.shift().split(",");
    f.forEach(function (d) {
        let tmp = {};
        let row = d.split(",");
        for (let i = 0; i < headers.length - 1; i++) {
            tmp[headers[i]] = row[i];
        }
        cache.push(tmp);
    });
}

function writeCsvFile(cache){
    let format = "name,email,password,loginDate,suspensionDate,suspensionTime,status,type"
    let filePath = path.join(__dirname, "db.csv");
    let f = fs.createWriteStream(filePath, {flags:"w"})
    f.write(format);
    for (const user of cache) {
        f.write("\n");
        f.write(Object.values(user).join(","));
    }
}

module.exports = { readCsvFile, emailToUser, updateUser };