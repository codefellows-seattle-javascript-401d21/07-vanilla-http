'use strict'

const server = require('../lib/server')
const superagent = require('superagent')


describe('Server module', function() {
  beforeAll(() => server.start(4444))
  afterAll(() => server.stop())

  describe('/cowsay', () => {
    describe('GET /cowsay', () => {
      it('should respond with a status 200', () => {
        return superagent.get(':4444/cowsay?text=message')
        .then((req,res) => {
          // console.log(req)
          expect(typeof req).toBe('object');
          expect(req.url).toBe('acasdcw')
          // expect(res.status).toBe(200)
        })
      })

    })

  })






})