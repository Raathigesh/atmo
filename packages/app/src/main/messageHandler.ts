const { ipcMain, dialog, shell } = require("electron");
const jsonfile = require("jsonfile");

import { ProjectPreference, RecentProjects } from "./settings";

interface ICallbacks {
  onDeploy?: (spec: any, event?: any) => void;
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
    callbacks.onDeploy(spec, event);
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

  ipcMain.on("open", (event, args) => {
    dialog.showOpenDialog({}, filename => {
      if (
        args.action === "CertPath" ||
        args.action === "KeyPath" ||
        args.action === "AssetPath"
      ) {
        event.sender.send("open", {
          action: args.action,
          path: filename
        });
      } else {
        event.sender.send("open", {
          action: args.args,
          path: filename,
          content: jsonfile.readFileSync(filename[0])
        });
      }
    });
  });

  ipcMain.on("openUrl", (event, url) => {
    shell.openExternal(url);
  });
}
