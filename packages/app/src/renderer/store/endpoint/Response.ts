import { observable, action, computed } from "mobx";
import { bind } from "decko";

type ResponseType = "json" | "xml" | "javascript" | "text";

export default class Response {
  @observable contentType: ResponseType;
  @observable content: string;

  constructor(type: ResponseType = "json", responseContent: string = "") {
    this.contentType = type;
    this.content = responseContent;
  }

  @bind
  @action
  setType(value: ResponseType) {
    this.contentType = value;
  }

  @bind
  @action
  setResponseContent(response: string) {
    this.content = response;
  }

  @computed
  get typeForEditor() {
    if (this.contentType === "text") {
      return "markdown"; // Ace editor does not understand text
    }

    return this.contentType;
  }

  toJson() {
    return {
      contentType: this.contentType,
      content: this.content
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
