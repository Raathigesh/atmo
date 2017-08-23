const { default: NowClient } = require("now-client-isomorphic");
import { observable, action, IObservableArray, runInAction } from "mobx";
import Deployment from "./Deployment";
import notifications from "../NotificationStore";

export default class Deployments {
  now: any;
  name: string;
  @observable recentDeployments: IObservableArray<Deployment> = observable([]);
  @observable isDeploying = false;
  @observable isFetching = false;

  initialize(authToken: string, deploymentName: string) {
    this.name = deploymentName;
    this.now = new NowClient(authToken);
    this.getRecentDeployments();
  }

  @action.bound
  getRecentDeployments() {
    this.isFetching = true;
    this.now
      .getDeployments()
      .then(deployments => {
        this.recentDeployments.clear();

        deployments
          .filter(deployment => deployment.name === this.name)
          .map(deployment => {
            this.recentDeployments.push(
              new Deployment(
                deployment.uid,
                deployment.name,
                deployment.url,
                deployment.created,
                this.now
              )
            );
          });
        this.isFetching = false;
      })
      .catch(() => {
        this.isFetching = false;
      });
  }

  @action.bound
  deleteDeployment(uid: string) {
    const deplymentToDelete = this.recentDeployments.find(
      deployment => deployment.uid === uid
    );
    deplymentToDelete.deleteDeployment().then(() => {
      this.getRecentDeployments();
    });
  }

  @action.bound
  deploy(spec: any) {
    this.isDeploying = true;

    for (const endpoint of spec.endpoints) {
      delete endpoint.response.rawContent;
    }

    return this.now
      .createDeployment({
        package: {
          name: this.name.replace(/\s/g, "_"),
          dependencies: {
            "atmo-core": "0.5.0"
          },
          scripts: {
            start: "node index.js"
          }
        },
        "index.js": `require("atmo-core").default().start(JSON.parse('${JSON.stringify(
          spec
        )}'));`
      })
      .then(() => {
        this.isDeploying = false;
        this.getRecentDeployments();
      })
      .catch(() => {
        notifications.error("Deployment failed!");
        this.isDeploying = false;
      });
  }
}
