'use strict';

const fs = require('fs')

let firstRead = fs.readFile(`${__dirname}/promise.js`, (err, data) => {
  return new Promise((resolve, reject) => {
    if(err) reject(new Error('banana slip'))
    return resolve(data.toString())
  })
})
//this makes things run synchronously so every function/method is checked 'error/reject' first before moving on to the next. Best utilized for test cases
firstRead
.then()
.then()
.catch()

fs.readFile(`${__dirname}/promise.js`, (err, data) => {
  if(err) reject(new Error('banana slipped again...'))
  resolve(data.toString())
})

//npm i -D jest eslint superagent installs all three files at once