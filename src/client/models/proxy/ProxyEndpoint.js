import { observable, computed } from 'mobx';

export default class ProxyEndpoint {
  @observable url;
  @observable urlToProxy;
  type;

  constructor(url, urlToProxy) {
    this.url = url;
    this.urlToProxy = urlToProxy;
    this.type = 'proxy';
  }

  setUrl(url) {
    this.url = url;
  }

  setProxyUrl(url) {
    this.urlToProxy = url;
  }

  @computed get displayEndpoint() {
    return this.url;
  }
}
