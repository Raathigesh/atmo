import { observable, action, computed } from "mobx";
import { bind } from "decko";

type ResponseType = "json" | "xml" | "javascript" | "text";

export default class Response {
  @observable type: ResponseType;
  @observable responseContent: string;

  constructor(type: ResponseType = "json", responseContent: string = "200") {
    this.type = type;
    this.responseContent = responseContent;
  }

  @bind
  @action
  setType(value: ResponseType) {
    this.type = value;
  }

  @bind
  @action
  setResponseContent(response: string) {
    this.responseContent = response;
  }

  @computed
  get typeForEditor() {
    if (this.type === "text") {
      return "markdown"; // Ace editor does not understand text
    }

    return this.type;
  }

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
    type: ResponseType;
    responseContent: string;
  }) {
    return new Response(type, responseContent);
  }
}
