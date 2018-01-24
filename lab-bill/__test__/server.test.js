'use strict';

const server = require('../lib/server');
const superagent = require('superagent');

describe('server module', function() {
  beforeAll(() => server.start(4444));
  afterAll(() => server.stop());

  describe('Valid Request to the Api', () => {
    // describe('GET /', () => {
    //   it('should respond with a status of 200', () => {
    //     return superagent.get(':4444/')
    //       .then(res => {
    //         expect(res.status).toBe(200);
    //       });
    //   });
    //   it('should return hello from my server', () => {
    //     return superagent.get(':4444/')
    //       .then( res => {
    //         expect(res.text).toBe('hello from my server!');
    //       });
    //   });
    // });
    describe('get /cowsay', () => {
      // it('should respond with a status of 200', () => {
      //   return superagent.get(':4444/cowsay?text=thisismymessage')
      //     .then(res => {
      //       expect(res.status).toBe(200);
      //     });
      // });
      // it('should respond with the cowsay message', () => {
      //   return superagent.get(':4444/cowsay?text=thisismymessage')
      //     .then(res => {
      //       expect(res.text.includes('thisismymessage')).toBe(true);
      //     });
      // });
      it('should respond with a status of 400 if the query is invalid', () => {
        return superagent.get(':4444/cowsay')
          .then(res => {
            console.log(res);
          }).catch(res => {
            expect(res.status).toBe(400);
          }

          );
      });
    });
    // describe('post /cowsay', () => {
    //   it('should respond with a status of 201 on success', () => {
    //     return superagent.post(':4444/cowsay')
    //       .send({ text: 'Manny'})
    //       .then(res => {
    //         expect(res.status).toBe(201);
    //       });
    //   });
    //   it('should respond with the text we supplied in our request body on success', () => {
    //     return superagent.post(':4444/cowsay')
    //       .send({ text: 'Manny'})
    //       .then(res => {
    //         expect(res.text.includes('Manny')).toBe(true);
    //       });
    //   });
    //   it('should respond with a status of 400 on error', () => {
    //     return superagent.post(':4444/cowsay')
    //       .send()
    //       .then(res => {
    //       }).catch(res => {
    //         expect(res.status).toBe(400);
    //       });
    //   });
    //   it('should respond with the text of a cow saying bad things when there is an error', () => {
    //     return superagent.post(':4444/cowsay')
    //       .send()
    //       .then(res => {
    //       }).catch(res => {
    //         let x = res.response.request.response.text;
    //         expect(x.includes('bad request')).toBe(true);
    //       });
    //   });
    // });
  });
});