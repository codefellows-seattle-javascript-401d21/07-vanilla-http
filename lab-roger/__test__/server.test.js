'use strict';

const server = require('../lib/server');
const superagent = require('superagent');
const cowsay = require('cowsay');

describe('server module', function() {
  beforeAll(() => server.start(4444));
  afterAll(() => server.stop());

  describe('Valid Request to API', () =>{

    describe('Get /', () => {

      it('should respond with a status 200', (done) => {
        return superagent.get(':4444/')
          .then(res => {
            expect(res.status).toBe(200);
            expect(JSON.parse(res.text)).toBe('hello from my server');
            done();
          });
      });

      it('response should not be undefined', (done) =>{
        return superagent.get(':4444/')
          .then(res => {
            expect(res).toBeDefined();
            done();
          });
      });
    });

    describe('Get /cowsay', () => {

      it('should respond with a status 200', (done) => {
        return superagent.get(':4444/cowsay?text=hello')
          .then(res => {
            expect(res.status).toBe(200);
            expect(res.text).toEqual(cowsay.say({text: 'hello'}));
            done();
          });
      });
      it('response should not be undefined', (done) =>{
        return superagent.post(':4444/cowsay')
          .send({text: 'hello'})
          .then(res => {
            expect(res).not.toBe(undefined);
            done();
          });
      });



    });

    describe('POST/cowsay', () => {

      it('should respond with a status 200', (done) => {
        return superagent.post(':4444/cowsay')
          .send({'text': 'hello'})
          .then(res => {
            expect(res.status).toBe(200);
            expect(res.text).toBe(cowsay.say({text: 'hello'}));
            done();
          });
      });


      it('response should not be undefined', (done) =>{
        return superagent.post(':4444/cowsay')
          .send({text: 'hello'})
          .then(res => {
            expect(res).not.toBe(undefined);
            done();
          });
      });
    });

  });
  describe('Ivalid Request to API', () =>{

    describe('Get /cowsay', () => {

      it('should respond with a status 400', (done) => {
        return superagent.get(':4444/cowsay?text=')
          .catch(res => {
            expect(res.status).toBe(400);
            done();
          });

      });
    });

    describe('POST /cowsay', () => {

      it('should respond with a status 400', (done) => {
        return superagent.get(':4444/cowsay?text=')
          .catch(res => {
            expect(res.status).toBe(400);
            expect(res.response.text).toEqual(cowsay.say({text: 'Bad Request'}));
            done();
          });

      });
    });

  });


});
