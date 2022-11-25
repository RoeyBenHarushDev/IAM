const http = require("http")
const port = process.env.PORT || 8080;
const Logger = require('./logger');
const logger = new Logger().getInstance();
exports.logger = logger;
const routeHandlers = require("./routes");
const { constructResponse } = require("./utils");
const dbHandler = require("./dbHandler");

http.createServer((request, response) => {
  console.log("CREATE");
    let body = [];
    request
      .on("error", (err) => {
        console.error(err);
      })
      .on("data", (chunk) => {
        body.push(chunk);
      })
      .on("end", () => {
        dbHandler.readCsvFile(); 
        body = Buffer.concat(body).toString();
        body = JSON.parse(body);
        if (body === []) {
          return constructResponse(response, { error: "body is empty" }, 400);
        }
        const routeHandler = routeHandlers[request.url];
        if (routeHandler) {
          return routeHandler(body, response);
        }
        return constructResponse(response, {}, 404);
      });
  })
  .listen(port, () => logger.log("listening on port: " + port));
