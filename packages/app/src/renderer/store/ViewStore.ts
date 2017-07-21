import { observable, action } from "mobx";
import { bind } from "decko";

export default class ViewStore {
  @observable isProjectPreferenceOpen = false;
  @observable isProjectIntro = false;

  @bind
  @action
  openProjectPreferenceDialog() {
    this.isProjectPreferenceOpen = true;
  }

  @bind
  @action
  closeProjectPreferenceDialog() {
    this.isProjectPreferenceOpen = false;
  }
}
