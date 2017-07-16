import { observable, action } from "mobx";

export default class Response {
  @observable type: string = "json";
  @observable responseContent: string = "200";

  @action
  setType = (value: string) => {
    this.type = value;
  };

  @action
  setResponseContent = (response: string) => {
    this.responseContent = response;
  };
}
