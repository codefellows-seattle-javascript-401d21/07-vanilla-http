'use strict';

const server = require('../lib/server'); //require in server.js
const superagent = require('superagent'); //require superagent npm i


describe('Server module', function() {
  beforeAll(() => server.start(4444));// start server on port 4444
  afterAll(() => server.stop());// stop when tests done

  describe('Valid Request to the API home route', () => {
    describe('GET /', () => {
      it('should respond with a status 200', () => {
        return superagent.get(':4444/')
          .then(res => {
            expect(res.status).toBe(200);

          });
      });
      it('should respond with correct message', () => {
        return superagent.get(':4444/')
          .then(res => {
            expect(res.text).toEqual('hello from my server!');
          });
      });
    });
  });
  describe ('Valid Request to the API cowsay route', () => {
    describe('GET /cowsay?text=hello', () => {
      it('should respond with a status 200', () => {
        return superagent.get(':4444/cowsay?text=hello')
          .then(res => {
            expect(res.status).toBe(200);

          });
      });
      it('should respond with correct message', () => {
        return superagent.get(':4444/cowsay?text=hello')
          .then(res => {
            expect(res.text).toMatch(/hello/);
          });
      });
    });
  });
});
