import { app, Menu, shell } from "electron";

export default class MenuBuilder {
  mainWindow: any;

  constructor(mainWindow: any) {
    this.mainWindow = mainWindow;
  }

  buildMenu() {
    if (
      process.env.NODE_ENV === "development" ||
      process.env.DEBUG_PROD === "true"
    ) {
      this.setupDevelopmentEnvironment();
    }

    let template;

    if (process.platform === "darwin") {
      template = this.buildDarwinTemplate();
    } else {
      template = this.buildDefaultTemplate();
    }

    const menu = Menu.buildFromTemplate(template as any);
    Menu.setApplicationMenu(menu);

    return menu;
  }

  setupDevelopmentEnvironment() {
    this.mainWindow.openDevTools();
    this.mainWindow.webContents.on("context-menu", (e: any, props: any) => {
      const { x, y } = props;

      Menu.buildFromTemplate([
        {
          label: "Inspect element",
          click: () => {
            this.mainWindow.inspectElement(x, y);
          }
        }
      ]).popup(this.mainWindow);
    });
  }

  buildDarwinTemplate() {
    const subMenuAbout = {
      label: "Electron",
      submenu: [
        {
          label: "Quit",
          accelerator: "Command+Q",
          click: () => {
            app.quit();
          }
        }
      ]
    };
    const subMenuHelp = {
      label: "Atmo",
      submenu: [
        {
          label: "Learn More",
          click() {
            shell.openExternal("http://getatmo.com");
          }
        },
        {
          label: "Documentation",
          click() {
            shell.openExternal(
              "https://github.com/Raathigesh/atmo/blob/master/packages/app/docs/custom-script.md"
            );
          }
        },
        {
          label: "Search Issues",
          click() {
            shell.openExternal("https://github.com/Raathigesh/atmo/issues");
          }
        }
      ]
    };

    return [subMenuAbout, subMenuHelp];
  }

  buildDefaultTemplate() {
    const templateDefault = [
      {
        label: "Atmo",
        submenu: [
          {
            label: "Learn More",
            click() {
              shell.openExternal("http://getatmo.com");
            }
          },
          {
            label: "Documentation",
            click() {
              shell.openExternal(
                "https://github.com/Raathigesh/atmo/blob/master/packages/app/docs/custom-script.md"
              );
            }
          },
          {
            label: "Search Issues",
            click() {
              shell.openExternal("https://github.com/Raathigesh/atmo/issues");
            }
          }
        ]
      }
    ];

    return templateDefault;
  }
}
