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
var figlet = require('figlet');

console.log(chalk.blue(figlet.textSync('        Atmo')));
console.log(chalk.gray('UI based Server Side Api Mocking for Prototyping'));
console.log(chalk.gray('------------------------------------------------'));
console.log(chalk.gray('                Version '+ pack.version));
console.log(chalk.gray(''));

app.use(express.static(path.resolve(__dirname, '../../dist')));

/**
 * Port of the dashboard server
 */
var port = process.env.PORT || 3333;

/**
 * Start the dashboard server
 */
server.listen(port, function () {
  console.log(chalk.yellow('Atmo mission control: http://localhost:' + port));
});

/**
 * API server
 */
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
    socket.emit('message', 'Your generated project is available in ' + path.join(process.cwd(), 'project'))
  });

  socket.on('installGenerator', function (name) {
    installGenerator(name, socket);
  });

  socket.on('syncJsonServerDb', function (name) {
    socket.emit('jsonDb', apiServer.getJsonServerDb());
  });
});

/**
 * Add a generator name to the generator meta data file
 */
function addGenarator(name) {
  var generatorsData = jsonfile.readFileSync(generatorsDataFile);
  generatorsData.generators.push(name);
  jsonfile.writeFileSync(generatorsDataFile, generatorsData);
  return generatorsData;
}

/**
 * Install the generator npm package programmatically
 */
function installGenerator(name, socket) {
  var justThePackageName = name;
  var justTheVersion = 'latest';

  if (name.indexOf('@') >= 0) {
    justThePackageName = name.substring(0, name.indexOf("@"));
    justTheVersion = name.substring(name.indexOf("@") + 1, name.length);
  }

  var options = {
    name: justThePackageName,
    path: __dirname,
    version: justTheVersion,
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
