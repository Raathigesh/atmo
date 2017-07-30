const NowClient = require("now-client");

export default class Deployment {
  now: any;

  initialize(authToken: string) {
    this.now = new NowClient(authToken);
  }

  deploy(spec: any) {
    return this.now.createDeployment(
      JSON.stringify({
        package: {
          name: "atmo-test-deployment",
          dependencies: {
            "atmo-core": "0.1.0"
          },
          scripts: {
            start: "node index"
          }
        },
        "index.js": `require("atmo-core").default().start(JSON.parse('${JSON.stringify(
          spec.toJson()
        )}'));`
      })
    );
  }
}
