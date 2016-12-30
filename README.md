<h1 align="center">
  <img src="https://raw.githubusercontent.com/Raathigesh/Atmo/master/docs/AtmoRevamp.png" alt="Atmo" height="600">
   <br>
  <h4 align="center">Server Side Api Mocking made easy with UI</h4>
</h1>

<p align="center">
  <a href="https://travis-ci.org/Raathigesh/Atmo">
    <img src="https://img.shields.io/travis/Raathigesh/atmo.svg?style=flat-square"
         alt="Travis Build">
  </a>
  <a href="https://github.com/Raathigesh/Atmo/blob/master/LICENSE">
    <img src="https://img.shields.io/npm/l/express.svg?maxAge=2592000&style=flat-square"
         alt="License">
  </a>
  <a href="https://www.npmjs.com/package/atmo">
    <img src="https://img.shields.io/npm/v/atmo.svg?style=flat-square"
         alt="NPM Version">
  </a>
</p>

## Installation
```
$ npm install atmo -g
```

## Features
- Http endpoints
- Socket server
- GraphQL endpoints (Experimental)
- Http proxy
- In-built support for Json-Server. [More on creating Json-Server endpoint.](https://github.com/Raathigesh/Atmo/blob/master/docs/JsonServerEndpoint.md)
- Static content folder 
- Export project as Json file
- Import project
- Code generation through generators.
  - `atmo-gen-expressjs-es5` - [ExpressJS/ES5 Generator](https://github.com/Raathigesh/AtmoExpressES5Generator)
- https://zeit.co/now deployable projects
- Sleek UI

## Usage
Execute the following command
```
$ atmo
```

#### Options
- `--port` will launch the API server in a specific port. Default port is 3334. (`atmo --port 3000`)
- `--static` will serve the content in the folder `public` in your current working directory (`atmo --static`)
- `--logs` will print out the access logs to console (`atmo --logs`)

## UI Demo
Take a look at the UI of Atmo. http://atmo.surge.sh/ (This demo is just to showcase the UI.)

## Guide
- [Creating a socket endpoint and connecting to it](https://github.com/Raathigesh/Atmo/blob/master/docs/SocketEndpoint.md)
- [Creating a proxy endpoint](https://github.com/Raathigesh/Atmo/blob/master/docs/ProxyEndpoint.md)
- [Creating a json-server endpoint](https://github.com/Raathigesh/Atmo/blob/master/docs/JsonServerEndpoint.md)
- [Creating a graphql endpoint](https://github.com/Raathigesh/Atmo/blob/master/docs/GraphqlEndpoint.md)
- [Http Endpoint - Conditional Response](https://github.com/Raathigesh/Atmo/blob/master/docs/ConditionalResponseWithHttpEndpoint.md)
- [Generating code](https://github.com/Raathigesh/Atmo/blob/master/docs/GeneratingProjectViaGenerators.md)
- [Deploying a generated project via Zeit's now](https://github.com/Raathigesh/Atmo/blob/master/docs/DeployingViaNow.md)

## Contribute
For any problem/question or if you think a feature that could make Atmo more useful, do not hesitate to open an issue.

#### Building Atmo
Launch the webpack dev server.
````bash
npm run dev
`````
Launch the api server.
````bash
npm run server
````

#### Write a generator
Atmo uses generators to automatically generate code for the endpoints that are created via the UI. You could write a generator which generates code in your favourite node js framework (e.g: HapiJS). 

[Learn more here on how to write a generator.](https://github.com/Raathigesh/Atmo/blob/master/docs/HowToWriteAGenerator.md)

## Thanks
Thanks [Kreativa Studio](http://www.kreativa-studio.com/) for the free logo.

## License
MIT © [Raathigeshan](https://twitter.com/Raathigeshan)

