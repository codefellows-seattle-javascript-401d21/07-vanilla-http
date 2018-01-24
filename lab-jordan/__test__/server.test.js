'use strict';

const server = require('../lib/server.js');
const superagent = require('superagent');

describe('SERVER MODULE', function () {
  beforeAll(() => server.start(4444));
  afterAll(() => server.stop());

  describe('Valid Request to the API', () => {
    describe('GET /time', () => {
      it('should respond with a status 200', () => {
        return superagent.get(':4444/')
        .then(res => {
          expect(res.status).toBe(200);
        });
      });
    //   it('should return "hello from my server!"', () => {
    //   // return superagent.get('localhost:4444/')
    //   //   .set('Content-Type', 'text/plain')
    //   //   .then((res) => {
    //   //     expect(JSON.parse(res.text)).toEqual({'text':'hello from my server!'});
  });
    describe('GET /cowsay', () => {
      it('should return a 200 status code with text', () => {
        return superagent.get('localhost:4444/cowsay?text=Hello world!')
        // .send({'text': 'Hello World!'})
        // .set('Content-Type', 'text/plain')
        .then(res => {
          expect(res.status).toBe(200);
        });
      });
      it('should return a 400 status code with text', () => {
        return superagent.get('localhost:4444/cowsay')
        // .send({'text': 'Hello World!'})
        // .set('Content-Type', 'text/plain')
        .then(res => {
          expect(res.status).toBe(400);
          expect(res.text).toContain('bad request');
        });
      });
    });
  });
});

// describe('Invalid Request to the API', () => {
