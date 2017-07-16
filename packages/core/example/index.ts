import atmoServer from "../src";
import ISpec from "../src/spec";

const spec: ISpec = {
  endpoints: [
    {
      delay: 0,
      headers: [],
      method: "get",
      url: "/sample",
      statusCode: 200,
      response: {
        contentType: "json",
        content: "{'sample': 'hello world'}"
      }
    }
  ],
  server: {
    port: 9000,
    staticFolder: "."
  }
};

atmoServer(spec).start().then(() => {
  console.log("Server started..");
});
