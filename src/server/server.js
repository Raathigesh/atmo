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
var fileExists = require('file-exists');
var cacheFilePath = path.join(__dirname, '../../cache/spec.json');
var pack = require('../../package.json');
var jsonfile = require('jsonfile');
var generatorsDataFile = path.join(__dirname, '../../cache/generators.json');
var npmi = require('npmi');

if (argv.generator) {
  addGenarator(argv.generator);
} else  {
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
    apiServerPort = argv.port || 3334;
    api = apiServer.createApiServer(apiServerPort, argv.static);
  });

  io.on('connection', function(socket) {
    var cacheSpec = {};
    if (fileExists(cacheFilePath)) {
      cacheSpec = JSON.parse(fs.readFileSync(cacheFilePath));
    }
    
    socket.emit('onStart', {
      port: apiServerPort,
      spec: cacheSpec,
      generators: jsonfile.readFileSync(generatorsDataFile).generators
    });

    socket.on('deploy', function (data) {
      apiServer.deploy(data, function() {
          socket.emit('deploymentComplete');
          socket.emit('message', 'Your changes are deployed!')
      });
    });
    
    socket.on('save', function (spec) {
      fs.writeFileSync(cacheFilePath, JSON.stringify(spec));
      socket.emit('message', 'Your changes are saved locally.')
    });

    socket.on('generate', function (payload) {
      var renerator = require(payload.generator);
      renerator(payload.spec);
    });

    socket.on('installGenerator', function(name){
      installGenerator(name, socket);
    });
  });
}

function addGenarator(name) {
  var generatorsData = jsonfile.readFileSync(generatorsDataFile);
  generatorsData.generators.push(name);
  jsonfile.writeFileSync(generatorsDataFile, generatorsData);
  return generatorsData;
}

function installGenerator(name, socket) {
  var options = {
      name: name,    // your module name
      path: '.',              // installation path [default: '.']
      forceInstall: true,    // force install if set to true (even if already installed, it will do a reinstall) [default: false]
      npmLoad: {              // npm.load(options, callback): this is the "options" given to npm.load()
          loglevel: 'silent'  // [default: {loglevel: 'silent'}]
      }
  };
  npmi(options, function (err, result) {
      if (err) {
          socket.emit('message', err.message)
      } else {
        var generators = addGenarator(name);
        socket.emit('generatorInstalled', {
          generatorName: options.name,
          generators: generators.generators
        });
      }
  });
}
