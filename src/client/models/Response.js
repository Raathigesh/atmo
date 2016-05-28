import {observable} from 'mobx';
import ContentType from './ContentType';
import ContentTypes from './ContentTypes';

export default class Response {
  @observable type;
  @observable content;
  @observable contentType;

  constructor(type, content) {
    this.type = type;
    this.content = content;
    this.contentType = ContentTypes[0];
  }
  
  setType = (type) => {
    this.type = type;
  }
  
  setContentType = (contentType) => {
    this.contentType = contentType;
  }
}
