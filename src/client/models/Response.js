import {observable} from 'mobx';

export default class Response {
  @observable type;
  @observable content;

  constructor(type, content) {
    this.type = type;
    this.content = content;
  }
}
