'use strict';

const http = require('http');
const bodyParser = require('./body-parse');
const cowsay = require('cowsay');

const app = http.createServer((req, res) => {
  bodyParser(req)
    .then(request => {
      if (request.method === 'GET' && request.url.pathname === '/time') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.write(JSON.stringify({
          //this is from the demo and it will print seconds in the page
          now: Date.now(),
          date: new Date(),
        }));
        res.end();
        return;
      }
      //this is the welcome page
      if (request.method === 'GET' && request.url.pathname === '/') {
        res.writeHead(200, { 
          'Content-Type': 'text/plain', 
        });
        res.write('Welcome to my server!');
        res.end();
        return;
      }

      if (request.method === 'POST' && request.url.pathname === '/echo') {
        res.writeHead(201, { 
          'Content-Type': 'application/json', 
        });
        res.write(JSON.stringify(request.body));
        res.end();
        return;
      }
      //        /echo
      if (req.method === 'POST' && req.url.pathname === '/echo') {
        res.writeHead(200, {
          'Content-Type': 'application/json',
        });
        res.write(JSON.stringify(req.body));
        res.end();
        return;
      }
      //this is where cowsay starts
      if (req.method === 'GET' && req.url.pathname === '/cowsay') {
        let query = req.url.query.text;
        if (query) {
          res.writeHead(200, { 
            'Content-Type': 'text/plain',
          });
          res.write(cowsay.say({ text: (req.url.query.text), f: 'whale' }));
          res.end();
          return;
        } else {
          res.writeHead(400, { 
            'Content-Type': 'text/plain', 
          });
          res.write(cowsay.say({
            text: 'bad request',
            f: 'whale',
          }));
          res.end();
          return;
        }
      }

      if (req.method === 'POST' && req.url.pathname === '/cowsay') {
        if (req.body.text) {
          res.writeHead(200, { 'Content-Type': 'text/plain' });
          res.write(cowsay.say({ 
            text: req.body.text, f: 'whale', 
          }));
          res.end();
          return;
        } else {
          res.writeHead(400, { 'Content-Type': 'text/plain' });
          res.write(cowsay.say({ 
            text: 'bad request', f: 'whale',
          }));
          res.end();
          return;
        }
      }
      res.writeHead(404);
      res.end();
    });
});

const server = module.exports = {};
server.start = (port, cb) => app.listen(port, cb);
server.stop = (cb) => app.close(cb);