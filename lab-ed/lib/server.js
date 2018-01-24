'use strict'

const http = require('http')
const bodyParser = require('./body-parse')
const cowsay = require('cowsay')

const app = http.createServer((req, res) => {

  bodyParser(req)
    .then(request => {
      
      if(request.method === 'GET' && request.url.pathname === '/cowsay') {
        if(request.url.query.text) {
          res.writeHead(200, {'Content-Type': 'text/plain'})
          res.write(cowsay.say({ text: `${request.url.query.text}`,
          }))
          res.end()
          return
        }
        res.writeHead(400, {'Content-Type': 'text/plain'})
        res.write('bad cow')
        res.end()
        return
      }

      if(request.method === 'POST' && request.url.pathname === '/cowsay') {
        res.writeHead(200, {'Content-Type': 'text/plain'})
        res.write(cowsay.say(request.body))
        res.end()
        return
      }

      res.writeHead(404, {'Content-Type': 'text/plain'})
      res.write('Not Found')
      res.end()
      return
    })
    .catch(error => {
      res.writeHead(400, { 'Content-Type': 'text/plain' })
      res.write('Bad request')
      res.end()
      return
    })
})

const server = module.exports = {}
server.start = (port, callback) => app.listen(port, callback)
server.stop = (callback) => app.close(callback)