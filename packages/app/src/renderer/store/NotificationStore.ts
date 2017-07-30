import { observable, action } from "mobx";
import { bind } from "decko";

export class Notification {
  @observable level: string = "info";
  @observable message: string = "";

  @action
  success(message: string) {
    this.level = "info";
    this.message = message;

    setTimeout(
      action(() => {
        this.message = "";
      }),
      1000
    );
  }
}

const notification = new Notification();
export default notification;
