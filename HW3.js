const http = require('http');
const win = require('winston');

const server = http.createServer();
const logger = win.createLogger({
    level: 'info',
    format : win.format.json(),
    defaultMeta: { service : "user-service"},
    transports: [
        new win.transports.File({ filename:'error.log', level: 'error' }),
        new win.transports.File({ filename: 'combined.log'}),
    ],
});

        server.on('request',(req,res) => {
        res.writeHead(200, { "Content-Type": "text/html"}); //Status code in header
        res.write("this is a debugging test!\n");
        res.write("here is the breakpoint!\n");
        logger.log({level:'info', message:`${req.method}`});
        res.write("Hello world!");
        res.end();
    }).listen(8080);

console.log(`listening on port ${8080}`);
console.log("breakpoint");
console.log(`listening on port ${8080}`);

