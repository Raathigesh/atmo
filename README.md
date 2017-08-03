<h1 align="center">
  Atmo v2
</h1>

Atmo has two packages as follows and uses lerna to manages them in a single repository

- app - The electron app
- core - The core API server

## Installing lerna
You have to install lerna globally
```sh
npm install -g lerna
```

## Installing dependencies
Since the repository is managed by lerna, let lerna install the dependencies for all the packages. Execute the following command.
```sh
lerna bootstrap
```

## Starting developement
Go into the app directory
```sh
cd packages\app
```

Run the following commands in two separate consoles

Following will start building the scripts for main and renderer processes.
```sh
npm run dev
```

Open an another console and run the following command to start the shell.
```sh
npm start
```

Now you shoudl see the electron app launch. 

