import { observable } from "mobx";

export default class Endpoint {
  @observable public method: string;
  @observable public url: string;
}
