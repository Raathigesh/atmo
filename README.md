<h1 align="center">
  <img alt="SuperNova Boilerplate"
    src="https://rawgithub.com/Black-Monolith/SuperNova/master/logo.svg">
</h1>

<p align="center">
  <img alt="Electron + React + Redux + TypeScript + Webpack"
    src="https://rawgithub.com/Black-Monolith/SuperNova/master/icons.svg">
</p>

<p align="center">
  <a href="https://david-dm.org/black-monolith/LightCycle">
    <img alt="Dependencies Status"
      src="https://img.shields.io/david/black-monolith/supernova.svg?style=flat-square">
  </a>
  <a href="https://david-dm.org/black-monolith/LightCycle?type=dev">
    <img alt="Dev Dependencies Status"
      src="https://img.shields.io/david/dev/black-monolith/supernova.svg?style=flat-square">
  </a>
</p>

Development Mode
----------------

```sh
yarn dev
```

Will build the Main Process with `webpack --watch` and the Renderer Process with `webpack-dev-server`


Production Build
----------------

```sh
yarn build
```

Will build both Main Process and Renderer Process with `webpack`


Start Application
-----------------

```sh
yarn start
```

Will start Electron Application.

Use this same command for both Development Mode and Production Build.


Visual Studio Code
------------------

SuperNova comes with configuration for VSCode:

- `⌘` + `⇧` + `B` to build the application and choose between Development and Build modes
- `⌘` + `R` to run the application in Debug Mode
