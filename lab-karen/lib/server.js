'use strict';

const http = require('http'); //NodeJS https
const bodyParser = require('./body-parse'); //require my custom body-parse.js
const cowsay = require('cowsay');

const app = http.createServer((req, res) => { //create server
  bodyParser(req) //call functionality in body-parse.js
    .then(request => {//after it comes back from Promise
      //handling the case when GET request on localhost3000/
      if (request.method === 'GET' && request.url.pathname === '/') {
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.write('hello from my server!');
        res.end();
        return;
      }
      //handling the case when GET request on localhost3000/cowsay?text={message}
      if (request.method === 'GET' && request.url.pathname === '/cowsay') {
        if (!Object.keys(request.url.query).length) {
          res.writeHead(400, {'Content-Type': 'text/plain'});
          res.write('bad requests');
          res.end();
          return;
        }
        res.writeHead(200, {'Content-Type': 'text/plain'});
        console.log('good querystring', cowsay.say(request.url.query));
        res.write(cowsay.say(request.url.query));
        res.end();
        return;
      }

      //handling the case when POST request
      if (request.method === 'POST' && request.url.pathname === '/conwsay') {
        console.log('POST',cowsay.say(request.url.query));
        res.writeHead(201, {'Content-Type': 'text/plain'});
        res.write(cowsay.say(JSON.stringify(request.body)));
        res.end();
        return;
      }
      //handling the case when the request wasn't GET or POST
      res.writeHead(404, {'Content-Type': 'text/plain'});
      res.write('Not Found');
      res.end();
      return;
    })
    //handling the err case
    .catch(err => {
      res.writeHead(400, {'Content-Type': 'text/plain'});
      res.write('Bad Request');
      res.end();
      return err;
    });
});

const server = module.exports = {};
server.start = (port, cb) => app.listen(port, cb);
server.stop = (cb) => app.close (cb);
