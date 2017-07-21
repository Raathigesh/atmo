"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var src_1 = require("../src");
var spec = {
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
var server = src_1.default();
server.start(spec).then(function () {
    console.log("Server started..");
});
server.start(spec).then(function () {
    console.log("Server started again..");
});
//# sourceMappingURL=index.js.map