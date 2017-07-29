import { observable, action, runInAction, autorun, computed } from "mobx";
const { ipcRenderer } = require("electron");
import { appStore } from "./AppStore";
import notification from "./NotificationStore";
import Preference from "./Preference";

export class ProjectStore {
  @observable name: string;
  @observable baseUrl: string = "";
  @observable
  recentProjects: {
    name: string;
    path: string;
  }[];

  @observable preference: Preference = new Preference();

  constructor() {
    ipcRenderer.on("open", (event, arg) => {
      if (arg.action === "CertPath") {
        runInAction(() => {
          this.preference.setCertificatePath(arg.path[0]);
        });
      } else if (arg.action === "KeyPath") {
        runInAction(() => {
          this.preference.setKeyPath(arg.path[0]);
        });
      } else if (arg.action === "AssetPath") {
        runInAction(() => {
          this.preference.setAssetsDirectory(arg.path[0]);
        });
      }
    });

    ipcRenderer.on("deployed", (event: any, baseUrl: string) => {
      runInAction(() => {
        this.baseUrl = baseUrl;
        notification.success("Your changes have been deployed");
      });
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
  public getKeyPath() {
    ipcRenderer.send("open", {
      action: "KeyPath"
    });
  }

  @action
  public getAssetPath() {
    ipcRenderer.send("open", {
      action: "AssetPath"
    });
  }

  @action
  public deploy = () => {
    ipcRenderer.send("deploy", appStore.toJson());
    console.log(appStore.toJson());
  };

  @action
  public openUrl = (url: string) => {
    ipcRenderer.send("openUrl", url);
  };
}

const projectStore = new ProjectStore();
export default projectStore;
