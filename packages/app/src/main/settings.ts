const settings = require("electron-settings");

const ZEIT_AUTH_TOKEN = "ZEIT_AUTH_TOKEN";
export const ZeitToken = {
  get: () => {
    return settings.get(ZEIT_AUTH_TOKEN);
  },
  set: (preference: any) => {
    settings.set(ZEIT_AUTH_TOKEN, preference);
  }
};

const RECENT_PROJECTS = "RECENT_PROJECTS";
export const RecentProjects = {
  get: () => {
    return settings.get(RECENT_PROJECTS);
  },
  set: (recentProjects: any) => {
    settings.set(RECENT_PROJECTS, recentProjects);
  }
};
