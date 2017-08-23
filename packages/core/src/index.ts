const bodyParser = require("body-parser");
import * as express from "express";
const fs = require("fs");
import * as http from "http";
import * as https from "https";
const enableDestroy = require("server-destroy");
// tslint:disable-next-line
const Promise = require("bluebird");
const atob = require("atob");
import spec, { IEndpoint, IHeader } from "./spec";
let app: express.Express;
let server = null;

export default function atmoServer() {
  let serverWithApp = null;

  return {
    start: (spec: spec) => {
      return new Promise(
        (resolve: (baseUrl: string) => void, reject: (err: Error) => void) => {
          serverWithApp = createServer(spec);
          serverWithApp.server.listen(spec.server.port, (err: Error) => {
            if (err) {
              reject(err);
            }
            const serverUrl = `${serverWithApp.protocol}://localhost:${spec
              .server.port}`;
            resolve(serverUrl);
          });
        }
      );
    }
  };
}

function createServer(spec: spec) {
  if (server) {
    server.destroy();
  }

  app = express();
  let protocol = "http";

  if (spec.server.certificatePath && spec.server.keyPath) {
    const options = {
      key: fs.readFileSync(spec.server.keyPath),
      cert: fs.readFileSync(spec.server.certificatePath),
      requestCert: false,
      rejectUnauthorized: false
    };
    server = https.createServer(options, app);
    protocol = "https";
  } else {
    server = http.createServer(app);
  }
  enableDestroy(server);

  app.use(bodyParser());
  app.use(bodyParser.urlencoded({ extended: true }));

  if (spec.server.staticFolder) {
    app.use(express.static(spec.server.staticFolder));
  }

  server.listen(spec.server.port, () => {
    console.log(`http://localhost:${spec.server.port}`);
  });

  updateRoutes(app, spec.endpoints);

  return {
    protocol,
    server,
    app
  };
}

function updateRoutes(serverApp: express.Express, endpoints: IEndpoint[]) {
  for (const endpoint of endpoints) {
    addRoute(serverApp, endpoint);
  }
}

function addRoute(serverApp: express.Express, endpoint: IEndpoint) {
  serverApp[
    endpoint.method
  ](endpoint.url, (req: express.Request, res: express.Response) => {
    if (endpoint.delay === 0) {
      responseCallback(req, res, endpoint);
    } else {
      setTimeout(() => {
        console.log("executing......");
        responseCallback(req, res, endpoint);
      }, endpoint.delay * 1000);
    }
  });
}

function responseCallback(
  req: express.Request,
  res: express.Response,
  endpoint: IEndpoint
) {
  setHeaders(res, endpoint.headers);
  res.status(endpoint.statusCode);

  let content = endpoint.response.content;

  if (endpoint.response.contentType !== "json") {
    content = atob(endpoint.response.content);
  }

  if (endpoint.response.contentType === "javascript") {
    const request = req;
    const response = res;
    eval(content);
  } else {
    res.send(content);
  }
}

function setHeaders(res: express.Response, headers: IHeader[]) {
  headers.forEach((header: IHeader) => {
    if (header.key !== "") {
      res.set(header.key, header.value);
    }
  });
}
