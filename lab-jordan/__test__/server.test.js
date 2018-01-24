'use strict';

const server = require('../lib/server.js');
const superagent = require('superagent');

describe('SERVER MODULE', function () {
  beforeAll(() => server.start(4444));
  afterAll(() => server.stop());

  describe('Valid GET/ Requests', () => {

    describe('GET /', () => {

      it('should respond with a status 200', () => {
        return superagent.get(':4444/')
        .then(res => {
          expect(res.status).toBe(200);
        });
      });

      it('should return "hello from my server!"', () => {
      return superagent.get(':4444/')
        .then((res) => {
          expect(res.text).toEqual('hello from my server!');
        });
      });
    });

    describe('GET /cowsay', () => {

      it('should respond with a status 200', () => {
        return superagent.get(':4444/cowsay?text=Hello world!')
        .then(res => {
          expect(res.status).toBe(200);
        });
      });

      it('should return text', () => {
        return superagent.get(':4444/cowsay?text=Hello world!')
        .then(res => {
          expect(res.text).toMatch(/Hello world!/);
        });
      });

      it('should respond to bad request with a status 400', () => {
        return superagent.get(':4444/cowsay')
        // .set('Content-Type', 'text/plain')
        .then(res => {
          expect(res.status).toBe(400);
          expect(res.body.text).toMatch(/bad request/);
        });
      });

    }); // describe GET /cowsay

    describe('POST /cowsay', () => {

      it('should respond with a status 200', () => {
        return superagent.post(':4444/cowsay')
        .send('{"text": "moo"}')
        .then(res => {
          expect(res.status).toBe(200);
        });
      });

      it('should return correct res text', () => {
        return superagent.post(':4444/cowsay')
        .set('Content-Type', 'application/json')
        .send('{"text": "moo"}')
        .then(res => {
          expect(res.text).toMatch(/moo/);
        });
      });

      it('should respond to a bad request with a status 400', () => {
        return superagent.post(':4444/cowsay')
        // .set('Content-Type', 'application/json')
        .send('{"text": ""}')
        .then(res => {
          expect(res.status).toBe(400);
          expect(res.body.text).toMatch(/bad request/);
        });
      });

    }); // describe POST /cowsay

    describe('Incorrect path', () => {

      it('should respond to a bad path with a status 404', () => {
        return superagent.get(':4444/404')
        .then(res => {
          expect(res.status).toBe(404);
        });
      });

      it('should output "not found" with a bad path', () => {
        return superagent.get(':4444/404')
        .then(res => {
          expect(res.body.text).toMatch(/not found/);
        });
      });

    });

  });
});
