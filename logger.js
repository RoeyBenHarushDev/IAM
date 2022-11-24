const moment = require('moment');
const fs = require('fs');
const { EventEmitter } = require('events');
const path = require('path');

class Logger extends EventEmitter {
    constructor () {
        super();
        this.logger = console;
        this.storage = {
            write: data => fs.appendFile(path.join(__dirname, '/logs.txt'), data, null, () => console.log('logging...'))
        };
        this.on('logToFile', this.logToFile);

        return this;
    }

    newRequest (request) {
        const time = moment().format('YY-MM-DD hh:mm');
        const msg = `${time}-> ${request.method}:${request.url}`;
        this.emit('logToFile', msg);
        this.logger.log(msg);
    }

    log (message = '') {
        const time = moment().format('DD-MM-YY hh:mm');
        const msg = `${time}-> ${message}`;
        this.emit('logToFile', msg);
        this.logger.log(`${time}-> ${message}`);
    }

    logToFile (data) {
        this.storage.write(data + '\n');
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
