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

const server = atmoServer();

server
  .start(
    JSON.parse(
      '{"name":"Atmo","endpoints":[{"url":"/","method":"get","headers":[{"key":"Content-Type","value":"application/json"}],"response":{"contentType":"json","content":{"sample":45}},"statusCode":"200","delay":0}],"server":{"port":9000,"staticFolder":"","certificatePath":"","keyPath":""},"preference":{"zeitToken":"1ZpKjO1Oh57uF1ofotxMID2h","certificatePath":"","keyPath":"","assetsDirectory":""}}'
    )
  )
  .then(() => {
    console.log("Server started..");
  });

server.start(spec).then(() => {
  console.log("Server started again..");
});
