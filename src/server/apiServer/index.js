var express = require('express');
var http = require('http');
var path = require('path');
var chalk = require('chalk');
var enableDestroy = require('server-destroy');

var app = null;
var server = null;
var io = null;

var httpModule = require('../endpoints/http');
var socketModule = require('../endpoints/socket');
var graphqlModule = require('../endpoints/graphql');
var jsonServerModule = require('../endpoints/jsonServer');

/**
 * Creates the API server with the specified port.
 */
function createApiServer(port, static) {
  server && server.destroy();
  app = express();
  server = http.createServer(app);
  io = require('socket.io')(server);

  app.get('/_status', function internalStaus(req, res){
    res.send('API server running.');
  });

  if(static) {
		app.use(express.static(path.join(process.cwd(), 'public')));  
	}

  server.listen(port, function () {
      console.log(chalk.green('API is available at: http://localhost:' + port));
  });

  enableDestroy(server);
  
  return server;
}

/**
 * Deployes the new endpoints provided by the UI
 */
function deploy(port, static, spec, done) {
  createApiServer(port, static);
  httpModule(app, spec);
  socketModule(io, spec);
  graphqlModule(app, spec);
  jsonServerModule(app, spec);
  done();
}

module.exports = {
  createApiServer: createApiServer,
  deploy: deploy
}
