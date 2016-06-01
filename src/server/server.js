'use strict';

var express = require('express');
var app = express();
var http = require('http');
var server = http.createServer(app);
var io = require('socket.io')(server);
var apiServer = require('./apiServer');
var chalk = require('chalk');
var freeport = require('freeport');
var argv = require('yargs').argv;

app.use(express.static(__dirname + '../../../dist'));

freeport(function(err, port) {
  if (err) throw err; 
  server.listen(port, function () {
    console.log(chalk.blue('Hermes dashboard is available at: http://localhost:' + port));
  });
});


var api;
var apiServerPort;

freeport(function(err, port) {
  if (err) throw err;
  console.log(argv.port)
  apiServerPort = argv.port || port;
  api = apiServer.createApiServer(apiServerPort, argv.static);
});


io.on('connection', function(socket) {
  socket.emit('onStart', apiServerPort)
  socket.on('deploy', function (data) {
    console.log(data.endpoints[0].headers);
    apiServer.deploy(data, function() {
        socket.emit('deploymentComplete')
    });
  });
});
