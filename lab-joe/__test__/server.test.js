'use strict'

const server = require('../lib/server')
const superagent = require('superagent')


describe('Server module', function() {
  beforeAll(() => server.start(4444))
  afterAll(() => server.stop())

  describe('Valid Request to the API', () => {
    describe('GET /', () => {
      it('should respond with a status 200', () => {
        return superagent.get(':4444/')
        .then(res => {
          expect(res.status).toBe(200)
        })
      })
    })
  })


})