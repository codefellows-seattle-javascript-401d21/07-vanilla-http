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
      });
      it('should return hello from my server', () => {
        return superagent.get(':4444/')
          .then( res => {
            expect(res.text).toBe('hello from my server!');
          });
      });
    });
    describe('get /cowsay', () => {
      it('should respond with a status of 200', () => {
        return superagent.get(':4444/cowsay?text=thisismymessage')
          .then(res => {
            expect(res.status).toBe(200);
          });
      });
      it('should respond with the cowsay message', () => {
        return superagent.get(':4444/cowsay?text=thisismymessage')
          .then(res => {
            // console.log(res.text);
            expect(res.text.includes('thisismymessage')).toBe(true);
          });
      });
    });
    describe('post /cowsay', () => {
      it('should respond with a status of 201', () => {
        return superagent.post(':4444/cowsay')
          .send({ text: 'Manny'})
          .then(res => {
            expect(res.status).toBe(201);
          });
      });
      it('should respond with the text we supplied in our request body', () => {
        return superagent.post(':4444/cowsay')
          .send({ text: 'Manny'})
          .then(res => {
            console.log(res.text);
            expect(res.text.includes('Manny')).toBe(true);
          });
      });
      it('should respond with a status of 400', () => {
        return superagent.post(':4444/cowsay')
          .send()
          .then(res => {
            // expect(res.status).toBe(400);
          }).catch(res => {
            // console.log(res.status);
            // console.log(res.response.request.response.text);
            expect(res.status).toBe(400);
          });
      });
      it('should respond with the text of a cow saying bad things', () => {
        return superagent.post(':4444/cowsay')
          .send()
          .then(res => {
            // expect(res.status).toBe(400);
          }).catch(res => {
            // console.log(res.status);
            // console.log(res.response.request.response.text);
            let x = res.response.request.response.text;
            expect(x.includes('bad request')).toBe(true);
          });
      });
    });
  });
});