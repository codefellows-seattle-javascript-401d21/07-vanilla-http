'use strict';

const server = require('../lib/server');
const superagent = require('superagent');
const cowsay = require('cowsay');

describe('Server Module', function() {
  beforeAll(() => server.start(4444));
  afterAll(() => server.stop());

  describe('Valid request to the API', () => {
    describe('GET /', () => {
      it('should respond with a status 200', () => {
        return superagent.get(':4444/')
          .then(respond => {
            expect(respond.status).toBe(200);
          });
      });
      it('should return a greeting object', () => {
        return superagent.get(':4444/')
          .then(response => {
            expect(response.body).toBe('hello from my server!');
          });
      });
    });
    describe('Get /cowsay', () => {
      it('should respond with a message', () => {
        return superagent.get(':4444/cowsay?text=hey')
          .then(response => {
            expect(response.text).toBe(cowsay.say({text: 'hey'}));
            console.log(response.text);
          });
      });
      it('should respond with a status 200', () => {
        return superagent.get(':4444/cowsay?text=hey')
          .then(response => {
            expect(response.status).toBe(200);
          });
      });
      it('should return an object', () => {
        return superagent.get(':4444/cowsay?text=hey')
          .then(response => {
            expect(response.body).toBeInstanceOf(Object);
          });
      });
    });
  });
  describe('Invalid request to API', () => {
    describe('Get /cosway', () => {
      it('should respond with a status 400', () => {
        return superagent.get(':4444/cosway?text=')
          .catch(err => {
            expect(err.status).toBe(400);
          });
      });
      it('should respond with an object', () => {
        return superagent.get(':4444/cosway?text=')
          .catch(err => {
            expect(err).toBeInstanceOf(Object);
          });
      });
      it('should respond with a cowsay message', () => {
        return superagent.get(':4444/cosway?text=')
          .catch(err => {
            expect(err.response.text).toBe(cowsay.say({text: 'Bad Request'}));
            console.log(err.response.text);
          });
      });
    });
  });
  describe('POST /cosway', () => {
    describe('Valid posts', () => {
      it('should return a status 200', () => {
        return superagent.post(':4444/cowsay?text=howdy')
          .send({text: 'howdy'})
          .then(response => {
            expect(response.status).toBe(201);
          });
      });
      it('should respond with an object', () => {
        return superagent.post(':4444/cowsay?text=hello')
          .send({'text': 'hello'})
          .then(response => {
            expect(response.text).toBe('{"text":"hello"}');
          });
      });
      it('should respond with a cowsway message', () => {
        return superagent.post(':4444/cowsay?text=it posted')
          .send({text: 'it posted'})
          .then(response => {
            expect(response.body).toEqual({text: 'it posted'});
            console.log(cowsay.say({text: 'it posted'}));
          });
      });
    });
    describe('Invalid posts', () => {
      it('should respond with a status 400', () => {
        return superagent.post(':4444/cosway?text=')
          .catch(err => {
            expect(err.status).toBe(400);
          });
      });
      it('should respond with an object', () => {
        return superagent.post(':4444/cosway?text=')
          .catch(err => {
            expect(err).toBeInstanceOf(Object);
          });
      });
    });
  });
});