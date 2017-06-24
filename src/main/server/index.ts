import * as express from 'express';
import * as http from 'http';
import Promise from 'bluebird';

const app: express.Express = express();
const server = http.createServer(app);

app.get('/_apiServerStatus', (req, res) => {
    res.send('Alive and well');
});

export function startServer() {
    return new Promise((resolve, reject) => {
        server.listen(9000, (err: Error) => {
            if (err) {
                reject(err);
            }
            resolve({port: 9000});            
        });
    });
}
