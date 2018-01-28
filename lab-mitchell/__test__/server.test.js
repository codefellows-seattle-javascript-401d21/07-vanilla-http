'use strict';

const server = require('../lib/server'); //requiring in server module
const superagent = require('superagent'); //can use to make http request from the server side or something like it
// const cowsay = require('cowsay'); //requiring in cowsay for usage in testing

describe('server.js', function() {
  beforeAll(() => server.start(3339)); //before every it block, start the server on port 3339
  afterAll(() => server.stop()); //after every it block, stop the server (basically RS)

  describe('Valid request to the API', function() {
    describe('GET /', () => {
      it('should respond status 200 for valid request', () => {
        return superagent.get(':3339/')
          .then(res => {
            expect(res.status).toBe(200);
            // done();
          });
      });

      it('should have text property on response and that property to be a string', () => {
        return superagent.get(':3339/')
          .then(res => {
            expect(res).toHaveProperty('text');
            expect(res.text).toBe('hello from my server!');
            // done();
          });
      });
    });

    describe('GET /cowsay', function() {
      it('should respond with status 200 with proper querystring', () => {
        return superagent.get(':3339/cowsay?text=AYBOOBAY')
          .then(res => {
            expect(res.status).toBe(200);
          });
      });

      it('should have text property on response and that property to be a string', () => {
        return superagent.get(':3339/cowsay?text=AYBOOBAY')
          .then(res => {
            expect(res).toHaveProperty('text');
            expect(res.text).toMatch(/AYBOOBAY/);
          });
      });
    });

    describe('POST /cowsay', function() {
      it('should respond with status 200 with proper querystring', () => {
        return superagent.post(':3339/cowsay')
          .send({text: 'AYBOOBAY'})
          .then(res => {
            expect(res.status).toBe(201);
          });
      });

      it('should have text property on response and that property to be a string', () => {
        return superagent.post(':3339/cowsay')
          .send({text: 'AYBOOBAY'})
          .then(res => {
            expect(res).toHaveProperty('text');
            expect(res.text).toMatch(/AYBOOBAY/);
          });
      });
    });
  });


  describe('Invalid request to the API', function() {
    describe('GET /', () => {
      it('should respond status 404 for invalid request', () => {
        return superagent.get(':3339/i')
          .then()
          .catch(err => {
            expect(err.status).toBe(404);
            // done();
          });
      });

      it('should have text property on response and that property to be a string', () => {
        return superagent.get(':3339/i')
          .then()
          .catch(err => {
            expect(err.response).toHaveProperty('text');
            expect(err.response.text).toBe('Not Found');
            // done();
          });
      });
    });

    describe('GET /cowsay', function() {
      it('should respond with status 400 with malformed querystring', () => {
        return superagent.get(':3339/cowsay?texxxxxxxt=AYBOOBAY')
          .then()
          .catch(err => {
            expect(err.status).toBe(400);
            // done();
          });
      });

      it('should have text property on response and that property to be a string', () => {
        return superagent.get(':3339/cowsay?texxxxxxxt=AYBOOBAY')
          .then()
          .catch(err => {
            expect(err.response).toHaveProperty('text');
            expect(err.response.text).toMatch(/bad request/);
          });
      });
    });

    describe('POST /cowsay', function() {
      it('should respond with status 200 with proper querystring', () => {
        return superagent.post(':3339/cowsay?texxxxxxt=?AYBOOBAY')
          .then()
          .catch(err => {
            expect(err.status).toBe(400);
          });
      });

      it('should have text property on response and that property to be a string', () => {
        return superagent.post(':3339/cowsay?texxxxxxt=?AYBOOBAY')
          .then()
          .catch(err => {
            expect(err.response).toHaveProperty('text');
            expect(err.response.text).toMatch(/bad request/);
          });
      });
    });
  });
});