import { observable, action } from "mobx";

export default class Deployment {
  @observable uid: string;
  @observable name: string;
  @observable url: string;
  @observable date: Date;
  now: any;

  constructor(
    uid: string,
    name: string,
    url: string,
    date: string,
    client: any
  ) {
    this.uid = uid;
    this.name = name;
    this.url = url;
    this.now = client;
    this.date = new Date(Number(date));
  }

  @action.bound
  deleteDeployment() {
    return this.now.deleteDeployment(this.uid);
  }
}
