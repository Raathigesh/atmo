
var util = require('../apiServer/util');
var jsonServer = require('json-server');

function jsonServerModule(app, spec) {
  if (spec.jsonServerEndpoint) {
    var router = jsonServer.router(JSON.parse(spec.jsonServerEndpoint.model));
    app.use(spec.jsonServerEndpoint.url, router);
  }
}

module.exports = jsonServerModule;