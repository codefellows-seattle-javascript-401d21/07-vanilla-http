'use strict';

const http = require('http');
const bodyParser = require('./body-parse');
const cowsay = require('cowsay');

const app = http.createServer((req, res) => {
  bodyParser(req)
    .then(request => {
      // '/' path
      if (request.method === 'GET' && request.url.pathname === '/') {
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.write('Hello from my server!');
        res.end();
        return;
      }

      if (request.method === 'GET' && request.url.pathname === '/cowsay') {
        let say = request.url.query.text
          ? request.url.query
          : { text: 'You need to tell me what to say!', T: 'U' };
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.write(cowsay.say(say));
        res.end();
        return;
      }

      res.writeHead(404, {'Content-Type': 'text/plain'});
      res.write('Not Found');
      res.end();
      return;
    })
    .catch(() => {
      res.writeHead(400, {'Content-Type': 'text/plain'});
      res.write('Bad Request');
      res.end();
      return;
    });
});

const server = module.exports = {};
server.start = (port, cb) => app.listen(port, cb);
server.stop = (cb) => app.close(cb);
