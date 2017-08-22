import { observable, action } from "mobx";

export class Notification {
  @observable level: string = "info";
  @observable message: string = "";

  @action
  success(message: string) {
    this.show(message, "success");
  }

  @action
  info(message: string) {
    this.show(message, "info");
  }

  @action
  error(message: string) {
    this.show(message, "error");
  }

  @action
  warning(message: string) {
    this.show(message, "warning");
  }

  @action
  show(message: string, level: string) {
    this.level = level;
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
