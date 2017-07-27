import { observable, action } from "mobx";
import { bind } from "decko";

export interface INotification {
  message: string;
  level: string;
}

export default class NotificationStore {
  @observable notification: INotification;

  constructor() {
    this.notification = null;
  }

  success(message: string) {
    debugger;
    this.notification = {
      message: "sdsdsd",
      level: "success"
    };
  }
}

export const notification = new NotificationStore();
