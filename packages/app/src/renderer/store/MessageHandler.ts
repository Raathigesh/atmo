const { ipcRenderer } = require("electron");

interface IHandlerOptions {
  hello: (
    initialConfig: {
      zeitToken: string;
      recentProjects: any;
    }
  ) => void;
  deployed: (baseUrl: string) => void;
  onCertPath: (certPath: string) => void;
  onKeyPath: (keyPath: string) => void;
  onAssetPath: (assetPath: string) => void;
}

export default function Handler(callbacks: IHandlerOptions) {
  ipcRenderer.on(
    "initialConfig",
    (
      event: any,
      initialConfig: {
        zeitToken: string;
        recentProjects: any;
      }
    ) => {
      callbacks.hello(initialConfig);
    }
  );

  ipcRenderer.on("open", (event, arg) => {
    if (arg.action === "CertPath") {
      callbacks.onCertPath(arg.path[0]);
    } else if (arg.action === "KeyPath") {
      callbacks.onKeyPath(arg.path[0]);
    } else if (arg.action === "AssetPath") {
      callbacks.onAssetPath(arg.path[0]);
    }
  });

  ipcRenderer.on("deployed", (event: any, baseUrl: string) => {
    callbacks.deployed(baseUrl);
  });
}

export function fetchInitialConfig() {
  ipcRenderer.send("hello");
}

export function openProject() {
  ipcRenderer.send("open");
}

export function save(spec: any) {
  ipcRenderer.send("save", spec);
}

export function saveToken(token: string) {
  ipcRenderer.send("zeitToken", token);
}

export function openDialog(action: any) {
  ipcRenderer.send("open", action);
}

export function deployProject(spec: any) {
  ipcRenderer.send("deploy", spec);
}

export function openExternalUrlInBrowser(url: string) {
  ipcRenderer.send("openUrl", url);
}
