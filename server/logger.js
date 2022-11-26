const moment = require("moment");
const fs = require("fs");
const { EventEmitter } = require("events");
const path = require("path");

class Logger extends EventEmitter {
  constructor() {
    super();
    this.storage = {
      write: (data) =>
        fs.appendFile(path.join(__dirname, "/logs.txt"), data, null, () =>
        console.log("logging logs to server...")
        ),
    };
    this.on("logToFile", this.logToFile);

    return this;
  }

  log(message = "", state = "INFO") {
    const time = moment().format("DD-MM-YY hh:mm");
    const msg = `${time}-> [${state}] ${message}`;
    this.emit("logToFile", msg);
    console.log(`${time}-> [${state}] ${message}`);
  }

  logToFile(data) {
    this.storage.write(data + "\n");
  }
}

class Singleton {
  constructor() {
    if (!Singleton.instance) {
      Singleton.instance = new Logger();
    }
  }
  getInstance() {
    return Singleton.instance;
  }
}

module.exports = Singleton;
