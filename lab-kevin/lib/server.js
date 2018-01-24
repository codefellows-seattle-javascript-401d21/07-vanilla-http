'use strict';

const http = require('http');
const body_parser = require('./body-parser');
const routes = require ('./routes');
const errObject = {status: 404, content:  {'Content-Type': 'text/plain'}, body: 'Bad Request'};

const app = http.createServer((req, res) => {
  body_parser(req)
    .then(request => {
      let rm = request.method.toLowerCase();
      if (rm !== 'get' && rm !== 'post') return httpResponse.call(errObject);
      let queryString = request.url.query;
      if (rm === 'post') queryString = request.body;
      let respObj = routes[rm](request.url.pathname, queryString);
      httpResponse.call(respObj);
    })
    .catch(err => {
      errObject.status = 400;
      errObject.body = err;
      httpResponse.call(errObject);
      return;
    });

  function httpResponse(){
    res.writeHead(this.status, this.content);
    res.write(this.body);
    res.end();
  }
});

const server = module.exports = {};
server.start = (PORT, callback) => app.listen(PORT, callback);
server.stop = () => app.close();
