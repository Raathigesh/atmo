## Atmo core

```
import atmoServer from 'atmo-core';

const spec = {
    endpoints: [{
        method: 'get' | 'post' | 'patch' | 'delete',
        url: '/user',
        headers: [{
            key: '',
            value: ''
        }],
        statusCode: '200',
        delay: 10,
        response: {
            contentType: '',
            response: ''
        }
    }],
    server: {
        port: 3000
    }
};

const server = atmoServer(spec);

server.start().then(() => {
    console.log('Server started..');
});

server.update(spec).then(() => {
    console.log('Updated the spec');
});

server.stop().then(() => {
    console.log('All done');
});
```

## Running the developement build
```sh
npm run watch
```

## Building the lib
```sh
npm run build
```