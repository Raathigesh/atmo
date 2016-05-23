import mobx, {observable, computed} from 'mobx';
import {observer} from 'mobx-react';
import Endpoint from '../models/Endpoint';
import Header from '../models/Header';
import Response from '../models/Response';
import DevTools from 'mobx-react-devtools';
import Beamer from '../lib/Beamer';

class AppState {
  @observable endpoints = [];
  @observable currentRequest;
  @observable port = 5000;

  constructor() {
    this.endpoints.push(new Endpoint('/', 'GET', [new Header('cross-origin', '*')], new Response('json', '{}')));
    this.currentRequest = this.endpoints[0];

    this.beamer = new Beamer('http://localhost:3000');
  }

  setCurrentEndpoint = (index) => {
    this.currentRequest = this.endpoints[index];
  }

  createEndPoint = () => {
    this.endpoints.push(new Endpoint('/', 'GET', [new Header('cross-origin', '*')], new Response('json', '{}')));
    this.currentRequest = this.endpoints[this.endpoints.length - 1];
  }

  updateUrl = (url, index) => {
    this.endpoints[index].url = url;
  }

  getPayload = () => {
    let payload = {
      endpoints: mobx.toJSON(this.endpoints),
      port: this.port
    };
    return payload;
  }

  deployChanges = () => {
    this.beamer.deployChanges(this.getPayload());
  }
};

export default new AppState();
