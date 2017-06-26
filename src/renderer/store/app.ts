import { observable } from "mobx";
import Endpoint from "./EndPoint";

import HttpBaseStore from "../../lib/blocks/httpBase/store/store";

class App {
  @observable private endpoints: Endpoint[] = [];

  constructor() {
    const endpoint = new Endpoint();
    endpoint.addBlock("base", new HttpBaseStore());
    this.addEndpoint(endpoint);
  }

  public addEndpoint(endpoint: Endpoint) {
    this.endpoints.push(endpoint);
  }
}

export default new App();
