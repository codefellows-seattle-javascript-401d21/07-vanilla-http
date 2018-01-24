'use strict';

const server = require('../lib/server');
const superagent = require('superagent');


describe('Server module', function() {
  beforeAll(() => server.start(4444));
  afterAll(() => server.stop());

  describe('Valid Request to the API', () => {
    describe('GET /time', () => {
      it('should respond with a status 200', () => {
        return superagent.get(':4444/time')
          .then(res => {
            expect(res.status).toBe(200);
          });
        //.catch() // usually not needed in a case of successful request
      });
      it('should return a date/time object', () => {
        return superagent.get(':4444/time')
          .then(res => {
            expect(res.body).toHaveProperty('now');
            expect(res.body).toBeInstanceOf(Object);
          });
      });

      it('should return a date/time object', () => {
        return superagent.get(':4444/cowsay?text=hello')
          .then(res => {
            console.log('test log: ',res.header);
            expect(res.status).toEqual(201);
            expect(res.header.connection).toEqual('close');
          });
      });

    });
  });
});

describe('Invalid Request to the API', () => {
  beforeAll(() => server.start(4444));
  afterAll(() => server.stop());
  it('sends an incorrect path and returns 404 error', () => {
    return superagent.get(':4444/cowsa?text=wrong')
      .then(res => {
        console.log('test log: ',res);
        expect(res.status).toEqual(400);
      }).catch(error => expect(error.status).toEqual(404));
  });

  it('send a query that is not supported and return instuctions to fix query', () => {
    return superagent.get(':4444/cowsay?tex=wrong')
      .then(res => {
        // console.log('test log: ',res.text);
        expect(res.status).toEqual(201);
        expect(res.text).toContain('example');
      });
  });
});