'use strict';

const server = require('../lib/server');
const superagent = require('superagent');


describe('Server module', function () {
  beforeAll(() => server.start(1234));
  afterAll(() => server.stop());

  describe('Valid Request to the API', () => {
    describe('GET /time', () => {
      it('Should respond with a 200', () => {
        return superagent.get(':1234/time')
          .then(res => {
            expect(res.status).toBe(200);
          });
      });
      it('should return a date/time object', () => {
        return superagent.get(':1234/time')
          .then(res => {
            expect(res.body).toHaveProperty('now');
            expect(res.body).toBeInstanceOf(Object);
          });
      });
    });

    describe('GET /', () => {
      it('Should respond with status  200', () => {
        return superagent.get(':1234/')
          .then(res => {
            expect(res.status).toBe(200);
          });
      });
      it('should return a hello welcoming to the server', () => { 
        return superagent.get(':1234/')
          .then(res => {
            expect(res.text).toBe('Welcome to my server!');
          });
      });
    });

    describe('GET /cowsay', () => {
      it('Should respond with a 400', () => {
        return superagent.get(':1234/cowsay')
          .then()
          .catch(err => {
            expect(err.status).toBe(400);
          });
      });
      it('Should respond with a 200', () => {
        return superagent.get(':1234/cowsay?text=MOO')
          .then(res => {
            expect(res.status).toBe(200);
          });
      });
    });
    
    describe('POST method, /cowsay endpoint', () => {
      test('should return a status code of 200', done => {
        superagent.post(':1234/cowsay')
          .send({ 'text': 'dont work at all' })
          .end((err, res) => {
            expect(res.status).toBe(200);
            done();
          });
      });
    });
  });
});


// http://localhost:3000/cowsay?text=hector+norzagaray would print my name with the cow