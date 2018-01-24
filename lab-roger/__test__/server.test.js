'use strict';

const server = require('../lib/server');
const superagent = require('superagent');

describe('server module', function() {
  beforeAll(() => server.start(4444));
  afterAll(() => server.stpo());

  describe('Valid Request to API', () =>{

    describe('Get /', () => {

      it('should respond with a status 200', () => {
        return superagent.get(':4444/')
          .then(res => {
            expect(res.status).toBe(200);
          });
      });
      it('should return an string', () =>{
        return superagent.get(':4444/')
          .then(res => {
            expect(JSON.parse(res.text)).toBe('hello from my server');
          });

      });
      it('response should not be undefined', () =>{
        return superagent.get(':4444/')
          .then(res => {
            expect(res).toBeDefined();
          });
      });
    });
    describe('Get /cowsay', () => {

      it('should respond with a status 200', () => {
        return superagent.get(':4444/cowsay?text=hello')
          .then(res => {
            expect(res.status).toBe(200);
          });
      });
      it('should return an string', () =>{
        return superagent.get(':4444/')
          .then(res => {
            expect(typeof(JSON.parse(res.text))).toBe('string');
          });

      });
      it('response should not be undefined', () =>{
        return superagent.get(':4444/')
          .then(res => {
            expect(res).toBeDefined();
          });
      });
    });
    describe('POST/cowsay', () => {

      it('should respond with a status 200', () => {
        return superagent.post(':4444/cowsay')
          .send({'text': 'hello'})
          .then(res => {
            expect(res.status).toBe(200);
          });
      });
      it('should return an string', () =>{
        return superagent.post(':4444/cowsay')
          .send({'text': 'hello'})
          .then(res => {
            expect(res.text).not.toBe(null);
          });

      });
      it('response should not be undefined', () =>{
        return superagent.post(':4444/cowsay')
          .send({text: 'hello'})
          .then(res => {
            expect(res).not.toBe(undefined);
          });
      });
    });

  });

});
