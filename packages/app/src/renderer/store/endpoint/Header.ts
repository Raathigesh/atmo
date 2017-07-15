import { observable } from "mobx";

export default class Header {
  @observable id: string = "";
  @observable key: string = "";
  @observable value: string = "";

  constructor(id: string, key: string, value: string) {
    this.id = id;
    this.key = key;
    this.value = value;
  }
}
