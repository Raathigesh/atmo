import { observable, action } from "mobx";

export default class Header {
  @observable id: string = "";
  @observable key: string = "";
  @observable value: string = "";
  @observable active: boolean = true;

  constructor(id: string, key: string, value: string) {
    this.id = id;
    this.key = key;
    this.value = value;
  }

  @action
  setKey = (value: string) => {
    this.key = value;
  };

  @action
  setValue = (value: string) => {
    this.value = value;
  };

  @action
  toggleActive = () => {
    this.active = !this.active;
  };
}
