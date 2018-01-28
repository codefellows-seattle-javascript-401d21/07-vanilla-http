'use strict';

const http = require('http');
const bodyParser = require('./body-parse');
const cowsay = require('cowsay');

const app = http.createServer((req, res) => {
  bodyParser(req)
    .then(request => {      

      if(request.method === 'GET' && request.url.pathname === '/') {
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.write(JSON.stringify('hello from my server!'));
        res.end();
        return;
      }

      if(request.method === 'GET' && request.url.pathname === '/cowsay') {
        if(request.url.query.text){
          res.writeHead(200, {'Content-Type': 'text/plain'});
          res.write(cowsay.say({ text: request.url.query.text }));
          res.end();
          return;
        } else {
          res.writeHead(400, {'Content-Type': 'text/plain'});
          res.write(cowsay.say({ text: 'bad request' }));
          res.end();
          return; 
        }
      }

      if(request.method === 'POST' && request.url.pathname === '/cowsay') {
        if(request.body.hasOwnProperty('text')){
          res.writeHead(201, {'Content-Type': 'text/plain'});
          res.write(cowsay.say({ text: request.body.text }));
          res.end();
          return;
        } else {
          res.writeHead(400, {'Content-Type': 'text/plain'});
          res.write(cowsay.say({ text: 'bad request' }));
          res.end();
          return; 
        }
      }

      res.writeHead(404, {'Content-Type': 'text/plain'});
      res.write('Not Found');
      res.end();
      return;
    })
    .catch(() => {
      res.writeHead(400, { 'Content-Type': 'text/plain' });
      res.write('Bad Request');
      res.end();
      return;
    });
});

const server = module.exports = {};
server.start = (port, cb) => app.listen(port, cb);
server.stop = (cb) => app.close(cb);