'use strict';

var express = require('express');
var app = express();
var http = require('http');
var server = http.createServer(app);
var io = require('socket.io')(server);
var port = process.env.PORT || 3000;
var apiServer = require('./apiServer');

app.use(express.static(__dirname + '../../../dist'));
server.listen(port, function () {
  console.log('Server listening at port %d', port);
});

var api = apiServer.createApiServer(5000);
io.on('connection', function(socket) {
  socket.on('deploy', function (data) {
    console.log(data);
    apiServer.deploy(data);
  });
});

if (module.parent) {
  server.listen(3000);
  console.log('listening on port 3000...');
}
