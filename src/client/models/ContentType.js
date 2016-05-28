import { observable } from 'mobx';

export default class Endpoint {
  @observable type;
  @observable contentType;

  constructor(type, contentType) {
    this.type = type;
    this.contentType = contentType;
  }
}
