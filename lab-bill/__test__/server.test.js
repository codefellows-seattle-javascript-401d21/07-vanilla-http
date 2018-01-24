'use strict';

const server = require('../lib/server');
const superagent = require('superagent');

describe('server module', function() {
  beforeAll(() => server.start(4444));
  afterAll(() => server.stop());

  describe('Valid Request to the Api', () => {
    describe('GET /', () => {
      it('should respond with a status of 200', () => {
        return superagent.get(':4444/')
          .then(res => {
            expect(res.status).toBe(200);
          });
        //.catch()

      });
      it('should return hello from my server', () => {
        return superagent.get(':4444/')
          .then( res => {
            expect(res.text).toBe('hello from my server!');
            //   expect(res.body).toBeInstanceOf(Object);
          });
      });
    });
  });
});