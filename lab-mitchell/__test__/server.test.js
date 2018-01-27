'use strict';

const server = require('../lib/server');
const superagent = require('superagent');
const cowsay = require('cowsay');

describe('server.js', function() {
  beforeAll(() => server.start(3339));
  afterAll(() => server.stop());

  describe('Valid request', function() {
    it('should respond status 200 for valid request', function(done) {
      superagent.get(':3339/cowsay').then((res, req) => {
        expect(cowsay.say({text: 'hello'}).toBe('hello'));
        expect(res.status).toBe(200);
        done();
      });
    });

  });


});