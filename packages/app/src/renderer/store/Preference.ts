import { observable, action } from "mobx";

export default class Preference {
  @observable zeitToken: string = "";
  @observable certificatePath: string = "54654654654";
  @observable keyPath: string = "asdasdasdasdasd";

  @action.bound
  setZeitToken(token: string) {
    this.zeitToken = token;
  }

  @action.bound
  setCertificatePath(path: string) {
    this.certificatePath = path;
  }

  @action.bound
  setKeyPath(path: string) {
    this.keyPath = path;
  }
}
