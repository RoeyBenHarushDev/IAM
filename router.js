const {verEmail} = require("./Auth.js")

const ROUTES = {
    GET: {
        '/' : ''
    },
    POST: {
        '/' : verEmail
    }
}

module.exports = (req,res) =>{
    const handler = ROUTES[req.method][req.url];
    if (!handler){
        return errorHandler()
    }
    return handler(req,res);
}

//controller:
function errorHandler(req,res){
    res.writeHeader(404);
    res.write('Bad Request');
    res.end()
}