import { observable, action } from "mobx";
import { bind, memoize, debounce } from "decko";

export default class ViewStore {
  @observable isProjectPreferenceOpen = false;

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
