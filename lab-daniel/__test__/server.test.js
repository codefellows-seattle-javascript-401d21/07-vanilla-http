'use strict';

const server = require('../lib/server');
const superagent = require('superagent');
require('jest');

describe('Server module', () => {
  beforeAll(() => server.start(4444));
  afterAll(() => server.stop());
  
  describe('Valid Request to the API', () => {
    describe('GET /', () => {
      it('Should respond with a status 200', () => {
        return superagent.get(':4444/')
          .then(res => {
            expect(res.status).toBe(200);
          });
      });
      it('Should respond with a valid message', () => {
        return superagent.get(':4444/')
          .then(res => {
            expect(res.body).toMatch(/hello/);
          });
      });
    });
  });
});