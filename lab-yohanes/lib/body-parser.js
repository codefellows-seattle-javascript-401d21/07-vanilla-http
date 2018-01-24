'use strict';

const urlParser = require('url') //already in node package. It will take in the raw data and parse out as a javascript object of key value pairs and assiging that object right back to request.url
const queryString = require('querystring') //effectively doing the same thing with the query object

module.exports = function () {
  return new Promise((resolve, reject) => {
    request.url = url.parse(request, url)
    request.url = url.query = queryString.parse(request.url.query)
    .then()
    .catch()

    if(request.method !== 'POST'  || request.method !== 'PUT')

    return resolve(request)
    let message = ''

    request.on('data', data => {
      message += data.toString()
    })

    request.on('end', () => {
      try {
        request.body = JSON.parse(message)
        return resolve(request)
      } catch(error) {
        return reject(error)
        }
    })
  })
}