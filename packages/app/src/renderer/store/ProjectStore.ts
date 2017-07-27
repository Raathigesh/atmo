import { observable, action } from "mobx";
const { ipcRenderer } = require("electron");
import { appStore } from "./AppStore";
import { notification } from "./NotificationStore";
import Preference from "./Preference";

export default class ProjectStore {
  @observable name: string;
  @observable
  recentProjects: {
    name: string;
    path: string;
  }[];

  @observable preference: Preference = new Preference();

  constructor() {
    ipcRenderer.on(
      "open",
      action((event, arg) => {
        debugger;
        if (arg.action === "CertPath") {
          this.preference.setCertificatePath(arg.path[0]);
        }
      })
    );

    ipcRenderer.on("deployed", () => {
      notification.success("Your changes have been deployed");
    });
  }

  @action
  public save() {
    ipcRenderer.send("save", appStore.toJson());
  }

  @action
  public open() {
    ipcRenderer.send("open");
  }

  @action
  public getCertificatePath() {
    ipcRenderer.send("open", {
      action: "CertPath"
    });
  }

  @action
  public getKeyPath() {}

  @action
  public deploy() {
    ipcRenderer.send("deploy", appStore.toJson());
    console.log(appStore.toJson());
  }
}
