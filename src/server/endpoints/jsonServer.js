
var jsonServer = require('json-server');

function jsonServerModule(app, spec) {
  var router = null;
  if (spec.jsonServerEndpoint) {
    router = jsonServer.router(JSON.parse(spec.jsonServerEndpoint.model));
    app.use(spec.jsonServerEndpoint.url, router);
  }
  return router;
}

module.exports = jsonServerModule;