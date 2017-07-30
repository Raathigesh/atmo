import { observable, action } from "mobx";

export default class ViewStore {
  @observable isProjectPreferenceOpen = false;
  @observable isProjectIntro = false;
  @observable isRemoteDeployOpen = false;

  @action.bound
  openProjectPreferenceDialog() {
    this.isProjectPreferenceOpen = true;
  }

  @action.bound
  closeProjectPreferenceDialog() {
    this.isProjectPreferenceOpen = false;
  }

  @action.bound
  openRemoteDeployDialog() {
    this.isRemoteDeployOpen = true;
  }

  @action.bound
  closeRemoteDeployDialog() {
    this.isRemoteDeployOpen = false;
  }
}
