function allowCrossDomain(req, res, next) {
  // intercept OPTIONS method
  if ('OPTIONS' == req.method) {
    var allowHeaders = req.headers['access-control-request-headers'] ? req.headers['access-control-request-headers'] + ',' : '';
    allowHeaders += 'Content-Type,Authorization';

    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', allowHeaders);

    res.sendStatus(200);
  } else {
    next();
  }
}

function httpModule(app, spec) {
  app.use(allowCrossDomain);

  for (var i = 0; i < spec.endpoints.length; i++) {
    addRoute(app, spec.endpoints[i]);
  }
}

/**
 * Adds new routes
 */
function addRoute(app, endpoint) {
  if (endpoint.method === 'GET') {
    app.get(endpoint.url, function (req, res) {
      responseCallback(req, res, endpoint);
    });
  } else if (endpoint.method === 'POST') {
    app.post(endpoint.url, function (req, res) {
      responseCallback(req, res, endpoint);
    });
  } else if (endpoint.method === 'PUT') {
    app.put(endpoint.url, function (req, res) {
      responseCallback(req, res, endpoint);
    });
  } else if (endpoint.method === 'PATCH') {
    app.patch(endpoint.url, function (req, res) {
      responseCallback(req, res, endpoint);
    });
  } else if (endpoint.method === 'DELETE') {
    app.delete(endpoint.url, function (req, res) {
      responseCallback(req, res, endpoint);
    });
  } else if (endpoint.method === 'COPY') {
    app.copy(endpoint.url, function (req, res) {
      responseCallback(req, res, endpoint);
    });
  } else if (endpoint.method === 'HEAD') {
    app.head(endpoint.url, function (req, res) {
      responseCallback(req, res, endpoint);
    });
  } else if (endpoint.method === 'OPTIONS') {
    app.options(endpoint.url, function (req, res) {
      responseCallback(req, res, endpoint);
    });
  } else if (endpoint.method === 'PURGE') {
    app.purge(endpoint.url, function (req, res) {
      responseCallback(req, res, endpoint);
    });
  } else if (endpoint.method === 'LOCK') {
    app.lock(endpoint.url, function (req, res) {
      responseCallback(req, res, endpoint);
    });
  } else if (endpoint.method === 'UNLOCK') {
    app.unlock(endpoint.url, function (req, res) {
      responseCallback(req, res, endpoint);
    });
  }
}

function responseCallback(req, res, endpoint) {
  setHeaders(res, endpoint.headers);
  
  res.status(endpoint.response.responseCode);

  if(endpoint.response.contentType.type === 'JavaScript') {
    setContentTypeHeader(res, 'application/json');
    eval(endpoint.response.content);
  } else {
    setContentTypeHeader(res, endpoint.response.contentType.contentType);
    res.send(endpoint.response.content);
  }  
}

function setHeaders(res, headers) {
  headers.forEach(function (header) {
    if (header.key !== "") {
      res.set(header.key, header.value);
    }
  });
}

function setContentTypeHeader(res, contentType) {
  res.set('Content-Type', contentType);
}

module.exports = httpModule;