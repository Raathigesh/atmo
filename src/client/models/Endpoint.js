import {observable} from 'mobx';
import Header from './Header';

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
  
  addEmptyHeader() {
    this.headers.push(new Header('', ''));
  }
  
  removeHeader(index) {
    this.headers.splice(index, 1);
  }
}
