import {observable} from 'mobx';

export default class Status {
  @observable icon;
  @observable message;
  @observable miniMessage;
  @observable color;

  constructor(icon, message, miniMessage, color) {
    this.icon = icon;
    this.message = message;
    this.miniMessage = miniMessage;
    this.color = color;
  }
}
