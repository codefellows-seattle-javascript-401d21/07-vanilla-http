'use strict';

const server = require('../lib/server');
const superagent = require('superagent');

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
            expect(response.body).toHaveProperty('message');
            expect(response.body).toBeInstanceOf(Object);
          });
      });
    });
    describe('Get /cowsay', () => {
      it('should respond with an object', () => {
        return superagent.get(':4444/cowsay')
          .then(response => {
            expect(response.body).toBeInstanceOf(Object);
          });
      });
    });
  });
});