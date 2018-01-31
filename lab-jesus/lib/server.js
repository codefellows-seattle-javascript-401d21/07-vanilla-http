'use strict';

const http = require('http');
const bodyParser = require('./body-parse');
const cowsay = require('cowsay');
//property of text 

const app = http.createServer((req, res) => {
  bodyParser(req)
    .then(request => {

      console.log(request.url);
      if(request.method === 'GET' && request.url.pathname === '/') {
        res.writeHead(201, {'Content-Type': 'text/plain'});
        res.write(`Hello! Welcome to my API\nThe available requests are:\n "/time" : Returns the current time\n "/echo" : returns an echo of sent items\n "/cowsay" : returns a cow that says whatever is place in the query string\n \tEnjoy!`);
        res.end();
        return;
      }

      if(request.method === 'GET' && request.url.pathname === '/time') {
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.write(JSON.stringify({
          now: Date.now(),
          date: new Date(),
        }));
        res.end();
        return;
      }

      if(request.method === 'POST' && request.url.pathname === '/echo') {
        res.writeHead(201, {'Content-Type': 'application/json'});
        res.write(JSON.stringify(request.body));
        res.end();
        return;
      }

      if(request.method === 'GET' && request.url.pathname === '/cowsay') {
        res.writeHead(201, {'Content-Type': 'text/plain'});
        if(request.url.query.text)res.write(cowsay.say({
          text : `${request.url.query.text}`,
        }));
        if(!request.url.query.text) res.write(cowsay.say({text: 'add an arguement genius\nfor example:\n"www.api-address.com/cowsay?text=hello"'}));
        res.end();
        return;
      }

      if(request.method === 'POST' && request.url.pathname === '/cowsay') {
        res.writeHead(201, {'Content-Type': 'text/plain'});
        if(request.url.query.text)res.write(cowsay.say({
          text : `${request.url.query.text}`,
        }));
        if(!request.url.query.text) res.write(cowsay.say({text: 'add an arguement genius\nfor example:\n"www.api-address.com/cowsay?text=hello"'}));
        res.end();
        return;
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