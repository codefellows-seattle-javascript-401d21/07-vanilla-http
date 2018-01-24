'use strict';

const server = require('../lib/server');
const superagent = require('superagent');

describe('Server module', () => {
  beforeAll(() => server.start(5555));
  afterAll(() => server.stop());

  describe('Valid Request to the API', () => {
    describe('GET /', () => {
      it('should respond with a status 200', () => {
        return superagent.get(':5555/')
          .then(res => expect(res.status).toBe(200));
      });

      it('should respond with the message "Hello from my server!"', () => {
        return superagent.get(':5555/')
          .then(res => expect(res.text).toBe('Hello from my server!'));
      });

      it('should respond with a header containing Content-Type: text/plain', () => {
        return superagent.get(':5555/')
          .then(res => expect(res.header['content-type']).toBe('text/plain'));
      });
    });

    describe('GET /cowsay', () => {
      it('should respond with a status 200', () => {
        return superagent.get(':5555/')
          .then(res => expect(res.status).toBe(200));
      });

      it('should result in a cowsay Bad Request if no query exists', () => {
        return superagent.get(':5555/cowsay')
          .catch(err => expect(err.response.text).toMatch(/Bad Request/));
      });

      it('should respond with a header containing Content-Type: text/plain', () => {
        return superagent.get(':5555/cowsay?text=foo')
          .then(res => expect(res.header['content-type']).toBe('text/plain'));
      });

      it('should display the message the user requests', () => {
        return superagent.get(':5555/cowsay?text=Yikes!')
          .then(res => expect(res.text).toMatch(/Yikes!/));
      });
    });

    describe('POST /cowsay', () => {
      it('should respond with a status 200 for success', () => {
        return superagent.post(':5555/cowsay')
          .send({text: 'Amazing!'})
          .then(res => expect(res.status).toBe(200));
      });

      it('should respond with the appropriate cowsay message', () => {
        return superagent.post(':5555/cowsay')
          .send({text: 'Amazing!'})
          .then(res => expect(res.text).toMatch(/Amazing!/));
      });

      it('should respond in a cowsay Bad Request when no data exists', () => {
        return superagent.post(':5555/cowsay')
          .catch(err => expect(err.response.text).toMatch(/Bad Request/));
      });
    });
  });
});
