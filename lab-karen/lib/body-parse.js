'use strict';

const urlParser = require('url'); //require from NodeJS
const queryString = require('querystring'); //require from NodeJS

module.exports = function(request) {
  return new Promise((resolve, reject) => { //set up Promise
    request.url = urlParser.parse(request.url); //get url info
    request.url.query = queryString.parse(request.url.query); //get query info
    //if HTTP request is not POST or PUT return because there is no body
    if(request.method !== 'POST' && request.method !== 'PUT') return resolve(request);

    let message = '';
    //when there's valid data add it to the string
    request.on('data', data => {
      message =+ data.toString();
    });
    //when the request ends
    request.on('end', () => {
      try { //try to JSON.parse the string if it works resolve promise
        request.body = JSON.parse(message);
        return resolve(request);
      } catch(err) {//if it doesn't catch the error
        return reject(err);
      }
    });
    //catching other errors
    request.on('error', err => {
      return reject(err);
    });
  });
};
