'use strict';

const urlParser = require('url');
const queryString = require('querystring');

// helper function for testing
/*function log(r){
  console.log('url '+r.url);
  console.log('pathname '+urlParser.parse(r.url).pathname);
  console.log('path '+urlParser.parse(r.url).path);
  console.log('query text '); console.log(queryString.parse(urlParser.parse(r.url).query));
  console.log('path '); console.log((queryString.parse(urlParser.parse(r.url).query)).hasOwnProperty('text'));
}
*/
module.exports = function(request){

//log(request);

  return new Promise((resolve, reject) => {
    request.url = urlParser.parse(request.url);
    request.url.query = queryString.parse(request.url.query);

    if(request.method !== 'POST' && request.method !== 'PUT'){
      return resolve(request);
    }

    let msg = '';

    request.on('data', data => {
      msg += data.toString();
    });

    request.on('end', () => {
      try{
        request.body = JSON.parse(msg);

        return resolve(request);
      } catch(err) {
        return reject(err);
      }
    });

    request.on('error', err => {
      return reject(err);
    });
  });
};
