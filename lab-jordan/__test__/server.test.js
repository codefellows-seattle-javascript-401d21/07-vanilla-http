'use strict';

const server = require('../lib/server.js');
const superagent = require('superagent');

describe('SERVER MODULE', function () {
  beforeAll(() => server.start(4444));
  afterAll(() => server.stop());

  describe('Valid Request to the API', () => {
    describe('GET /time', () => {
      it('should respond with a status 200', () => {
        return superagent.get(':4444/time')
        .then(res => {
          expect(res.status).toBe(200);
        });
      });
      it('should return a date/time object', () => {
        return superagent.get(':4444/time')
        .then(res => {
          expect(res.body).toHaveProperty('now');
          expect(res.body).toBeInstanceOf(Object);
        });
      });
    });
  });

// describe('Invalid Request to the API', () => {
//
// })

});
