'use strict';



const server = require('../lib/server');
const superagent = require('superagent');
const cowsay = require('cowsay');
require('jest');


describe('Server module', function() {
  beforeAll(() => server.start(4000));
  afterAll(() => server.stop());

  //GET
  describe('Valid Request to the API', () => {
    describe('GET /', () => {
      it('should respond with a status 200', () => {
        return superagent.get(':4000/')
          .then(res => {
            expect(res.status).toBe(200);
          });
        //.catch() // usually not needed in a case of successful request
      });
      it('should respond should be the opening saying', () => {
        return superagent.get(':4000/')
          .then(res => {
            expect(res.text).toBe('hello from my server');
          });
      });
      it('should respond should be an object', () => {
        return superagent.get(':4000/')
          .then(res => {
            expect(res.body).toBeInstanceOf(Object);
          });
      });
    });
  });

  //GET
  describe('Valid Request to the API', () => {
    describe('GET /cowsay that passes and builds a saying', () => {
      it('should respond with a status 200', () => {
        return superagent.get(':4000/cowsay?text=hello')
          .then(res => {
            expect(res.status).toBe(200);
          });
        //.catch() // usually not needed in a case of successful request
      });
      it('should respond what we have it write', () => {
        return superagent.get(':4000/cowsay?text=hello')
          .then(res => {
            expect(res.text).toBe(cowsay.say({ text: 'hello'}));
          });
      });
      it('should respond should be an object', () => {
        return superagent.get(':4000/cowsay?text=hello')
          .then(res => {
            expect(res.body).toBeInstanceOf(Object);
          });
      });
    });
  });

  //GET
  describe('invalid Request to the API', () => {
    describe('GET /cowsay that fails', () => {
      it('should error respond with a status 400', () => {
        return superagent.get(':4000/cowsay?text=')
          .then(res => {
          })
          .catch(err => {
            expect(err.status).toBe(400);
          });
      });
      it('should respond what we have it write', () => {
        return superagent.get(':4000/cowsay?text=')
          .then(res => {
          })
          .catch(err => {
            expect(err.response.text).toBe('dude, you did not write anything!');
          });
      });
      it('should error respond should be a object', () => {
        return superagent.get(':4000/cowsay?text=')
          .then(res => {
          })
          .catch(err => {
            expect(err).toBeInstanceOf(Object);
          });
      });
    });
  });

  //POST
  describe('Valid Request to the API', () => {
    describe('POST /cowsay that passes', () => {
      it('should respond with a status 200', () => {
        return superagent.post(':4000/cowsay?text=hello')
          .send({name: 'hello'})
          .then(res => {
            expect(res.status).toBe(200);
          });
      });
      it('should have a object that matchs the sent item', () => {
        return superagent.post(':4000/cowsay?text=hello')
          .send({'text': 'hello'})
          .then(res => {
            expect(res.text).toBe('{"text":"hello"}');
          });
      });
      it('should respond should be a object if something was sent', () => {
        return superagent.post(':4000/cowsay?text=hello')
          .send({'text': 'hello'})
          .then(res => {
            expect(res.body).toBeInstanceOf(Object);
          });
      });
    });
  });

  //POST
  describe('invalid Request to the API', () => {
    describe('POST /cowsay that fails', () => {
      it('should give me a 400 status if nothing is sent', () => {
        return superagent.post(':4000/cowsay?text=')
          .send()
          .then(res => {
          })
          .catch(err => {
            expect(err.status).toBe(400);
          });
      });
      it('should error response should be an object', () => {
        return superagent.put(':4000/cowsay?text=')
          .send()
          .then(res => {
          })
          .catch(err => {
            expect(err).toBeInstanceOf(Object);
          });
      });
    });
  });

  //ERROR CATCH ALL
  describe('invalid Request to the API', () => {
    describe('.catch at the end', () => {
      it('this should be the .catch at the end if nothing is sent', () => {
        return superagent.put(':4000/')
          .catch(err => {
            expect(err.response.text).toBe('Bad parserRequest');
          });
      });
    });
  });
});
