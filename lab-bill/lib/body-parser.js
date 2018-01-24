'use strict';

const urlParser = require('url');
const queryString = require('querystring');

module.exports = function(request) {
  return new Promise((resolve, reject) => {
    request.url = urlParser.parse(request.url);
    request.url.query = queryString.parse(request.url.query);
    
    if(request.method !== 'POST' && request.method !== 'PUT') return resolve(request);

    let message = '';
    // console.log('line 14', message);
    request.on('data', data => {
    //   console.log('data.toString',data.toString);
      message += data.toString();
    });
    // console.log('message',message);

    request.on('end', () => {
      try {
        // console.log('hello');
        request.body = JSON.parse(message);
        return resolve(request);
      } catch(err) {
        //  console.log('reject(err)',err);
        return reject(err);
      }
    });
    request.on('error', err => {
      return reject(err);
    });
  });
};