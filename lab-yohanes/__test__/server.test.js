'use strict';

const server = require('../lib/server.js')
const superagent = require('superagent') //a dependency allws to make a request from the http server side
//creating local server
describe('Server module', function () {
  beforeAll(() => server.start(4444))
  afterAll(() => server.stop())

  describe('Valid Reqests to API', () => {
    describe('GET /time', () => {
      it('should respond with a status 200', () => {
        return superagent.get(':4444/time') //url path. this time
        .then(res => {
          expect(res.status).toBe(200)
        })
      //   .catch(error => console.log(error)) //only needed from devs test making
      //   done()
      // })
      //don't usually need this unless its for test case
    })
    it('should return a date/time object', () => {
      return superagent.get(':4444/time')
      .then(res => {
        expect(res.body).toHaveProperty('now')
        expect(res.body).toBeInstanceOf(object)
      })
    })
  })
  // describe('Invalid Reqests to API', () => {

  //   }) not being used for now
  })
})


// server.start(3000, () => console.log(`Listening on Port 3000`))

//wath 33 minutes into part 3 to //configure packages.json