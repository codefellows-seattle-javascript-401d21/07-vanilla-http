'use strict';

const url_parser = require('url').parse;
const queryStr_parser = require('querystring').parse;

module.exports = function(request){
  return new Promise((resolve, reject) => {
    request.url = url_parser(request.url);
    request.url.query = queryStr_parser(request.url.query);
    let mesg = '';
    request.on('data', data => mesg += data.toString());
    request.on('end', () => {
      try {
        if(mesg) request.body = JSON.parse(mesg);
        return resolve(request);
      }
      catch(e) {
        return reject(e);
      }
    });
    request.on('error', err => reject(err));
  });

};