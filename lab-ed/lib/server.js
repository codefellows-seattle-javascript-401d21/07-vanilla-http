'use strict'

const http = require('http')
const bodyParser = require('./body-parse')

const app = http.createServer((req, res) => {
  bodyParser(req)
    .then(request => {
      if(request.method === 'GET' && request.url.pathname === '/time') {
        res.writeHead(200, {'Content-Type': 'application/json'})
        res.write(JSON.stringify({
          now: Date.now(),
          date: new Date(),
        }))
        res.end()
        return
      }

      if(request.method === 'POST' && request.url.pathname === 'echo') {
        res.writeHead(200, {'Content-Type': 'application/json'})
        res.write(JSON.stringify(request.body))
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
      res.write('Bad Request')
      res.end()
    })
})

const server = module.exports = {}
server.start = (port, callback) => app.listen(port, callback)
server.stop = (callback) => app.close(callback)