import { observable, action, runInAction, autorun, computed } from "mobx";
import { appStore } from "./AppStore";
import notification from "./NotificationStore";
import Preference from "./Preference";
import Deployments from "./deployment/Deployments";
import MessageHandler, {
  openProject,
  save,
  saveToken,
  openDialog,
  deployProject,
  openExternalUrlInBrowser,
  fetchInitialConfig
} from "./MessageHandler";

export class ProjectStore {
  @observable name: string = "new-project";
  @observable baseUrl: string = "";
  @observable
  recentProjects: {
    name: string;
    path: string;
  }[];
  @observable preference: Preference = new Preference();
  @observable deployments: Deployments = new Deployments();

  constructor() {
    MessageHandler({
      hello: initialConfig => {
        runInAction(() => {
          this.preference.setZeitToken(initialConfig.zeitToken);
        });
      },
      onAssetPath: path => {
        runInAction(() => {
          this.preference.setAssetsDirectory(path);
        });
      },
      onKeyPath: path => {
        runInAction(() => {
          this.preference.setKeyPath(path);
        });
      },
      onCertPath: path => {
        runInAction(() => {
          this.preference.setCertificatePath(path);
        });
      },
      deployed: (baseUrl: string) => {
        runInAction(() => {
          this.baseUrl = baseUrl;
          notification.success("Your changes have been deployed");
        });
      }
    });

    autorun(() => {
      this.deployments.initialize(this.preference.zeitToken, this.name);
    });

    fetchInitialConfig();
  }

  @action
  public save() {
    save(appStore.toJson());
  }

  @action
  public openProject() {
    openProject();
  }

  @action.bound
  public setZeitToken(token: string) {
    this.preference.setZeitToken(token);
    saveToken(token);
  }

  @action
  public getCertificatePath() {
    openDialog({
      action: "CertPath"
    });
  }

  @action
  public getKeyPath() {
    openDialog({
      action: "KeyPath"
    });
  }

  @action
  public getAssetPath() {
    openDialog({
      action: "AssetPath"
    });
  }

  @action
  public deploy = () => {
    deployProject(appStore.toJson());
  };

  @action
  public remoteDeploy = () => {
    this.deployments.deploy(appStore.toJson()).then(res => {
      console.log(res);
    });
  };

  @action
  public openUrl = (url: string) => {
    openExternalUrlInBrowser(url);
  };
}

const projectStore = new ProjectStore();
export default projectStore;
