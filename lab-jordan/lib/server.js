'use strict';

const http = require('http');
const bodyParser = require('./body-parse.js');
const cowsay = require('cowsay');

const app = http.createServer((req, res) => {
  bodyParser(req)
  .then(request => {

    if (request.method === 'GET' && request.url.pathname === '/') {
      res.writeHead(200, {'Content-Type': 'text/plain'});
      res.write('hello from my server!')
      res.end();
      return;
    }

    if (request.method === 'GET' && request.url.pathname === '/cowsay') {
      if (!request.url.query.text) {
        res.writeHead(400, {'Content-Type': 'text/plain'});
        res.write( cowsay.say({'text': 'bad request'}) );
        res.end();
        return;
      }
      res.writeHead(200, {'Content-Type': 'text/plain'});
      res.write( cowsay.say({'text': `${request.url.query.text}`}) );
      res.end();
      return;
    }

    if (request.method === 'POST' && request.url.pathname === '/cowsay') {
      if (!request.body.text) {
        res.writeHead(400, {'Content-Type': 'text/plain'});
        res.write( cowsay.say({'text': 'bad request'}) );
        res.end();
        return;
      }
      res.writeHead(200, {'Content-Type': 'text/plain'});
      res.write( cowsay.say({'text': `${request.body.text}`}));
      res.end();
      return;
    }

    res.writeHead(404, {'Content-Type': 'text/plain'});
    res.write( cowsay.say({'text': "404: not found"}));
    res.end();
    return;
  })
})

const server = module.exports = {};
server.start = (port, cb) => app.listen(port, cb);
server.stop = (cb) => app.close(cb);
