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
            expect(res.text).toMatch(/Hello/);
          });
      });
    });
    describe('GET /cowsay', () => {
      it('Should respond a bad request response if no query text is sent', () => {
        return superagent.get(':4444/cowsay')
          .then(res => {})
          .catch(err => {
            expect(err.response.text).toMatch(/Bad Request/);
          });
      });
      it('Should respond with a status of 200', () => {
        return superagent.get(':4444/cowsay?text=Cowpie')
          .then(res => {
            expect(res.status).toBe(200);
          });
      });
      it('Should respond with a message from the cow', () => {
        return superagent.get(':4444/cowsay?text=Cowpie')
          .then(res => {
            expect(res.text).toMatch(/Cowpie/);
          });
      });
    });
    describe('POST /cowsay', () => {
      it('Should respond with a bad request if bad data is sent', () => {
        return superagent.post(':4444/cowsay')
          .then(res => {})
          .catch(err => {
            expect(err.response.text).toMatch(/Bad Request/);
          });
      });
      it('Should respond with a status of 200', () => {
        return superagent.post(':4444/cowsay')
          .send({ text: 'Cowpie' })
          .then(res => {
            expect(res.status).toBe(200);
          });
      });
      it('Should respond with a message from the cow', () => {
        return superagent.post(':4444/cowsay')
          .send({ text: 'Cowpie' })
          .then(res => {
            expect(res.text).toMatch(/Cowpie/);
          });
      });
    });
  });
});