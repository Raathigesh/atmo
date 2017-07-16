import { observable, action } from "mobx";

export default class Response {
  @observable type: string;
  @observable responseContent: string;

  constructor(type: string = "json", responseContent: string = "200") {
    this.type = type;
    this.responseContent = responseContent;
  }

  @action
  setType = (value: string) => {
    this.type = value;
  };

  @action
  setResponseContent = (response: string) => {
    this.responseContent = response;
  };

  toJson() {
    return {
      type: this.type,
      responseContent: this.responseContent
    };
  }

  static deserialize({
    type,
    responseContent
  }: {
    type: string;
    responseContent: string;
  }) {
    return new Response(type, responseContent);
  }
}
