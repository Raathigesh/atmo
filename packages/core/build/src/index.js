"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var bodyParser = require("body-parser");
var express = require("express");
var fs = require("fs");
var http = require("http");
var https = require("https");
var enableDestroy = require("server-destroy");
var Promise = require("bluebird");
var atob = require("atob");
var app;
var server = null;
function atmoServer() {
    var serverWithApp = null;
    return {
        start: function (spec) {
            return new Promise(function (resolve, reject) {
                serverWithApp = createServer(spec);
                serverWithApp.server.listen(spec.server.port, function (err) {
                    if (err) {
                        reject(err);
                    }
                    var serverUrl = serverWithApp.protocol + "://localhost:" + spec
                        .server.port;
                    resolve(serverUrl);
                });
            });
        }
    };
}
exports.default = atmoServer;
function createServer(spec) {
    if (server) {
        server.destroy();
    }
    app = express();
    var protocol = "http";
    if (spec.server.certificatePath && spec.server.keyPath) {
        var options = {
            key: fs.readFileSync(spec.server.keyPath),
            cert: fs.readFileSync(spec.server.certificatePath),
            requestCert: false,
            rejectUnauthorized: false
        };
        server = https.createServer(options, app);
        protocol = "https";
    }
    else {
        server = http.createServer(app);
    }
    enableDestroy(server);
    app.use(bodyParser());
    app.use(bodyParser.urlencoded({ extended: true }));
    if (spec.server.staticFolder) {
        app.use(express.static(spec.server.staticFolder));
    }
    server.listen(spec.server.port, function () {
        console.log("http://localhost:" + spec.server.port);
    });
    updateRoutes(app, spec.endpoints);
    return {
        protocol: protocol,
        server: server,
        app: app
    };
}
function updateRoutes(serverApp, endpoints) {
    for (var _i = 0, endpoints_1 = endpoints; _i < endpoints_1.length; _i++) {
        var endpoint = endpoints_1[_i];
        addRoute(serverApp, endpoint);
    }
}
function addRoute(serverApp, endpoint) {
    serverApp[endpoint.method](endpoint.url, function (req, res) {
        if (endpoint.delay === 0) {
            responseCallback(req, res, endpoint);
        }
        else {
            setTimeout(function () {
                console.log("executing......");
                responseCallback(req, res, endpoint);
            }, endpoint.delay * 1000);
        }
    });
}
function responseCallback(req, res, endpoint) {
    setHeaders(res, endpoint.headers);
    res.status(endpoint.statusCode);
    var content = endpoint.response.content;
    if (endpoint.response.contentType !== "json") {
        content = atob(endpoint.response.content);
    }
    if (endpoint.response.contentType === "javascript") {
        var request = req;
        var response = res;
        eval(content);
    }
    else {
        res.send(content);
    }
}
function setHeaders(res, headers) {
    headers.forEach(function (header) {
        if (header.key !== "") {
            res.set(header.key, header.value);
        }
    });
}
//# sourceMappingURL=index.js.map