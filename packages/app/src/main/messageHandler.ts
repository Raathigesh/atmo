const { ipcMain, dialog, shell } = require("electron");
const jsonfile = require("jsonfile");

import { ZeitToken, RecentProjects } from "./settings";

interface ICallbacks {
  onDeploy?: (spec: any, event?: any) => void;
  onProjectPreference?: (preference: any) => void;
  onRecentProjects?: (projects: any[]) => void;
}

export function listen(callbacks: ICallbacks = {}) {
  ipcMain.on("hello", event => {
    event.sender.send("initialConfig", {
      zeitToken: ZeitToken.get(),
      recentProjects: RecentProjects.get()
    });
  });

  ipcMain.on("deploy", (event, spec) => {
    callbacks.onDeploy(spec, event);
  });

  ipcMain.on("zeitToken", (event, token) => {
    ZeitToken.set(token);
    callbacks.onProjectPreference && callbacks.onProjectPreference(token);
  });

  ipcMain.on("recentProjects", (event, recentProjects) => {
    RecentProjects.set(recentProjects);
    callbacks.onRecentProjects && callbacks.onRecentProjects(recentProjects);
  });

  ipcMain.on("save", (event, arg) => {
    if (arg.pathToSave) {
      jsonfile.writeFile(arg.pathToSave, arg.spec, function(err) {
        if (!err) {
          event.sender.send("onSaveSuccess", {
            name: arg.name,
            path: arg.pathToSave
          });
        }
      });
    } else {
      dialog.showSaveDialog({}, filename => {
        if (filename) {
          jsonfile.writeFile(filename, arg.spec, function(err) {
            if (!err) {
              event.sender.send("onSaveSuccess", {
                name: arg.name,
                path: filename
              });
            }
          });
        }
      });
    }
  });

  ipcMain.on("open", (event, args) => {
    if (args.action === "readSpecByPath") {
      event.sender.send("open", {
        action: args.action,
        path: args.path,
        content: jsonfile.readFileSync(args.path)
      });
      return;
    }

    const dialogOptions: any = {};
    if (args.action === "OpenProject") {
      dialogOptions.filters = [{ name: "JSON", extensions: ["json"] }];
    } else if (args.action === "AssetPath") {
      dialogOptions.properties = ["openDirectory"];
    }

    dialog.showOpenDialog(dialogOptions, filename => {
      if (
        args.action === "CertPath" ||
        args.action === "KeyPath" ||
        args.action === "AssetPath"
      ) {
        event.sender.send("open", {
          action: args.action,
          path: filename
        });
      } else if (args.action === "OpenProject") {
        if (filename) {
          event.sender.send("open", {
            action: args.action,
            path: filename,
            content: jsonfile.readFileSync(filename[0])
          });
        }
      }
    });
  });

  ipcMain.on("openUrl", (event, url) => {
    shell.openExternal(url);
  });

  ipcMain.on("remoteDeploy", () => {
    const headers = new Headers();
    headers.append("Authorization", "Bearer 1ZpKjO1Oh57uF1ofotxMID2h");
    return fetch("https://api.zeit.co/now/instant", {
      method: "POST",
      headers: headers,
      body: JSON.stringify({
        package: {
          name: "my-instant-deployment",
          dependencies: {
            "sign-bunny": "1.0.0"
          },
          scripts: {
            start: "node index"
          }
        },
        "index.js":
          'require("http").Server((req, res) => {' +
          'res.setHeader("Content-Type", "text/plain; charset=utf-8");' +
          'res.end(require("sign-bunny")("Hi there!"));' +
          "}).listen();"
      })
    }).then(function(res) {
      console.log(res.json());
    });
  });
}
