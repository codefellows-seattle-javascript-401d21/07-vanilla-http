'use strict'; 

const server = require('/../lib/server');
const superAgent = require('superagent');

describe('#Server.js testing', function(){
  describe('#Valid input', () => { 
    beforeAll(() => server.start(4321));
    AfterAll(() => server.stop());
   
    describe('#Valid response for GET request to home page', () =>{
      it('should respond with a status code of 200', () =>{
          superagent,get(':4321/')
          .then(res => {
            expect(res.status).toEqual(200);
          })
      });
    });

  });
});
