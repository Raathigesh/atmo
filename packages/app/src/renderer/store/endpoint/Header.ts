import { observable, action } from "mobx";
const shortid = require("shortid");

export default class Header {
  @observable id: string = "";
  @observable key: string = "";
  @observable value: string = "";
  @observable active: boolean;

  constructor(id: string, key: string, value: string, active: boolean = true) {
    this.id = id;
    this.key = key;
    this.value = value;
    this.active = active;
  }

  @action.bound
  setKey(value: string) {
    this.key = value;
  }

  @action.bound
  setValue(value: string) {
    this.value = value;
  }

  @action.bound
  toggleActive() {
    this.active = !this.active;
  }

  toJson() {
    return {
      key: this.key,
      value: this.value
    };
  }

  static deserialize({
    key,
    value,
    active
  }: {
    key: string;
    value: string;
    active: boolean;
  }) {
    return new Header(shortid.generate(), key, value, active);
  }
}
