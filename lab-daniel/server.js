'use strict'

const http = require('http');
const bodyParser = require('./lib/body-parse');
const cowsay = require('cowsay');


const app = http.createServer((req, res) => {
  bodyParser(req)
    .then(request => {
      if (request.method === 'GET' && request.url.pathname === '/') {
        res.writeHead(200, {'Content-Type':'text/plain'});
        res.write('Hello from my server!');
        res.end();
        return;
      }
      if (request.method === 'GET' && request.url.pathname === '/cowsay' && request.query.text) {
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.write(cowsay({ text: request.query.text });
      }
      if (request.method === 'POST' && request.url.pathname === '/cowsay' && request.body) {
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.write(cowsay({text: request.body}));
        res.end();
        return;
      }
      res.writeHead(404, {'Content-Type': 'text/plain'});
      res.write('Not Found');
      res.end();
      return;
    })
    .catch(err => {
      res.writeHead(400, { 'Content-Type': 'text/plain' });
      res.write(cowsay({ text: 'Bad Request' }));
      res.end();
      return;
    });
});

const server = module.exports = {};

server.start = (port, cb) => app.listen (port, cb);
server.stop = (cb) => app.close(cb);