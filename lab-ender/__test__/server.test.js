'use strict';

const server = require('../lib/server');
const superagent = require('superagent');
require('jest');

describe('Server module', function() {
  beforeAll(() => server.start(4444));
  afterAll(() => server.stop());

  describe('Valid GET /', () => {
    describe('GET /', () => {
      it('should respond with a status 200', () => {
        return superagent.get(':4444/')
        .then(res => {
          expect(res.status).toBe(200);
        });
      });
      it('should return "hello from my server!"', () => {
        return superagent.get(':4444')
        .then(res => {
          expect(res.text).toEqual('hello from my server!');
        });
      });
    });
    describe('GET /cowsay', () => {
      it('should respond to good req with status 200', () => {
        return superagent.get(':4444/cowsay?text=Hello world!')
        .then(res => {
          expect(res.status).toBe(200);
        });
      });
      it('should respond to good req with expected text', () => {
        return superagent.get(':4444/cowsay?text=Hello world!')
        .then(res => {
          expect(res.text).toMatch(/Hello world!/);
        });
      });
      it('should respond to bad req with status 400', () => {
        return superagent.get(':4444/cowsay')
        .then(res => {
        }).catch(res => {
          expect(res.status).toBe(400);
        });
      });
    });
    describe('POST /cowsay', () => {
      it('should respond to valid post with status 201', () => {
        return superagent.post(':4444/cowsay')
        .send('{"text":"post"}')
        .then(res => {
          expect(res.status).toBe(201);
        });
      });
      it('should respond to valid post with expected text', () => {
        return superagent.post(':4444/cowsay')
        .set('Content-Type', 'application/json')
        .send('{"text":"post"}')
        .then(res => {
          expect(res.text).toMatch(/post/);
        });
      });
      it('should respond to bad post with status 400', () => {
        return superagent.post(':4444/cowsay')
        .set('Content-Type', 'application/json')
        .send('{"text":""}')
        .then(res => {
          expect(res.status).toBe(400);
        });
      });
      it('should respond to bad post with "bad request"', () => {
        return superagent.post(':4444/cowsay')
        .send('{"text":""}')
        .then(res => {
          expect(res.text).toMatch(/bad request/);
        });
      });
    });
    describe('incorrect path', () => {
      it('should respond to bad path with 404', () => {
        return superagent.get(':4444/404')
        .then(res => {
          expect(res.status).toBe(404);
        });
      });
      it('should respond to bad path with "not found"', () => {
        return superagent.get('4444/404')
        .then(res => {
          expect(res.body.text).toMatch(/not found/);
        });
      });
    });
  });
});
