import { observable } from "mobx";
import Endpoint from "./EndPoint";

import httpBaseBlock from "../../lib/blocks/httpBase";
import Block from "./Block";

class App {
  @observable public endpoints: Endpoint[] = [];

  constructor() {
    const endpoint = new Endpoint();
    endpoint.addBlock(httpBaseBlock);
    this.addEndpoint(endpoint);
  }

  public addEndpoint(endpoint: Endpoint) {
    this.endpoints.push(endpoint);
  }
}

export default new App();
