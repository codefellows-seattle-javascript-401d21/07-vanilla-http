'use strict';

const http = require('http')
const bodyParser = require('./body-parser.js')
//creating a module for our server
const server = module.exports = {};
server.start = (port, cb) => app.listen(port, cb)
server.stop = (callback) => app.close(cb)

const app = http.createServer((request, response) => {
  bodyParser(request)
  .then(request => {
    if (request.method === 'GET' && request.url.pathname === '/time') { //creating url path
      res.writeHead(200, {'Content-Type': 'application/json'})
      res.write(JSON.stringify({
        now: Date.now()
        // date: new Date() //this is built into js to create new date. we only need one of these
      }))
      res.end() //poplitely closes the reponse
      return
    } else if (request.method === 'POST' && request.url.pathname === '/echo') { //if we have a post and its too this echo route. We are going to respond ...
      res.writeHead(201, {'Content-Type': 'application/json'}) //this is an object written in string to preserver where the headers going and the capatalization
      res.write(JSON.stringify(request.body))
      res.end()
      return
    }
    res.writeHead(404, {'Content-Type': 'text/plain'}) //we did this in the node book prework which creates the header and text/type
    res.writeHead('Not Found')
    res.end()

  })
    .catch(err => {
      res.writeHead(404, { 'Content-Type': 'text/plain' })
      res.writeHead('Not Found')
      res.end()
    })
})