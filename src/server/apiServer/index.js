var express = require('express');
var app = express();
var http = require('http');
var removeRoute = require('express-remove-route');
var freeport = require('freeport');
var chalk = require('chalk');

/**
 * Creates the API server with the specified port.
 */
function createApiServer(port){
  var server = http.createServer(app);
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
  for(var i = 0; i< spec.endpoints.length; i++) {
    addRoute(spec.endpoints[i]);
  } 
  
  done();
}

/**
 * Adds new routes
 */
function addRoute(endpoint) {
  removeRouteIfAvailable(endpoint);

  if (endpoint.method === 'GET') {
    app.get(endpoint.url, function(req, res){
      setHeaders(res, endpoint.headers);
      setContentTypeHeader(res, endpoint.response.contentType.contentType);
      res.send(endpoint.response.content);
    });
  } else if (endpoint.method === 'POST') {
    app.post(endpoint.url, function(req, res){
      setHeaders(res, endpoint.headers);
      setContentTypeHeader(res, endpoint.response.contentType.contentType);
      res.send(endpoint.response.content);
    });
  }
}

/**
 * Removes the route from the API server is already registered.
 */
function removeRouteIfAvailable(endpoint) {
   if(removeRoute.findRoute(app, endpoint.url)) {
       removeRoute(app, endpoint.url);  
    }
}

function setHeaders(res, headers) {
  headers.forEach(function(header) {
    res.set(header.key, header.value);
  });
}

function setContentTypeHeader(res, contentType) {
  res.set('Content-Type', contentType);
}

module.exports = {
  createApiServer: createApiServer,
  deploy: deploy
}
