exports.constructResponse = function constructResponse(
  response,
  data,
  statusCode = 200
) {
  response.writeHead(statusCode, {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  });
  response.write(JSON.stringify(data));
  return response.end();
};
