import mobx, {observable, computed} from 'mobx';
import {observer} from 'mobx-react';
import Endpoint from '../models/http/Endpoint';
import Header from '../models/http/Header';
import Response from '../models/http/Response';
import Beamer from '../lib/Beamer';
import contentTypes from '../models/http/ContentTypes';
import ContentType from '../models/http/ContentType';
import SocketEndpoint from '../models/socket/SocketEndpoint';
import GraphqlEndpoint from '../models/graphql/GraphqlEndpoint';
import initialGraphqlSchema from '../models/graphql/InitialSchema';
import JsonServerEndpoint from '../models/jsonServer/JsonServerEndpoint';
import initialJsonServerDb from '../models/jsonServer/initialJsonServerDb';
import ProxyEndpoint from '../models/proxy/ProxyEndpoint';
import { initial, deploying, deployed, failed } from '../models/Statuses';
import jsonStringfy from 'json-stringify-pretty-compact';

class AppState {
  @observable endpoints = [];
  @observable currentRequest;
  @observable port = 0;
  @observable status = null;
  @observable generators = [];
  @observable msg = null;
  @observable stars = 0;

  constructor() {
    this.responseTypes = contentTypes;
    this.initialize();
    this.status = initial;

    this.beamer = new Beamer('http://localhost:3333');
    this.beamer.onStart((data) => {
      this.port = data.port;
      this.loadSpec(data.spec);
      this.generators = data.generators;
    });

    this.beamer.onDeploymentCompletion(() => {
      setTimeout(() => {
        this.status = deployed;
      }, 800);
    });

    this.beamer.onNewGeneratorInstallation((response) => {
      this.msg = `${response.generatorName} is installed`;
      this.generators = response.generators;
    });

    this.beamer.onMessage((message) => {
      this.msg = message;
      this.msg = '';
    });

    this.beamer.onJsonServerDbUpdate((db) => {
      this.updateJsonDb(db);
    });

    $.get("https://api.github.com/repos/raathigesh/atmo/stargazers", (data) => {
        this.stars = data.length;
    });
  }

  setCurrentEndpoint = (index) => {
    this.currentRequest = this.endpoints[index];
  }

  createEndPoint = () => {
    this.endpoints.push(new Endpoint('/', 'GET', [new Header('Access-Control-Allow-Origin', '*')], new Response(contentTypes[0], '{}')));
    this.currentRequest = this.endpoints[this.endpoints.length - 1];
  }

  createSocketEndpoint = () => {
    this.endpoints.push(new SocketEndpoint('', '', '{}', 'all'));
    this.currentRequest = this.endpoints[this.endpoints.length - 1];
  }

  createGraphqlEndpoint = () => {
    this.endpoints.push(new GraphqlEndpoint('', initialGraphqlSchema));
    this.currentRequest = this.endpoints[this.endpoints.length - 1];
  }

  createJsonServerEndpoint = () => {
    if (!this.isAnyJsonServerEndpointAvailable()) {
      this.endpoints.push(new JsonServerEndpoint('/api', initialJsonServerDb));
      this.currentRequest = this.endpoints[this.endpoints.length - 1];
    } else {
      this.msg = 'Only one json-server endpoint is supported at a time.'
    }
  }

  isAnyJsonServerEndpointAvailable = () => {
    for (let endpoint of this.endpoints) {
      if (endpoint.type === 'jsonServer') {
        return true;
      }
    }
    return false;
  }

  createProxyEndpoint = () => {
    this.endpoints.push(new ProxyEndpoint('/proxy', ''));
    this.currentRequest = this.endpoints[this.endpoints.length - 1];
  }

  updateUrl = (url, index) => {
    this.endpoints[index].url = url;
  }

  getPayload = () => {
    let httpEndpoints = [];
    let socketEndpoints = [];
    let graphqlEndpoints = [];
    let proxyEndpoints = [];
    let jsonServerEndpoint = null;

    for (let endpoint of this.endpoints) {
      if (endpoint.type === 'http') {
        httpEndpoints.push(endpoint);
      } else if (endpoint.type === 'socket') {
        socketEndpoints.push(endpoint);
      } else if (endpoint.type === 'gql') {
        graphqlEndpoints.push(endpoint);
      } else if (endpoint.type === 'jsonServer') {
        jsonServerEndpoint = endpoint;
      } else if (endpoint.type === 'proxy') {
        proxyEndpoints.push(endpoint);
      }
    }

    let payload = {
      endpoints: mobx.toJSON(httpEndpoints),
      socketEndpoints: mobx.toJSON(socketEndpoints),
      graphqlEndpoints: mobx.toJSON(graphqlEndpoints),
      jsonServerEndpoint: jsonServerEndpoint,
      proxyEndpoints: mobx.toJSON(proxyEndpoints)
    };

    return payload;
  }

  deployChanges = () => {
    this.status = deploying;
    this.beamer.deployChanges(this.getPayload());
  }

  saveChanges = () => {
    this.beamer.saveChanges(this.getPayload());
  }

  updatePort = (port) => {
    this.port = port;
  }

  loadSpec = (spec) => {
    this.endpoints = [];

    if (!spec.endpoints && !spec.socketEndpoints && !spec.graphqlEndpoints && !spec.jsonServerEndpoint) {
      this.createEndPoint();
    } else {
      for (let endpoint of spec.endpoints) {
        let response = new Response(new ContentType(endpoint.response.contentType.type, endpoint.response.contentType.contentType), endpoint.response.content, endpoint.response.responseCode);
        this.endpoints.push(new Endpoint(endpoint.url, endpoint.method, this.getHeadersFromJson(endpoint), response));
      }

      for (let endpoint of spec.socketEndpoints) {
        this.endpoints.push(new SocketEndpoint(endpoint.eventName, endpoint.eventToEmit, endpoint.payload, endpoint.emitType));
      }

      for (let endpoint of spec.graphqlEndpoints) {
        this.endpoints.push(new GraphqlEndpoint(endpoint.url, endpoint.schema));
      }

      for (let endpoint of spec.proxyEndpoints) {
        this.endpoints.push(new ProxyEndpoint(endpoint.url, endpoint.urlToProxy));
      }

      if (spec.jsonServerEndpoint) {
        this.endpoints.push(new JsonServerEndpoint(spec.jsonServerEndpoint.url, spec.jsonServerEndpoint.model));
      }
    }
    this.currentRequest = this.endpoints[0];
  }

  getHeadersFromJson = (endpoint) => {
    let headers = [];
    for (let header of endpoint.headers) {
      headers.push(new Header(header.key, header.value));
    }
    return headers;
  }

  deleteEndpoint = () => {
    this.endpoints.forEach((endpoint, index) => {
      if (endpoint === this.currentRequest) {
        this.endpoints.splice(index, 1);
        if (this.endpoints[index]) {
          this.currentRequest = this.endpoints[index];
        } else {
          this.currentRequest = this.endpoints[index - 1];
        }
      }
    });
  }

  updateJsonDb = (db) => {
    if (db) {
      for (let endpoint of this.endpoints) {
        if (endpoint.type === 'jsonServer') {
          endpoint.setModel(jsonStringfy(db));
          this.showNotification('Synced json-server db.');
          break;
        }
      }
    } else {
      this.showNotification('It seems like nothing much to sync.');
    }
  }

  initialize = () => {
    this.endpoints = [];
    this.endpoints.push(new Endpoint('/', 'GET', [new Header('Access-Control-Allow-Origin', '*')], new Response(contentTypes[0], '{}')));
    this.currentRequest = this.endpoints[0];
  }

  @computed get totalEndpoints() {
    return this.endpoints.length;
  }

  generateProject = (generator) => {
    this.beamer.generateProject({
      spec: this.getPayload(),
      generator: generator
    });
  }

  installGenerator = (name) => {
    this.msg = `Started installing ${name}`;
    this.beamer.installGenerator(name);
  }

  syncJsonServer = () => {
    this.beamer.syncJsonServer();
  }

  showNotification = (msg) => {
    this.msg = msg;
    this.msg = '';
  }
};

export default new AppState();
