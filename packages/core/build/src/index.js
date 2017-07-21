"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var bodyParser = require("body-parser");
var express = require("express");
var http = require("http");
var enableDestroy = require("server-destroy");
var Promise = require("bluebird");
var app;
var server = null;
function atmoServer() {
    var serverWithApp = null;
    return {
        start: function (spec) {
            return new Promise(function (resolve, reject) {
                serverWithApp = createServer(spec);
                serverWithApp.server.listen(9000, function (err) {
                    if (err) {
                        reject(err);
                    }
                    resolve();
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
    server = http.createServer(app);
    app.use(bodyParser());
    app.use(bodyParser.urlencoded({ extended: true }));
    server.listen(spec.server.port, function () {
        console.log("http://localhost:" + spec.server.port);
    });
    enableDestroy(server);
    updateRoutes(app, spec.endpoints);
    return {
        server: server,
        app: app
    };
}
function updateRoutes(app, endpoints) {
    for (var _i = 0, endpoints_1 = endpoints; _i < endpoints_1.length; _i++) {
        var endpoint = endpoints_1[_i];
        addRoute(app, endpoint);
    }
}
function addRoute(app, endpoint) {
    if (endpoint.method === "get") {
        app.get(endpoint.url, function (req, res) {
            responseCallback(res, endpoint);
        });
    }
    else if (endpoint.method === "post") {
        app.post(endpoint.url, function (req, res) {
            responseCallback(res, endpoint);
        });
    }
    else if (endpoint.method === "put") {
        app.put(endpoint.url, function (req, res) {
            responseCallback(res, endpoint);
        });
    }
    else if (endpoint.method === "patch") {
        app.patch(endpoint.url, function (req, res) {
            responseCallback(res, endpoint);
        });
    }
    else if (endpoint.method === "delete") {
        app.delete(endpoint.url, function (req, res) {
            responseCallback(res, endpoint);
        });
    }
    else if (endpoint.method === "copy") {
        app.copy(endpoint.url, function (req, res) {
            responseCallback(res, endpoint);
        });
    }
    else if (endpoint.method === "head") {
        app.head(endpoint.url, function (req, res) {
            responseCallback(res, endpoint);
        });
    }
    else if (endpoint.method === "options") {
        app.options(endpoint.url, function (req, res) {
            responseCallback(res, endpoint);
        });
    }
    else if (endpoint.method === "purge") {
        app.purge(endpoint.url, function (req, res) {
            responseCallback(res, endpoint);
        });
    }
    else if (endpoint.method === "lock") {
        app.lock(endpoint.url, function (req, res) {
            responseCallback(res, endpoint);
        });
    }
    else if (endpoint.method === "unlock") {
        app.unlock(endpoint.url, function (req, res) {
            responseCallback(res, endpoint);
        });
    }
}
function responseCallback(res, endpoint) {
    setHeaders(res, endpoint.headers);
    res.status(endpoint.statusCode);
    if (endpoint.response.contentType === "JavaScript") {
        eval(endpoint.response.content);
    }
    else {
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
//# sourceMappingURL=index.js.map