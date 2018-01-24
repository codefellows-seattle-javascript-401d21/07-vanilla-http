'use strict';

const http = require('http');
const bodyParser = require('./body-parse.js');
const cowsay = require('cowsay');

const app = http.createServer((request, response) => {
  bodyParser(request)
    .then(req => {
      if(req.method === 'GET' && req.url.pathname === '/') {
        response.writeHead(200, {'Content-Type': 'application/json'});
        response.write(JSON.stringify({
          message: 'hello from my server!',
        }));
        response.end();
        return;
      }
      if(req.method === 'GET' && req.url.pathname === '/cowsay' && req.url.query) {
        console.log(req.url.query);
        response.writeHead(200, {'Content-Type': 'text/plain'});
        response.write(cowsay.say({
          text: req.url.query,
        }));
        response.end();
        return;
      }
      response.writeHead(404, {'Content-Type': 'text/plain'});
      response.write(cowsay.say({
        text: 'Not Found',
      }));
      response.end();
      return;
    })
    .catch(err => {
      response.writeHead(400, {'Content-Type': 'text/plain'});
      response.write(cowsay.say({
        text: 'Bad Request',
      }));
      repsonse.end();
      return;
    });
});

const server = module.exports = {};
server.start = (port, cb) => app.listen(port, cb);
server.stop = (cb) => app.close(cb);