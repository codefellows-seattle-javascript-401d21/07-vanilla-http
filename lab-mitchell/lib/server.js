'use strict';

const http = require('http'); //require in NodeJS HTTP module
const bodyParser = require('./body-parse'); //require in body-parse module
const cowsay = require('cowsay'); //require in NPM cowsay module

const app = http.createServer((req, res) => { //calling body.parser.parse and passing in request, saying there is still a readble steam available to us so we need to capture that readable stream IF there is data being sent in a POST or a PUT
  bodyParser(req)
    .then(request => { //when server recieves request, has to parse request body if its POST or PUT 
    //have to read in stream of bits/bytes (buffer), takes chunked format and puts it together
      if(request.method === 'GET' && request.url.pathname === '/') { //if method is GET and pathname of url property on request object is /
        res.writeHead(200, {'Content-Type': 'text/plain'}); //write out status code, and other header info
        //can define Content-Type, Content-Length, others in above object
        res.write('hello from my server!'); //can send back whatever you want, AS LONG AS IN FORM OF STRING
        res.end(); //ends response, closes what was sent by res.write()
        return;
      }
      
      if(request.method === 'GET' && request.url.pathname === '/cowsay') { //if GET request and url's pathname is /cowsay
        console.log(request.url.query);
        res.writeHead(200, {'Content-Type': 'text/plain'}); //write a 200 status code header
        res.write(cowsay.say(request.url.query)); //write to body/HTML page the cowsay.say()'d url query, so whatever is after the ?text=<query here>
        res.end();
        return;
      }

      if(request.method === 'POST' && request.url.pathname === '/cowsay') { //already parsed a body of data at this point on a request object, so if we have a post and to this route, we are gonna respond by writing headers first
        console.log(request.body);
        res.writeHead(201, {'Content-Type': 'text/plain'});
        res.write(cowsay.say(request.body)); //cowsaying the body of the POST request
        res.end();
        return;
      }

      res.writeHead(404, {'Content-Type': 'text/plain'});
      res.write('Not Found');
      res.end();
      return;
    })
    .catch(err => {
      res.writeHead(400, {'Content-Type': 'text/plain'});
      res.write(cowsay.say({text: 'bad request'}));
      res.end();
      return;
    });
});

const server = module.exports = {}; //function export that takes port & optional callback
server.start = (port, cb) => app.listen(port, cb); //in this case when you call server.start, pass port && callback off to app.listen
server.stop = (cb) => app.close(cb); //stops server!