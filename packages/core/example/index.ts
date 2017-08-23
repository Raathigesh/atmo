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
        contentType: "javascript",
        content:
          "Ly8gRm9sbG93aW5nIHZhcmlhYmxlcyBhcmUgYXZhaWxhYmxlIGZvciB5b3UgdG8gdXNlCi8vIHJlcXVlc3Q6IGV4cHJlc3MganMgcmVxdWVzdCBvYmplY3QKLy8gcmVzcG9uc2U6IGV4cHJlc3MganMgcmVzcG9uc2Ugb2JqZWN0CgpyZXNwb25zZS5zZXQoJ0NvbnRlbnQtVHlwZScsICdhcHBsaWNhdGlvbi9qc29uJyk7CnJlc3BvbnNlLnNlbmQoewogIG1lc3NhZ2U6ICdIZWxsbyBmcm9tIGF0bW8hJwp9KTsK"
      }
    }
  ],
  server: {
    port: 5000,
    staticFolder: "."
  }
};

const server = atmoServer();

server.start(spec).then(() => {
  console.log("Server started..");
});

server.start(spec).then(() => {
  console.log("Server started again..");
});
