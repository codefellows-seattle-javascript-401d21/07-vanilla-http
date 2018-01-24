'use strict';

const server = require('../lib/server');
const superagent = require('superagent');

describe('Server module', () => {
  beforeAll(() => server.start(5555));
  afterAl(() => server.stop());

  describe('Valid Request to the API', () => {
    describe('GET /', () => {
      it('should respond with a status 200', () => {
        return superagent.get(':5555/')
          .then(res => {
            expect(res.status).toBe(200);
          });
      });
    });

    // change to be GET /cowsay
    describe('GET /', () => {
      it('should respond with a status 200', () => {
        return superagent.get(':5555/')
          .then(res => {
            expect(res.status).toBe(200);
          });
      });
    });

    // change to be POST /cowsay
    describe('GET /', () => {
      it('should respond with a status 200', () => {
        return superagent.get(':5555/')
          .then(res => {
            expect(res.status).toBe(200);
          });
      });
    });
  });
});
