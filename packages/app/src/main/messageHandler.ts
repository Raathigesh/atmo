const { ipcMain, dialog } = require("electron");
const jsonfile = require("jsonfile");

import { ProjectPreference, RecentProjects } from "./settings";

interface ICallbacks {
  onDeply?: (spec: any) => void;
  onProjectPreference?: (preference: any) => void;
  onRecentProjects?: (projects: any[]) => void;
}

export function listen(callbacks: ICallbacks = {}) {
  ipcMain.on("hello", event => {
    event.sender.send("hello", {
      projectPreference: ProjectPreference.get(),
      recentProjects: RecentProjects.get()
    });
  });
  ipcMain.on("deploy", (event, spec) => {
    callbacks.onDeply(spec);
  });

  ipcMain.on("projectPreference", (event, preference) => {
    ProjectPreference.set(preference);
    callbacks.onProjectPreference(preference);
  });

  ipcMain.on("recentProjects", (event, recentProjects) => {
    RecentProjects.set(recentProjects);
    callbacks.onRecentProjects(recentProjects);
  });

  ipcMain.on("save", (event, spec) => {
    dialog.showSaveDialog({}, filename => {
      jsonfile.writeFile(filename, spec, function(err) {
        console.error(err);
      });
    });
  });

  ipcMain.on("open", (event, spec) => {
    dialog.showOpenDialog({}, filename => {
      console.log(filename);
      event.sender.send("open", jsonfile.readFileSync(filename[0]));
    });
  });
}
