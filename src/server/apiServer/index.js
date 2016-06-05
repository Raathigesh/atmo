var express = require('express');
var app = express();
var http = require('http');
var removeRoute = require('express-remove-route');
var freeport = require('freeport');
var chalk = require('chalk');
var server = http.createServer(app);
var io = require('socket.io')(server);
var apollo = require('apollo-server');
var fs = require('fs');
var path = require('path');

const typeDefinitions = `
type Author {
  id: Int! # the ! means that every author object _must_ have an id
  firstName: String
  lastName: String
  posts: [Post] # the list of Posts by this author
}
type Post {
  id: Int!
  tags: [String]
  title: String
  text: String
  views: Int
  author: Author
}
# the schema allows the following two queries:
type RootQuery {
  author(firstName: String, lastName: String): Author
  fortuneCookie: String
}
# this schema allows the following two mutations:
type RootMutation {
  createAuthor(
    firstName: String!
    lastName: String!
  ): Author
  createPost(
    tags: [String!]!
    title: String!
    text: String!
    authorId: Int!
  ): Post
}
# we need to tell the server which types represent the root query
# and root mutation types. We call them RootQuery and RootMutation by convention.
schema {
  query: RootQuery
  mutation: RootMutation
}
`;

const mocks = {
  String: function() {
    return "It works!"
  }
};

/**
 * Creates the API server with the specified port.
 */
function createApiServer(port, static) { 
  if (static) {
    console.log(process.cwd());
    app.use(express.static(process.cwd()));  
  }
  
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
  initializeSocker(spec.socketEndpoints);  
  registerGraphqlEndpoints(app, spec.graphqlEndpoints);
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

function initializeSocker(endpoints) {
  console.log(endpoints);
  io.on('connection', function(socket) {
    for(var i = 0; i < endpoints.length; i++) {
      registerEvent(endpoints[i], socket);
    }
  });
}

function registerEvent(endpoint, socket) {
  socket.removeAllListeners();
  socket.on(endpoint.eventName, function(data) {
    console.log(data);
    socket.emit(endpoint.eventToEmit, endpoint.payload);
  });
}

function registerGraphqlEndpoints(app, endpoints) {
  if(endpoints[0]) {
    removeRouteIfAvailable(endpoints[0]);
    app.use(endpoints[0].url, apollo.apolloServer({
      graphiql: true,
        pretty: true,
        schema: endpoints[0].schema,
        mocks: mocks
    }));
  }    
}

module.exports = {
  createApiServer: createApiServer,
  deploy: deploy
}
