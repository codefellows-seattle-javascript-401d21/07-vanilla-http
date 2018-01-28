'use strict';

const server = require('../lib/server');
const superagent = require('superagent');

describe('Server module', () => {
  beforeAll(() => server.start(6666));
  afterAll(() => server.stop());

  describe('Valid Request to the API', () => {
    describe('GET /', () => {
      it('should respond with a status 200', () => {
        return superagent.get(':6666/')
          .then(res => expect(res.status).toBe(200));
      });

      it('should respond with the message "Hello from my server!!"', () => {
        return superagent.get(':6666/')
          .then(res => expect(res.text).toBe('Hello from my server!!'));
      });

      it('should respond with a header containing Content-Type: text/plain', () => {
        return superagent.get(':6666/')
          .then(res => expect(res.header['content-type']).toBe('text/plain'));
      });
    });

    describe('GET /cowsay', () => {
      it('should respond with a status 200', () => {
        return superagent.get(':6666/')
          .then(res => expect(res.status).toBe(200));
      });

      it('should respond with a header containing Content-Type: text/plain', () => {
        return superagent.get(':6666/cowsay?text=foo')
          .then(res => expect(res.header['content-type']).toBe('text/plain'));
      });

      it('should display the message the user requests', () => {
        return superagent.get(':6666/cowsay?text=Moooooooo!')
          .then(res => expect(res.text).toMatch(/Moooooooo!/));
      });
    });


  });
});