import { observable, computed, action } from "mobx";

export default class HttpBase {
  @observable public method: string = "get";
  @observable public url: string = "";
  @observable
  public methods = [
    {
      value: "get",
      label: "GET"
    },
    {
      value: "post",
      label: "POST"
    },
    {
      value: "put",
      label: "PUT"
    },
    {
      value: "delete",
      label: "DELETE"
    }
  ];

  @action
  public updateMethod(method: string) {
    this.method = method;
  }

  @action
  public updateUrl(url: string) {
    this.url = url;
  }

  @computed
  get toJson() {
    return {
      method: this.method,
      url: this.url
    };
  }
}
