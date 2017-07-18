const settings = require("electron-settings");

const PROJECT_PREFERENCE = "ZEIT_AUTH_TOKEN";
export const ProjectPreference = {
  get: () => {
    settings.get(PROJECT_PREFERENCE);
  },
  set: (preference: any) => {
    settings.set(PROJECT_PREFERENCE, preference);
  }
};

const RECENT_PROJECTS = "RECENT_PROJECTS";
export const RecentProjects = {
  get: () => {
    settings.get(RECENT_PROJECTS);
  },
  set: (recentProjects: any) => {
    settings.set(RECENT_PROJECTS, recentProjects);
  }
};
