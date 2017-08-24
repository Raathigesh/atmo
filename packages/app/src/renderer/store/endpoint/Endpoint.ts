import Header from "./Header";
import Response, { ResponseType } from "./Response";
const shortid = require("shortid");
import { observable, action, IObservableArray } from "mobx";
import Headers from "./Headers";
import initialJson from "./initialJsonContent";

export default class Endpoint {
  @observable id: string;
  @observable url: string = "";
  @observable method: string = "get";
  @observable headers: Headers;
  @observable response: Response;
  @observable statusCode: string = "200";
  @observable delay: number = 0;

  constructor() {
    this.id = shortid.generate();
    this.headers = new Headers();
    this.response = new Response("json", initialJson);
  }

  @action.bound
  setUrl(url: string) {
    this.url = url;
  }

  @action.bound
  setMethod(method: string) {
    this.method = method;
  }

  @action.bound
  setResponseCode(code: string) {
    this.statusCode = code;
  }

  @action.bound
  setDelay(delay: number) {
    this.delay = delay;
  }

  @action.bound
  changeResponseType(type: ResponseType) {
    this.response.setType(type);
    this.headers.setContentTypeForResponseType(type);
  }

  toJson() {
    return {
      url: this.url,
      method: this.method,
      headers: this.headers.toJson(),
      response: this.response.toJson(),
      statusCode: this.statusCode,
      delay: this.delay
    };
  }

  static deserialize() {}
}
