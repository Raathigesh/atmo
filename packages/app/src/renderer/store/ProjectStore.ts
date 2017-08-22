import {
  observable,
  action,
  runInAction,
  autorun,
  computed,
  IObservableArray
} from "mobx";
import { appStore } from "./AppStore";
import notification from "./NotificationStore";
import Preference from "./Preference";
import { viewState } from "./ViewStore";
import Deployments from "./deployment/Deployments";
import MessageHandler, {
  save,
  saveToken,
  openDialog,
  deployProject,
  openExternalUrlInBrowser,
  fetchInitialConfig,
  updateRecentProjects
} from "./MessageHandler";

export interface IRecentProject {
  name: string;
  path: string;
  createdDate: string;
}

export class ProjectStore {
  @observable name: string = "";
  @observable baseUrl: string = "";
  @observable recentProjects: IObservableArray<IRecentProject> = observable([]);
  @observable preference: Preference = new Preference();
  @observable deployments: Deployments = new Deployments();
  @observable savedUrl: string = null;

  constructor() {
    MessageHandler({
      hello: initialConfig => {
        runInAction(() => {
          this.preference.setZeitToken(initialConfig.zeitToken);
          this.setRecentProjects(initialConfig.recentProjects);
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
      },
      onOpenProject: (content: string) => {
        this.initialFromString(content);
        viewState.closeProjectIntroDialog();
      },
      onSuccessfulProjectSave: (name: string, path: string) => {
        this.savedUrl = path;
        this.setRecentProject(name, path, new Date().toISOString());
        this.syncRecentProjects();
        notification.success("Your changes have been saved");
      }
    });

    autorun(() => {
      if (this.preference.zeitToken) {
        this.deployments.initialize(this.preference.zeitToken, this.name);
      }
    });

    fetchInitialConfig();
  }

  @action.bound
  public save() {
    save(this.name, appStore.toJson(), this.savedUrl);
  }

  @action.bound
  public openProject() {
    openDialog({
      action: "OpenProject"
    });
  }

  @action.bound
  public setZeitToken(token: string) {
    this.preference.setZeitToken(token);
    saveToken(token);
  }

  @action.bound
  public setRecentProject(name: string, path: string, createdDate: string) {
    const filters = this.recentProjects.filter(
      project => project.path === path
    );

    if (filters.length === 0) {
      this.recentProjects.push({
        name,
        path,
        createdDate
      });
    } else {
      const projectToUpdate = filters[0];
      projectToUpdate.name = name;
      projectToUpdate.createdDate = createdDate;
    }
    this.sortRecentProjects();
  }

  @action.bound
  public setRecentProjects(recentProjects: any[]) {
    this.recentProjects.clear();
    if (!recentProjects) {
      return;
    }

    const updatedRecentProjects = recentProjects
      .filter((item, i) => i < 5)
      .forEach(project => {
        this.recentProjects.push(project);
      });

    this.sortRecentProjects();
  }

  @action.bound
  private sortRecentProjects() {
    this.recentProjects = this.recentProjects.sort((a, b) => {
      if (new Date(b.createdDate) < new Date(a.createdDate)) return -1;
      if (new Date(b.createdDate) > new Date(a.createdDate)) return 1;
      return 0;
    });
  }

  @action.bound
  public deleteRecentProject(path: string) {
    const projectToDelete = this.recentProjects.find(
      project => project.path === path
    );
    this.recentProjects.remove(projectToDelete);
    this.syncRecentProjects();
  }

  @action.bound
  public getCertificatePath() {
    openDialog({
      action: "CertPath"
    });
  }

  @action.bound
  public getKeyPath() {
    openDialog({
      action: "KeyPath"
    });
  }

  @action.bound
  public getAssetPath() {
    openDialog({
      action: "AssetPath"
    });
  }

  @action.bound
  public deploy() {
    deployProject(appStore.toJson());
  }

  @action.bound
  public remoteDeploy() {
    this.deployments.deploy(appStore.toJson()).then(res => {
      console.log(res);
    });
  }

  @action.bound
  public openUrl(url: string) {
    openExternalUrlInBrowser(url);
  }

  @action.bound
  createNewProject(name: string) {
    if (name === "") {
      this.name = "Unnamed project";
    } else {
      this.name = name;
    }

    if (appStore.endpoints.length === 0) {
      const initialEndpoint = appStore.addEndpoint("/");
      initialEndpoint.headers.setJsonContentType();
    }
  }

  @action.bound
  readSpecByPath(path: string) {
    openDialog({
      action: "readSpecByPath",
      path
    });
  }

  syncRecentProjects() {
    updateRecentProjects(
      this.recentProjects.map(project => ({
        name: project.name,
        path: project.path,
        createdDate: project.createdDate
      }))
    );
  }

  @action.bound
  closeProject() {
    this.savedUrl = "";
    appStore.reset();
    viewState.openProjectIntroDialog();
  }

  @action.bound
  initialFromString(specObj: any) {
    const {
      assetsDirectory,
      certificatePath,
      keyPath,
      zeitToken
    } = specObj.preference;
    this.name = specObj.name;
    this.preference.setAssetsDirectory(assetsDirectory);
    this.preference.setCertificatePath(certificatePath);
    this.preference.setKeyPath(keyPath);
    this.preference.setPort(specObj.server.port);
    appStore.initializeFromObject(specObj.endpoints);
  }
}

const projectStore = new ProjectStore();
export default projectStore;
