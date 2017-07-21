import Header from "./Header";
import Response from "./Response";
const shortid = require("shortid");
import { observable, action, IObservableArray } from "mobx";

export default class Endpoint {
  @observable id: string;
  @observable url: string = "";
  @observable method: string = "get";
  @observable headers: IObservableArray<Header> = observable([]);
  @observable response: Response;
  @observable responseCode: string = "200";
  @observable delay: number = 0;

  constructor() {
    this.id = shortid.generate();
    this.response = new Response();
    this.headers.push(new Header(shortid.generate(), "", ""));
  }

  @action
  setUrl = (url: string) => {
    this.url = url;
  };

  @action
  setMethod = (method: string) => {
    this.method = method;
  };

  @action
  addHeader = (key: string = "", value: string = "") => {
    this.headers.push(new Header(shortid.generate(), key, value));
  };

  @action
  removeHeader = (id: string) => {
    this.headers.remove(this.headers.find(header => header.id === id));
  };

  @action
  setResponseCode = (code: string) => {
    this.responseCode = code;
  };

  @action
  setDelay = (delay: number) => {
    this.delay = delay;
  };

  toJson() {
    return {
      url: this.url,
      method: this.method,
      headers: this.headers.map(header => header.toJson()),
      response: this.response.toJson(),
      responseCode: this.responseCode,
      delay: this.delay
    };
  }

  static deserialize() {}
}
