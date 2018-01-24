'use strict'

const server = require('../lib/server')
const superagent = require('superagent')

describe('Server module', function() {
  beforeAll(() => server.start(4444))
  afterAll(() => server.stop())

  describe('Valid Request to the API', () => {
    describe('GET /time', () => {
      it('should respond with a status 200', () => {
        return superagent.get(':4444/time')
          .then(res => {
            expect(res.status).toBe(200)
          })
      })
      it('should return a date/time object', () => {
        return superagent.get(':4444/time')
          .then(res => {
            console.log(res.body)
            expect(res.body).toHaveProperty('now')
            expect(res.body).toBeInstanceOf(Object)
          })
      })
      it('should return a talking cow', () => {
        return superagent.get(':4444/cowsay')
          .then(res => {
            console.log(res.body)
            expect(res.body).toHaveProperty('cow')
            expect(res.body).toBeInstanceOf(Object)
          })
      })
    })
  })
})