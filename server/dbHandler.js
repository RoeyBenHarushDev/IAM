let cache = [];
const path = require("path");
const fs = require("fs");

// function updateUser(email, )

function emailToUser(mail) {

    console.log(cache)
    const user = cache.find(user => user.email === mail);
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
    headers = f.shift().split(",");
    f.forEach(function (d) {
        tmp = {};
        row = d.split(",");
        for (let i = 0; i < headers.length - 1; i++) {
            tmp[headers[i]] = row[i];
        }
        cache.push(tmp);
    });
}

  module.exports = { readCsvFile , emailToUser};