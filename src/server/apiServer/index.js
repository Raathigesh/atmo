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
      responseCallback(req, res, endpoint);
    });
  } else if (endpoint.method === 'POST') {
    app.post(endpoint.url, function(req, res){
      responseCallback(req, res, endpoint);
    });
  } else if (endpoint.method === 'PUT') {
    app.put(endpoint.url, function(req, res){
      responseCallback(req, res, endpoint);
    });
  } else if (endpoint.method === 'PATCH') {
    app.patch(endpoint.url, function(req, res){
      responseCallback(req, res, endpoint);
    });
  } else if (endpoint.method === 'DELETE') {
    app.delete(endpoint.url, function(req, res){
      responseCallback(req, res, endpoint);
    });
  } else if (endpoint.method === 'COPY') {
    app.copy(endpoint.url, function(req, res){
      responseCallback(req, res, endpoint);
    });
  } else if (endpoint.method === 'HEAD') {
    app.head(endpoint.url, function(req, res){
      responseCallback(req, res, endpoint);
    });
  } else if (endpoint.method === 'OPTIONS') {
    app.options(endpoint.url, function(req, res){
      responseCallback(req, res, endpoint);
    });
  } else if (endpoint.method === 'PURGE') {
    app.purge(endpoint.url, function(req, res){
      responseCallback(req, res, endpoint);
    });
  } else if (endpoint.method === 'LOCK') {
    app.lock(endpoint.url, function(req, res){
      responseCallback(req, res, endpoint);
    });
  } else if (endpoint.method === 'UNLOCK') {
    app.unlock(endpoint.url, function(req, res){
      responseCallback(req, res, endpoint);
    });
  }
}

function responseCallback(req, res, endpoint) {
  setHeaders(res, endpoint.headers);
  setContentTypeHeader(res, endpoint.response.contentType.contentType);
  res.status(endpoint.response.responseCode);
  res.send(endpoint.response.content);
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
