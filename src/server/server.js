'use strict';

var express = require('express');
var app = express();
var http = require('http');
var server = http.createServer(app);
var io = require('socket.io')(server);
var apiServer = require('./apiServer');
var chalk = require('chalk');
var argv = require('yargs').argv;
var fs = require('fs');
var path = require('path');
var fileExists = require('file-exists');
var cacheFilePath = path.join(__dirname, '../../cache/spec.json');
var pack = require('../../package.json');
var jsonfile = require('jsonfile');
var generatorsDataFile = path.join(__dirname, '../../cache/generators.json');
var npmi = require('npmi');

app.use(express.static(__dirname + '../../../dist'));

var port = 3333;
server.listen(port, function () {
  console.log(chalk.blue('Atmo dashboard v' + pack.version + ' is available at: http://localhost:' + port));
});

var apiServerPort = argv.port || 3334;
var api = apiServer.createApiServer(apiServerPort, argv.static, argv.logs);

io.on('connection', function (socket) {
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
    apiServer.deploy(apiServerPort, argv.static, data, argv.logs, function () {
      socket.emit('deploymentComplete');
      socket.emit('message', 'Your changes are deployed!')
    });
    fs.writeFileSync(cacheFilePath, JSON.stringify(data));
  });

  socket.on('save', function (spec) {
    fs.writeFileSync(cacheFilePath, JSON.stringify(spec));
    socket.emit('message', 'Your changes are saved locally.')
  });

  socket.on('generate', function (payload) {
    var renerator = require(payload.generator);
    renerator(payload.spec);
    socket.emit('message', 'Your generated project is available in ' + path.join(process.cwd(), 'build'))
  });

  socket.on('installGenerator', function (name) {
    installGenerator(name, socket);
  });
});

function addGenarator(name) {
  var generatorsData = jsonfile.readFileSync(generatorsDataFile);
  generatorsData.generators.push(name);
  jsonfile.writeFileSync(generatorsDataFile, generatorsData);
  return generatorsData;
}

function installGenerator(name, socket) {
  var options = {
    name: name,
    path: '.', 
    forceInstall: true,
    npmLoad: {
      loglevel: 'silent'
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
