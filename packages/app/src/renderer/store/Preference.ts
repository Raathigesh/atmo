import { observable, action } from "mobx";

export default class Preference {
  @observable zeitToken: string = "";
  @observable certificatePath: string = "";
  @observable keyPath: string = "";
  @observable port: number = 9000;
  @observable assetsDirectory: string = "";

  @action
  setZeitToken(token: string) {
    this.zeitToken = token;
  }

  @action
  setCertificatePath(path: string) {
    this.certificatePath = path;
  }

  @action
  setKeyPath(path: string) {
    this.keyPath = path;
  }

  @action
  setPort(port: number) {
    this.port = port;
  }

  @action
  setAssetsDirectory(directory: string) {
    this.assetsDirectory = directory;
  }

  toJson() {
    return {
      zeitToken: this.zeitToken,
      certificatePath: this.certificatePath,
      keyPath: this.keyPath,
      assetsDirectory: this.assetsDirectory
    };
  }
}
