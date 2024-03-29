// DEPENDENCIES
// ============
var express = require("express"),
    http = require("http"),
    port = (process.env.PORT || 8001),
    server = module.exports = express();

// SERVER CONFIGURATION
// ====================
server.configure(function() {

  server.use(express["static"](__dirname + "/../"));

  server.use(express.errorHandler({

    dumpExceptions: true,

    showStack: true

  }));

  server.use(express.bodyParser())

  server.use(server.router);

});

// SERVER
// ======

// Start Node.js Server
http.createServer(server).listen(port);

console.log('Welcome to CWS SPA Boilerplate site!\n\nNavigate to http://localhost:' + port + ' on your browser to access the site');