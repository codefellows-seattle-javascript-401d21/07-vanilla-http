'use strict';

const http = require('http');
const bodyParser = require('./body-parser');
const cowsay = require('cowsay');


const app = http.createServer((req, res) => {
  bodyParser(req)
    .then(parserRequest => {
      //new get path for GET '/'
      if(parserRequest.method === 'GET' && parserRequest.url.pathname === '/') {
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.write('hello from my server');
        res.end();
        return;
      }

      //new GET path with /cowsay?text={message}
      if(parserRequest.method === 'GET' && parserRequest.url.pathname === `/cowsay`) {
        if (parserRequest.url.query.text) {
          res.writeHead(200, {'Content-Type': 'text/plain'});
          res.write(cowsay.say({ text: `${parserRequest.url.query.text}`}));
          res.end();
          return;
        }
        if (!parserRequest.url.query.text) {
          res.writeHead(400, {'Content-Type': 'text/plain'});
          res.write('dude, you did not write anything!');
          res.end();
          return;
        }
      }

      //new POST for `/cowsay`
      if(parserRequest.method === 'POST' && parserRequest.url.pathname === '/cowsay') {
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.write(JSON.stringify(parserRequest.body));
        res.end();
        return;
      }
    })
    .catch(err => {
      res.writeHead(400, { 'Content-Type': 'text/plain' });
      res.write('Bad parserRequest');
      res.end();
      return;
    });
});

const server = module.exports = {};
server.start = (port, cb) => app.listen(port, cb);
server.stop = (cb) => app.close(cb);