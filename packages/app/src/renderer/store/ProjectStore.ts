import { observable } from "mobx";

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
}
