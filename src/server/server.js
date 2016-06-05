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
var fs = require('fs');
var path = require('path');

app.use(express.static(__dirname + '../../../dist'));

freeport(function(err, port) {
  if (err) throw err; 
  port = 3333;
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
  var cacheSpec = JSON.parse(fs.readFileSync(path.join(process.cwd(), '/cache/spec.json')));
  socket.emit('onStart', {
    port: apiServerPort,
    spec: cacheSpec
  });
  socket.on('deploy', function (data) {
    apiServer.deploy(data, function() {
        socket.emit('deploymentComplete')
    });
  });
  
  socket.on('save', function (spec) {
    fs.writeFileSync(path.join(process.cwd(), '/cache/spec.json'), JSON.stringify(spec));
  });
});
