'use strict';

//check out http docs CLASS INCOMING MESSAGE
//http. Class.:stream.Readable is what is created by the request 43:13 7.3 http video

const urlParser = require('url'); //nodeJS module takes raw data && parses it out into JS object of key value pairs
const queryString = require('querystring'); //

module.exports = function(request) { //takes request object as only argument
  return new Promise((resolve, reject) => {
    request.url = urlParser.parse(request.url); //overwrites pre-existing value
    request.url.query = queryString.parse(request.url.query); //essentially same thing, all data of request packaged up here to use later
    
    if(request.method !== 'POST' && request.method !== 'PUT') return resolve(request); //checking if POST/PUT, and if not will just return resolved request, which means it'll fall back to .then()
    //doesn't have body, don't need to change anything, off to races

    let message = '';

    //on data being transmitted, its being read here from readble stream - see server.js ln7-10
    request.on('data', data => { //gets data from data event
      message += data.toString(); //adds stringified incoming stream of data into message variable
    });

    request.on('end', () => { //as data is being received, build message. when request sends that end event, go ahead and try to parse that thing
      try {
        request.body = JSON.parse(message); //parsing JSON of the above, in 'end' b/c this meant to try and capture when request is ending/closing
        return resolve(request);
      } catch (err) {
        return reject(err);
      }
    });

    request.on('error', err => { //optional, if an error occurs somewhere in the processing of the request, will emit error
      return reject(err);
    });
  });
};