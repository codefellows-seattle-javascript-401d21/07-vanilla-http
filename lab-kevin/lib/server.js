'use strict';

const http = require('http');
const body_parser = require('./body_parser');

const app = http.createServer((req, res) => {
  body_parser(req)
    .then(request => {
      if(request.method === 'GET'){}

      if(request.url.pathname === '/'){
        request.writeHead(200, {'Content-Type': 'text/plain'});
        request.write('Bonjour, mon ami!');
        return;
      }

      if()
    });

});

const server = module.exports = {}
server.start = (PORT, callback) => app.listen(PORT, callback);
server.stop = (callback) => app.close();
