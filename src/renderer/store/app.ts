import { observable } from "mobx";
import Endpoint from "./Endpoint";

interface IHttpMethod {
  value: string;
  label: string;
}

class App {
  @observable public methods: IHttpMethod[];
  @observable public endpoints: Endpoint[] = [];

  constructor() {
    this.methods = [
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
  }
}

export default new App();
