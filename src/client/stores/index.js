import mobx, {observable, computed} from 'mobx';
import {observer} from 'mobx-react';
import Endpoint from '../models/Endpoint';
import Header from '../models/Header';
import Response from '../models/Response';
import DevTools from 'mobx-react-devtools';
import Beamer from '../lib/Beamer';
import contentTypes from '../models/ContentTypes';
import SocketEndpoint from '../models/socket/SocketEndpoint';
import GraphqlEndpoint from '../models/graphql/GraphqlEndpoint';
import { initial, deploying, deployed, failed } from '../models/Statuses';

class AppState {
  @observable endpoints = [];
  @observable currentRequest;
  @observable port = 0;
  @observable status = null;

  constructor() {
    this.responseTypes = contentTypes;
    this.initialize();
    this.status = initial;

    this.beamer = new Beamer('http://localhost:3333');
    this.beamer.onStart((data) => {
      this.port = data.port;
      this.loadSpec(data.spec);
    });
    
    this.beamer.onDeploymentCompletion(() => {
      setTimeout(() => {
        this.status = deployed;  
      }, 800);
      
    })
  }

  setCurrentEndpoint = (index) => {
    this.currentRequest = this.endpoints[index];
  }

  createEndPoint = () => {
    this.endpoints.push(new Endpoint('/', 'GET', [new Header('cross-origin', '*')], new Response('json', '{}')));
    this.currentRequest = this.endpoints[this.endpoints.length - 1];
  }
  
  createSocketEndpoint = () => {
    this.endpoints.push(new SocketEndpoint('', '', '{}'));
    this.currentRequest = this.endpoints[this.endpoints.length - 1];
  }
  
  createGraphqlEndpoint = () => {
    this.endpoints.push(new GraphqlEndpoint('', ''));
    this.currentRequest = this.endpoints[this.endpoints.length - 1];
  }

  updateUrl = (url, index) => {
    this.endpoints[index].url = url;
  }

  getPayload = () => {
    let httpEndpoints = [];
    let socketEndpoints = [];
    let graphqlEndpoints = [];

    for(let endpoint of this.endpoints) {
      if (endpoint.type === 'http') {
        httpEndpoints.push(endpoint);
      } else if (endpoint.type === 'socket') {
        socketEndpoints.push(endpoint);
      } else if (endpoint.type === 'gql') {
        graphqlEndpoints.push(endpoint);
      }
    }

    let payload = {
      endpoints: mobx.toJSON(httpEndpoints),
      socketEndpoints: mobx.toJSON(socketEndpoints),
      graphqlEndpoints: mobx.toJSON(graphqlEndpoints),
      port: this.port
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
    for(let endpoint of spec.endpoints) {
      let response = new Response(endpoint.response.type, endpoint.response.content);
      this.endpoints.push(new Endpoint(endpoint.url, endpoint.method, this.getHeadersFromJson(endpoint), response));
    }

    for(let endpoint of spec.socketEndpoints) {
      this.endpoints.push(new SocketEndpoint(endpoint.eventName, endpoint.eventToEmit, endpoint.payload));
    }

    for(let endpoint of spec.graphqlEndpoints) {
      this.endpoints.push(new GraphqlEndpoint(endpoint.url, endpoint.schema));
    }

    this.currentRequest = this.endpoints[0];
  }
  
  getHeadersFromJson = (endpoint) => {
    let headers = [];
    for(let header of endpoint.headers) {
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
  
  initialize = () => {
    this.endpoints = [];
    this.endpoints.push(new Endpoint('/', 'GET', [new Header('cross-origin', '*')], new Response('json', '{}')));
    this.currentRequest = this.endpoints[0];
  }
  
  @computed get totalEndpoints() {
    return this.endpoints.length;
  }
};

export default new AppState();
