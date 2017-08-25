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
    const EditMenu = {
      label: "Edit",
      submenu: [
        { label: "Undo", accelerator: "CmdOrCtrl+Z", selector: "undo:" },
        { label: "Redo", accelerator: "Shift+CmdOrCtrl+Z", selector: "redo:" },
        { type: "separator" },
        { label: "Cut", accelerator: "CmdOrCtrl+X", selector: "cut:" },
        { label: "Copy", accelerator: "CmdOrCtrl+C", selector: "copy:" },
        { label: "Paste", accelerator: "CmdOrCtrl+V", selector: "paste:" },
        {
          label: "Select All",
          accelerator: "CmdOrCtrl+A",
          selector: "selectAll:"
        },
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
      label: "Help",
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

    return [EditMenu, subMenuHelp];
  }

  buildDefaultTemplate() {
    const templateDefault = [
      {
        label: "Help",
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
