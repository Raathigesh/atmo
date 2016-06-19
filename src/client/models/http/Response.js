import {observable} from 'mobx';
import ContentType from './ContentType';
import ContentTypes from './ContentTypes';

export default class Response {
  @observable content;
  @observable contentType;
  @observable responseCode;

  constructor(contentType, content, responseCode = '200') {
    this.content = content;
    this.contentType = contentType;
    this.responseCode = responseCode;
  }

  setType = (type) => {
    this.type = type;
  }

  setContentType = (contentType) => {
    this.contentType = contentType;
  }

  setResponseCode = (code) => {
    this.responseCode = code;
  }
}
