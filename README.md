<h1 align="center">
  <img src="https://raw.githubusercontent.com/Raathigesh/Atmo/master/docs/AtmoLogo.png" alt="Atmo" height="300">
   <br>
  <h4 align="center">Server side powertool for prototyping</h4>
</h1>

<p align="center">
  <a href="https://travis-ci.org/Raathigesh/Atmo">
    <img src="https://img.shields.io/travis/Raathigesh/Atmo.svg?style=flat-square"
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
   <h4 align="center">Still under active development</h4>
</p>
<br>


## Installation
```
$ npm install atmo -g
```
## Features
- Mock Http endpoints
- Mock Socket endpoints
- Mock GraphQL endpoints (Experimental)
- Http proxy support
- In-built support for Json-Server. [Refer Json-Server docs for more info.](https://github.com/typicode/json-server)
- Static content serving 
- Export and share your project through a single json file
- Import an atmo project from your colleague or team
- Code generation through generators
- https://zeit.co/now deployable projects
- Sleek UI

### Generators
Generators are responsible for the code generation.
- [ExpressJS/ES5 Generator](https://github.com/Raathigesh/AtmoExpressES5Generator) - `atmo-gen-expressjs-es5`

## Usage
Execute the following command
```
$ atmo
```

#### Cli Options
- `--port` will launch the API server in a specific port. Default port is 3334. (`atmo --port 3000`)
- `--static` will serve the content in the folder `public` in your current working directory (`atmo --static`)
- `--logs` will print out the access logs to console (`atmo --logs`)

## Sleek UI huh?
<img src="https://raw.githubusercontent.com/Raathigesh/Atmo/master/docs/AtmoUi.PNG" alt="Atmo" >

Thanks [Kreativa Studio](http://www.kreativa-studio.com/) for the free logo

## License
MIT © [Raathigeshan](https://twitter.com/Raathigeshan)

