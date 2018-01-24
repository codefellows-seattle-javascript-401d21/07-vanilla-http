'use strict'; 

const server = require('../lib/server');
const superAgent = require('superagent');

describe('#Server.js testing', function(){
  describe('#Valid input', () => { 
    beforeAll(() => server.start(3333));
    afterAll(() => server.stop());
   
    describe('#Valid response for GET request to home page', () =>{
      it('should respond with a status code of 200', () =>{
        return superAgent.get(':3333/')
          .then(res => {
            expect(res.status).toEqual(200);
          })
          .catch(console.err);
      });
    });

    describe('#Valid response for GET request to cowsay page with out parameters', () =>{
      it('should respond with a status code of 200', () =>{
        return superAgent.get(':3333/')
          .then(res => {
            expect(res.status).toEqual(200);
          })
          .catch(console.err);
      });
    });

    describe('#Valid response for GET request to cowsay page with text parameters', () =>{
      it('should respond with a status code of 200', () =>{
        return superAgent.get(':3333/cowsay?text=Hello+Kevin')
          .then(res => {
            expect(res.status).toEqual(200);
          })
          .catch(console.err);
      });
    });

    describe('#Valid response for POST request to cowsay page with text parameters', () =>{
      it('should respond with a status code of 200', () =>{
        return superAgent.post(':3333/cowsay')
          .send({text: 'hello Kevin'})
          .then(res => {
            expect(res.status).toEqual(200);
          })
          .catch(console.err);
      });
    });

  });
});
