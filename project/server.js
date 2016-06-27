var express = require('express');
var app = express();
var http = require('http');
var server = http.createServer(app);
var proxy = require('express-http-proxy');
var port = 5555;

app.get('/status', function internalStaus(req, res){
  res.send('API server running.');
});

app.get('/', function(req, res){
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Content-Type', 'application/json');
  res.status(200);
  res.send('{    "version": "1.0"}');
});


app.use('/proxy', proxy('https://api.github.com', {
  forwardPath: function(req, res) {
    return require('url').parse(req.url).path;
  }
}));

server.listen(port, function () {
    console.log('API is available at: http://localhost:' + port);
});

