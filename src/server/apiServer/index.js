var express = require('express');
var http = require('http');
var path = require('path');
var chalk = require('chalk');
var enableDestroy = require('server-destroy');
var morgan = require('morgan');
var bodyParser = require('body-parser');

var app = null;
var server = null;
var io = null;

var httpModule = require('../endpoints/http');
var socketModule = require('../endpoints/socket');
var graphqlModule = require('../endpoints/graphql');
var jsonServerModule = require('../endpoints/jsonServer');
var proxyModule = require('../endpoints/proxy');

var jsonServerRouter = null;

/**
 * Creates the API server with the specified port.
 */
function createApiServer(port, static, logs) {
  server && server.destroy();
  app = express();
  server = http.createServer(app);
  io = require('socket.io')(server);

  app.get('/_status', function internalStaus(req, res) {
    res.send('API server running.');
  });

  if (logs) {
    app.use(morgan('dev'));
  }

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  if (static) {
    app.use(express.static(path.join(process.cwd(), 'public')));
  }

  server.listen(port, function () {
    console.log(chalk.green('Api: http://localhost:' + port));
  });

  enableDestroy(server);

  return server;
}

/**
 * Deployes the new endpoints provided by the UI
 */
function deploy(port, static, spec, logs, done) {
  createApiServer(port, static, logs);
  httpModule(app, spec);
  socketModule(io, spec);
  graphqlModule(app, spec);
  jsonServerRouter = jsonServerModule(app, spec);
  proxyModule(app, spec);
  done();
}

function getJsonServerDb() {
  return jsonServerRouter && jsonServerRouter.db.getState();
}

module.exports = {
  createApiServer: createApiServer,
  deploy: deploy,
  getJsonServerDb: getJsonServerDb
};
