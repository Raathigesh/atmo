import {observable} from 'mobx';

export default class Endpoint {
  @observable url;
  @observable method;
  @observable headers;
  @observable response;

  constructor(url, method, headers, response) {
    this.url = url;
    this.method = method;
    this.headers = headers;
    this.response = response;
  }

  setUrl(url) {
    this.url = url;
  }

  setMethod(method) {
    this.method = method;
  }

  setResponse(response) {
    this.response.content = response;
  }
}
