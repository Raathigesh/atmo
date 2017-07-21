import { observable, action } from "mobx";
const { ipcRenderer } = require("electron");
import { appStore } from "./AppStore";

export default class ProjectStore {
  @observable name: string;
  @observable
  recentProjects: {
    name: string;
    path: string;
  }[];
  @observable
  preference: {
    zeitToken: string;
  };

  constructor() {
    ipcRenderer.on("open", (event, arg) => {
      debugger;
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
  public deploy() {
    // ipcRenderer.send("deploy", appStore.toJson());
    console.log(appStore.toJson());
  }
}
