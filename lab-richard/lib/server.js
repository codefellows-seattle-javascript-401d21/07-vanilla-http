'use strict';

const http = require('http');
const bodyParser = require('./bodyparser')
const cowsay = require('cowsay');

const app = http.createServer((request, response) => {
    bodyParser(request);
    .then(request => {
        if(request.method === 'GET' && request.url.pathname === '/') {
            response.writeHead(200, {'Content-Type': 'text/plain'});
            response.write('Hello from my server!');
            response.end();
            return;
        }

        if(request.method === 'GET' && request.url.pathname === `/cowsay?text={message}`) {
            if(request.url.query.text) {
                response.writeHead(200, {'Content-Type': 'text/plain'});
                response.write(cowsay.say({text: `${request.url.query.text}`}));
                response.end();
                return;
            }
        }

        if(request.method === 'POST' && request.url.pathname === '/cowsay') {
            if(request.body) {
                response.writeHead(200, {'Content-Type': 'text/plain'});
                response.write(cowsay.say({text: `${JSON.stringify(request.body)}`}));
                response.end();
                return;
            }
        }
    });

    .catch(err => {
        response.writeHead(400, {'Content-Type': 'text/plain'});
        response.write(cowsay.say({text: 'Bad Request'}));
        response.end();
        return;
    });
});


const server = module.exports = {};
server.start = (PORT, callback) => app.listen(PORT, callback);
server.stop = (callback) => app.close(callback);