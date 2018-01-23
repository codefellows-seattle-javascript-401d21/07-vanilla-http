'use strict';

const server = require('../lib/server');
const superagent = require('superagent');

describe('server module', function() {
  beforeAll(() => server.start(4444));
  afterAll(() => server.stop());

  describe('Valid Request to the Api', () => {
    describe('GET /time', () => {
      it('should respond with a status of 200', () => {
        return superagent.get(':4444/time')
          .then(res => {
            expect(res.status).toBe(200);
          });
        //.catch()

      });
      it('should return a date/time object', () => {
        return superagent.get(':4444/time')
          .then( res => {
            expect(res.body).toHaveProperty('now');
            expect(res.body).toBeInstanceOf(Object);
          });
      });
    });
  });
});