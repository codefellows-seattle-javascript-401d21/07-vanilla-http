'use strict';

const server = require('../lib/server');
const superagent = require('superagent');
require('jest');


describe('Server module', function() {
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

    describe('GET /', () => {
      it('Should respond: status code 200', () => {
        return superagent.get(':4444/')
          .then(res => {
            expect(res.status).toBe(200);
          });
      });
      it('should return a hello string', () => { // HOUSTON WE HAVE CONTACT
        return superagent.get(':4444/')
          .then(res => {
            expect(res.text).toBe('Hello from my server!');
          });
      });
    });

    describe('GET /cowsay', () => {
      it('Should respond: status code 404', () => {
        return superagent.get(':4444/cowsay')
          .then()
          .catch(err => {
            expect(err.status).toBe(404);
          });
      });
      it('Should respond: bad request', () => {
        return superagent.get(':4444/cowsay')
          .then()
          .catch(err => {
            expect(err.response.text).toMatch(/bad request/);
          });
      });
      it('Should respond: status code 200', () => {
        return superagent.get(':4444/cowsay?text=MOO')
          .then(res => {
            expect(res.status).toBe(200);
          });
      });
      it('Should respond: moo cow message', () => {
        return superagent.get(':4444/cowsay?text=MOO')
          .then(res => {
            expect(res.text).toMatch(/MOO/);
          });
      });
    });
    
    describe('POST /cowsay', () => {
      it('Should respond: status code 400', () => {
        return superagent.post(':4444/cowsay')
          .then()
          .catch(err => {
            expect(err.status).toBe(400);
          });
      });
      it('Should respond: bad request', () => {
        return superagent.post(':4444/cowsay')
          .then()
          .catch(err => {
            expect(err.response.text).toMatch(/bad request/);
          });
      });
      it('Should respond: status code 200', () => {
        return superagent.post(':4444/cowsay')
          .send({ text: 'MOO' })
          .then(res => {
            expect(res.status).toBe(200);
          });
      });
      it('Should respond: moo cow message', () => {
        return superagent.post(':4444/cowsay')
          .send({ text: 'MOO' })
          .then(res => {
            expect(res.text).toMatch(/MOO/);
          });
      });
    });
  });
});