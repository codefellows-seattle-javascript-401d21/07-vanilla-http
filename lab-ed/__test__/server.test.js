'use strict'

const server = require('../lib/server')
const superagent = require('superagent')

describe('Server module', function() {
  beforeAll(() => server.start(4444))
  afterAll(() => server.stop())

  describe('Valid Request to the API', () => {
    describe('GET /cowsay', () => {
      it('should respond with a status 200', () => {
        return superagent.get(':4444/cowsay?text=mooo')
          .then(res => {
            expect(res.status).toBe(200)
          })
      })
      it('should return a talking cow', () => {
        return superagent.get(':4444/cowsay?text=mooo')
          .then(res => {
            console.log(res.text)
            expect(res.text).toMatch('mooo')
          })
      })
    })

    describe('POST /cowsay', () => {
      it('should respond with a status 200', () => {
        return superagent.get(':4444/cowsay?text=mooo')
          .then(res => {
            expect(res.status).toBe(200)
          })
      })
      it('should return a talking cow', () => {
        return superagent.get(':4444/cowsay?text=mooo')
          .then(res => {
            console.log(res.text)
            expect(res.text).toMatch('mooo')
          })
      })
    })
    
  }) 
  
})