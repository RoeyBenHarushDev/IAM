let cache = [];
const path = require("path");
const fs = require("fs");

// function updateUser(email, )

function emailToUser(email) {
    const user = cache.find((user) => (user) => {
      return user.email === email;
    });
    return user ? user : "No match found";
    console.log(cache);
  }
  
  /*reading csv file into cache -> array of jsons*/
  function readCsvFile() {
      cache= [];
    var filePath = path.join(__dirname, "db.csv");
    var f = fs.readFileSync(filePath, { encoding: "utf-8" }, function (err) {
      console.log(err);
    });
    f = f.split("\n");
    headers = f.shift().split(",");
    f.forEach(function (d) {
      tmp = {};
      row = d.split(",");
      for (var i = 0; i < headers.length - 1; i++) {
        tmp[headers[i]] = row[i];
      }
      cache.push(tmp);
    });
  }
  

  module.exports = { readCsvFile , emailToUser};