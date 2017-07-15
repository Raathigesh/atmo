import { observable } from "mobx";

export default class Response {
  @observable type: string = "json";
  @observable responseContent: string = "";
}
