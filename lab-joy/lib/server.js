'use strict';

const http = require('http');
const bodyParser = require('./body-parse');
const cowsay = require('cowsay');
const PORT = process.env.PORT || 3000;

const app = http.createServer((req, res) => {
    bodyParser.parse(req)
        .then(request => {
            if (request.method === 'GET' && request.url.pathname === '/') {
                res.writeHead(200, {'Content-Type': 'text/plain'});
                res.write('Hello from my server!');
                res.end();
                return;
            }

            if (request.method === 'GET' && request.url.pathname === '/cowsay') {
                if (request.url.query.text) {
                    res.writeHead(200, {'Content-Type': 'text/plain'});
                    res.write(cowsay.say(request.url.query));
                } else {
                    res.writeHead(200, {'Content-Type': 'text/plain'});
                    res.write(cowsay.say({text: 'bad request'}));
                }
                res.end();
                return;
            }

            if (request.method === 'POST' && request.url.pathname === '/cowsay') {
                if (request.body) {
                    res.writeHead(200, {'Content-Type': 'text/plain'});
                    res.write(cowsay.say(request.body));
                } else {
                    res.writeHead(400, {'Content-Type': 'text/plain'});
                    res.write(cowsay.say({text: 'bad request'}));
                }
                res.end();
                return;
            }

            res.writeHead(404, {'Content-Type': 'text/plain'});
            res.write('Not Found');
            res.end();
            return;
        })
        .catch(err => {
            console.log(err);
            res.writeHead(400, { 'Content-Type': 'text/plain' });
            res.write(cowsay.say({ text: 'bad request' }));
            res.end();
            return;
        });
});

const server = module.exports = {};
server.start = (port, cb) => app.listen(port, cb);
server.stop = (cb) => app.close(cb);