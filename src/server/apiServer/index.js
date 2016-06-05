var express = require('express');
var app = express();
var http = require('http');
var chalk = require('chalk');
var server = http.createServer(app);
var io = require('socket.io')(server);

var httpModule = require('../endpoints/http');
var socketModule = require('../endpoints/socket');
var graphqlModule = require('../endpoints/graphql');

/**
 * Creates the API server with the specified port.
 */
function createApiServer(port, static) {  
   app.get('/_status', function internalStaus(req, res){
    res.send('API server running.');
  });  
  server.listen(port, function () {
      console.log(chalk.green('API is available at: http://localhost:' + port));
  });
  return server;
}

/**
 * Deployes the new endpoints provided by the UI
 */
function deploy(spec, done) {  
  httpModule(app, spec);
  socketModule(io, spec);
  graphqlModule(app, spec);
  done();
}

module.exports = {
  createApiServer: createApiServer,
  deploy: deploy
}
