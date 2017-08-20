/**
 * This module executes inside of electron's main process. You can start
 * electron renderer process from here and communicate with the other processes
 * through IPC.
 *
 * When running `npm run build` or `npm run build-main`, this file is compiled to
 * `./app/main.prod.js` using webpack. This gives us some performance wins.
 *
 */
import { app, BrowserWindow } from "electron";
import { format } from "url";
import { join } from "path";
import MenuBuilder from "./menu";
import { listen } from "./messageHandler";
const { default: atmoServer } = require("atmo-core");

let mainWindow: any = null;
let server: any = null;

if (
  process.env.NODE_ENV === "development" ||
  process.env.DEBUG_PROD === "true"
) {
  require("electron-debug")();
  const path = require("path");
  const p = path.join(__dirname, "..", "app", "node_modules");
  require("module").globalPaths.push(p);
}

server = atmoServer();

/**
 * Add event listeners...
 */

app.on("window-all-closed", () => {
  // Respect the OSX convention of having the application in memory even
  // after all windows have been closed
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("ready", async () => {
  listen({
    onDeploy: (spec: any, event: any) => {
      server.start(spec).then((baseUrl: string) => {
        event.sender.send("deployed", baseUrl);
      });
    }
  });
  mainWindow = new BrowserWindow({
    show: false,
    width: 1024,
    height: 728,
    webPreferences: {
      webSecurity: false
    },
    icon: join(__dirname, "assets/icons/png/64x64.png")
  });

  mainWindow.loadURL(
    process.env.NODE_ENV === "production"
      ? // Load file in app folder
        format({
          pathname: join(app.getAppPath(), "index.html"),
          protocol: "file:",
          slashes: true
        })
      : // Load from Webpack DevServer
        "http://localhost:8080/app/index.html?react_perf"
  );

  mainWindow.webContents.on("did-finish-load", () => {
    if (!mainWindow) {
      throw new Error('"mainWindow" is not defined');
    }

    mainWindow.show();
    mainWindow.focus();
  });

  mainWindow.on("closed", () => {
    mainWindow = null;
  });

  const menuBuilder = new MenuBuilder(mainWindow);
  menuBuilder.buildMenu();
});
