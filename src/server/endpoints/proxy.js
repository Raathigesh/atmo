
var proxy = require('express-http-proxy');

function proxyModule(app, spec) {
  for (var i = 0; i < spec.proxyEndpoints.length; i++) {
    var endpoint = spec.proxyEndpoints[i];
    app.use(endpoint.url, proxy(endpoint.urlToProxy, {
      forwardPath: function (req, res) {
        return require('url').parse(req.url).path;
      },
      intercept: function(rsp, data, req, responseOut, callback) {
        responseOut.set('Access-Control-Allow-Origin', '*');
        callback(null, data);
      }
    }));
  }

}

module.exports = proxyModule;