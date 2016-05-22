var express = require('express');
var app = express();
var http = require('http');
var removeRoute = require('express-remove-route');

/**
 * Creates the API server with the specified port.
 */
function createApiServer(port){
  var server = http.createServer(app);
   app.get('/_status', function internalStaus(req, res){
    res.send('API server running.');
  });

  server.listen(port, function () {
    console.log('Server listening at port %d', port);
  });

  return server;
}

/**
 * Deployes the new endpoints provided by the UI
 */
function deploy(spec) {
  for(var i = 0; i< spec.endpoints.length; i++) {
    addRoute(spec.endpoints[i]);
  }  
}

/**
 * Adds new routes
 */
function addRoute(endpoint) {
  removeRouteIfAvailable(endpoint);

  if (endpoint.method === 'GET') {
    app.get(endpoint.url, function(req, res){
      res.send(endpoint.response.content);
    });
  } else if (endpoint.method === 'POST') {
    app.post(endpoint.url, function(req, res){
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

module.exports = {
  createApiServer: createApiServer,
  deploy: deploy
}
