import { observable, action, IObservableArray } from "mobx";
const shortid = require("shortid");
import { ResponseType } from "./Response";
import Header from "./Header";

export default class Headers {
  @observable headers: IObservableArray<Header> = observable([]);

  @action.bound
  addHeader(key: string = "", value: string = "") {
    this.headers.push(new Header(shortid.generate(), key, value));
  }

  @action.bound
  removeHeader(id: string) {
    this.headers.remove(this.headers.find(header => header.id === id));
  }

  @action.bound
  setContentTypeForResponseType(responseType: ResponseType) {
    if (responseType === "json" || responseType === "javascript") {
      this.setJsonContentType();
    } else if (responseType === "xml") {
      this.setXmlContentType();
    } else if (responseType === "text") {
      this.setTextContentType();
    }
  }

  @action.bound
  setJsonContentType() {
    this.setContentTypeHeader("application/json");
  }

  @action.bound
  setXmlContentType() {
    this.setContentTypeHeader("text/xml");
  }

  @action.bound
  setTextContentType() {
    this.setContentTypeHeader("text/plain");
  }

  @action.bound
  private setContentTypeHeader(contentHeaderValue: string) {
    let contentTypeHeader = this.headers.find(
      header => header.key.trim().toLowerCase() === "Content-Type".toLowerCase()
    );

    if (contentTypeHeader) {
      contentTypeHeader.setValue(contentHeaderValue);
    } else {
      contentTypeHeader = new Header(
        shortid.generate(),
        "Content-Type",
        contentHeaderValue
      );
      this.headers.push(contentTypeHeader);
    }
  }

  toJson() {
    return this.headers.map(header => header.toJson());
  }
}
