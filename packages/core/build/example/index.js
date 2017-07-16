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
src_1.default(spec).start().then(function () {
    console.log("Server started..");
});
//# sourceMappingURL=index.js.map