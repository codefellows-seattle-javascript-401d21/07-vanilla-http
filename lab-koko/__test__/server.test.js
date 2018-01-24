'use strict';

const server = require('../lib/server.js');
const superagent = require('superagent');

describe('Server Module', () => {
  beforeAll(() => server.start(4444));
  afterAll(() => server.stop());

  describe('Valid request to the API', () => {
    describe('GET /', () => {
      it('should respond with a status of 200', done => {
        superagent.get(':4444/')
          .then(res => {
            expect(res.status).toBe(200);
            done();
          });
      });
    });
  });
});