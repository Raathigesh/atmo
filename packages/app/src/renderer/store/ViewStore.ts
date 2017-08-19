import { observable, action } from "mobx";

export default class ViewStore {
  @observable isProjectPreferenceOpen = false;
  @observable isProjectIntro = true;
  @observable isRemoteDeployOpen = false;
  @observable isCloseConfirmationOpen = false;

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

  @action.bound
  openProjectIntroDialog() {
    this.isProjectIntro = true;
  }

  @action.bound
  closeProjectIntroDialog() {
    this.isProjectIntro = false;
  }

  @action.bound
  openCloseConfirmation() {
    this.isCloseConfirmationOpen = true;
  }

  @action.bound
  closeCloseConfirmation() {
    this.isCloseConfirmationOpen = false;
  }
}

export const viewState = new ViewStore();
