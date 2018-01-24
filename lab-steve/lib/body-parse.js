'use strict';

const urlParser = require('url');
const queryString = require('querystring');

module.exports = (request) => {
  return new Promise((resolve, reject) => {
    request.url = urlParser.parse(request.url);
    request.url.query = queryString.parse(request.url.query);

    // pass POST and PUT stuff through
    if (request.method !== 'POST' && request.method !== 'PUT') return resolve(request);

    let msg = '';
    request.on('data', data => {
      msg += data.toString();
    });

    request.on('end', () => {
      try {
        request.body = JSON.parse(msg);
        return resolve(request);
      } catch (err) {
        return reject(err);
      }
    });

    request.on('error', err => {
      return reject(err);
    });
  });
};
