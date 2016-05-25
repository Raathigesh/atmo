'use strict';

var express = require('express');
var app = express();
var http = require('http');
var server = http.createServer(app);
var io = require('socket.io')(server);
var apiServer = require('./apiServer');
var chalk = require('chalk');
var freeport = require('freeport');

app.use(express.static(__dirname + '../../../dist'));

  freeport(function(err, port) {
    if (err) throw err; 
    server.listen(port, function () {
      console.log(chalk.blue('Hermes dashboard is available at: http://localhost:' + port));
    });
  });


var api = apiServer.createApiServer(5000);
io.on('connection', function(socket) {
  socket.on('deploy', function (data) {
    console.log(data);
    apiServer.deploy(data);
  });
});
