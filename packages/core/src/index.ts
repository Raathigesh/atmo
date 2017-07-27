const bodyParser = require("body-parser");
import * as express from "express";
import * as http from "http";
const enableDestroy = require("server-destroy");
// tslint:disable-next-line
const Promise = require("bluebird");
import spec, { IEndpoint, IHeader } from "./spec";
let app: express.Express;
let server = null;

export default function atmoServer() {
  let serverWithApp = null;

  return {
    start: (spec: spec) => {
      return new Promise(
        (resolve: () => void, reject: (err: Error) => void) => {
          serverWithApp = createServer(spec);
          serverWithApp.server.listen(9000, (err: Error) => {
            if (err) {
              reject(err);
            }
            resolve();
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
  server = http.createServer(app);

  app.use(bodyParser());
  app.use(bodyParser.urlencoded({ extended: true }));

  server.listen(spec.server.port, () => {
    console.log(`http://localhost:${spec.server.port}`);
  });

  enableDestroy(server);
  updateRoutes(app, spec.endpoints);

  return {
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
  if (endpoint.method === "get") {
    serverApp.get(
      endpoint.url,
      (req: express.Request, res: express.Response) => {
        responseCallback(res, endpoint);
      }
    );
  } else if (endpoint.method === "post") {
    serverApp.post(
      endpoint.url,
      (req: express.Request, res: express.Response) => {
        responseCallback(res, endpoint);
      }
    );
  } else if (endpoint.method === "put") {
    serverApp.put(
      endpoint.url,
      (req: express.Request, res: express.Response) => {
        responseCallback(res, endpoint);
      }
    );
  } else if (endpoint.method === "patch") {
    serverApp.patch(
      endpoint.url,
      (req: express.Request, res: express.Response) => {
        responseCallback(res, endpoint);
      }
    );
  } else if (endpoint.method === "delete") {
    serverApp.delete(
      endpoint.url,
      (req: express.Request, res: express.Response) => {
        responseCallback(res, endpoint);
      }
    );
  } else if (endpoint.method === "copy") {
    serverApp.copy(
      endpoint.url,
      (req: express.Request, res: express.Response) => {
        responseCallback(res, endpoint);
      }
    );
  } else if (endpoint.method === "head") {
    serverApp.head(
      endpoint.url,
      (req: express.Request, res: express.Response) => {
        responseCallback(res, endpoint);
      }
    );
  } else if (endpoint.method === "options") {
    serverApp.options(
      endpoint.url,
      (req: express.Request, res: express.Response) => {
        responseCallback(res, endpoint);
      }
    );
  } else if (endpoint.method === "purge") {
    serverApp.purge(
      endpoint.url,
      (req: express.Request, res: express.Response) => {
        responseCallback(res, endpoint);
      }
    );
  } else if (endpoint.method === "lock") {
    serverApp.lock(
      endpoint.url,
      (req: express.Request, res: express.Response) => {
        responseCallback(res, endpoint);
      }
    );
  } else if (endpoint.method === "unlock") {
    serverApp.unlock(
      endpoint.url,
      (req: express.Request, res: express.Response) => {
        responseCallback(res, endpoint);
      }
    );
  }
}

function responseCallback(res: express.Response, endpoint: IEndpoint) {
  setHeaders(res, endpoint.headers);
  res.status(endpoint.statusCode);

  if (endpoint.response.contentType === "JavaScript") {
    eval(endpoint.response.content);
  } else {
    res.send(endpoint.response.content);
  }
}

function setHeaders(res: express.Response, headers: IHeader[]) {
  headers.forEach((header: IHeader) => {
    if (header.key !== "") {
      res.set(header.key, header.value);
    }
  });
}
