import { observable, computed } from 'mobx';

export default class GraphqlEndpoint {
  @observable url;
  @observable schema;
  type;

  constructor(url, schema) {
    this.url = url;
    this.schema = schema;
	  this.type = 'gql';
  }

  setUrl(url) {
    this.url = url;
  }

  setSchema(schema) {
    this.schema = schema;
  }

  @computed get displayEndpoint() {
    return this.url;
  }
}
