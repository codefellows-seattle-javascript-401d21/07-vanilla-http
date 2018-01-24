'use strict'

const http = require('http')
const bodyParser = require('./body-parse')
const cowsay = require('cowsay')

const app = http.createServer((req, res) => {
  bodyParser(req)
  .then(request => {
    if(request.method === 'GET' && request.url.pathname === '/') {
      res.writeHead(200, {'Content-Type': 'application/json'})
      res.write('hello from my server!')
      res.end()
      return
    }

    if(request.method === 'GET' && request.url.pathname === '/cowsay') {
      res.writeHead(200, {'Content-Type': 'application/json'})
      res.write(cowsay.say(request.url.query))
      res.end()
      return
    }

    if(request.method === 'POST' && request.url.pathname === '/cowsay') {
      res.writeHead(200, {'Content-Type': 'text/plain'})
      res.write(cowsay.say(request.body));
      res.end()
      return
    }

    res.writeHead(404, {'Content-Type': 'text/plain'})
    res.write(cowsay.say({ text: 'not found' }))
    res.end()
    return
  }).catch(err => {
      res.writeHead(400, {'Content-Type': 'text/plain'});
      res.write(cowsay.say({text:'bad request'}));
      res.end();
      return
  });

})

const server = module.exports = {}
server.start = (port, cb) => app.listen(port, cb)
server.stop = (cb) => app.close(cb)