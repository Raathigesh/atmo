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
import { parseSpec, getPayload, isAnyJsonServerEndpointAvailable } from '../lib/Util';

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

    /**
     * When in production build, the server which is serving the html is the same server
     * handling the other functionality as well. So just connect to the current origin.
     */
    let devServerUrl = window.location.origin;

    // While developing and when the app is served through webpack-dev-server, we want
    // to connect to the localhost server specifically. __DEV__ is configured in webpack config
    // through DefinePlugin.
    if (__DEV__) {
      devServerUrl = 'http://localhost:3333';
    }

    this.beamer = new Beamer(devServerUrl);
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

  /**
   * Reinitializes the endpoint array.
   */
  initialize = () => {
    this.endpoints = [];
    this.endpoints.push(new Endpoint('/', 'GET', [new Header('Access-Control-Allow-Origin', '*')], new Response(contentTypes[0], '{}')));
    this.currentRequest = this.endpoints[0];
  }

  /**
   * Sets the current active endpoint
   */
  setCurrentEndpoint = (index) => {
    this.currentRequest = this.endpoints[index];
  }

  /**
   * Creates a new http endpoint
   */
  createEndPoint = () => {
    this.endpoints.push(new Endpoint('/', 'GET', [new Header('Access-Control-Allow-Origin', '*')], new Response(contentTypes[0], '{}')));
    this.currentRequest = this.endpoints[this.endpoints.length - 1];
  }

  /**
   * Creates a new socket endpoint
   */
  createSocketEndpoint = () => {
    this.endpoints.push(new SocketEndpoint('', '', '{}', 'all'));
    this.currentRequest = this.endpoints[this.endpoints.length - 1];
  }

  /**
   * Creates a new graphql endpoint
   */
  createGraphqlEndpoint = () => {
    this.endpoints.push(new GraphqlEndpoint('', initialGraphqlSchema));
    this.currentRequest = this.endpoints[this.endpoints.length - 1];
  }

  /**
   * Creates a new json server endpoint if one already doesn't exists
   */
  createJsonServerEndpoint = () => {
    if (!isAnyJsonServerEndpointAvailable(this.endpoints)) {
      this.endpoints.push(new JsonServerEndpoint('/api', initialJsonServerDb));
      this.currentRequest = this.endpoints[this.endpoints.length - 1];
    } else {
      this.msg = 'Only one json-server endpoint is supported at a time.'
    }
  }

  /**
   * Creates a new prodxy endpoint
   */
  createProxyEndpoint = () => {
    this.endpoints.push(new ProxyEndpoint('/proxy', ''));
    this.currentRequest = this.endpoints[this.endpoints.length - 1];
  }

  /**
   * Returns the state of the endpoints
   */
  getPayload = () => {
    return getPayload(this.endpoints);
  }

  /**
   * Sents socket event to deploy the new changes
   */
  deployChanges = () => {
    this.status = deploying;
    this.beamer.deployChanges(this.getPayload());
  }

  /**
   * Sents socket event to save the application state
   */
  saveChanges = () => {
    this.beamer.saveChanges(this.getPayload());
  }

  /**
   * Parses a spec to endpoints
   */
  loadSpec = (spec) => {
    this.endpoints = parseSpec(spec);
    this.currentRequest = this.endpoints[0];
  }

  /**
   * Deletes the current endpoint
   */
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

  /**
   * Updates the json server DB of the exising json-server endpoint.
   * Maximum of one json-server endpoint is supported.
   */
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

  /**
   * Rerturns total endpoint length
   */
  @computed get totalEndpoints() {
    return this.endpoints.length;
  }

  /**
   * Emits a socket event to the server to start generating the project
   * through code generation. Spec and name of the geenrator is sent as 
   * payload.
   */
  generateProject = (generator) => {
    this.beamer.generateProject({
      spec: this.getPayload(),
      generator: generator
    });
  }

  /**
   * Emits an socket event informing the server to start installing a generator.
   * Name of the geenrator that should be installed is sent as payload.
   */
  installGenerator = (name) => {
    this.msg = `Started installing ${name}`;
    this.beamer.installGenerator(name);
  }

  /**
   * Emits a socket event asking for the updates json-server db. This is beacause,
   * in memory json-server DB can be in a differnt state from the initial since users
   * can create resources or delete existing resouces through the generated REST endpoints 
   */
  syncJsonServer = () => {
    this.beamer.syncJsonServer();
  }

  /**
   * Updates notification. The notification component will show this in the UI
   * when this method is called.
   */
  showNotification = (msg) => {
    this.msg = msg;
    this.msg = '';
  }
};

export default new AppState();
