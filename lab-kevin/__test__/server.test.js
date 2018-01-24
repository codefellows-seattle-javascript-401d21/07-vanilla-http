'use strict'; 

const server = require('../lib/server');
const superAgent = require('superagent');

describe('#Server.js testing', function(){
  beforeAll(() => server.start(3333));
  afterAll(() => server.stop());
  
  describe('#Expecting status 200', () => { 
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
          .send({text: 'hello Squirrel head'})
          .then(res => {
            expect(res.status).toEqual(200);
          })
          .catch(console.err);
      });
    });
  });

  
  describe('#Expecting status 400', () => {

    describe('#Invalid response for GET request to cowsay page with a text key but no message', () =>{
      it('should respond with a status code of 400', () =>{
        return superAgent.get(':3333/cowsay?text=')
          .catch(res => {
            expect(res.status).toEqual(400);
          });
      });
    });

    describe('#Invalid response for GET request to cowsay page with the wrong key but with a message', () =>{
      it('should respond with a status code of 400', () =>{
        return superAgent.get(':3333/cowsay?next=Hello')
          .then()
          .catch(res => {
            expect(res.status).toEqual(400);
          });
      });
    });   
    

    describe('#Invalid response for POST request to cowsay page without text parameters', () =>{
      it('should respond with a status code of 400', () =>{
        return superAgent.post(':3333/cowsay')
          .send()
          .then()
          .catch(res => {
            expect(res.status).toEqual(400);
          });
      });
    });


    describe('#Invalid response GET for bad get requests on other routes', () =>{
      it('should respond with a status code of 400', () =>{
        return superAgent.get(':3333/sleep')
          .catch(res => {
            expect(res.status).toEqual(404);
          });
      });
    });
  });

  describe('#Expecting correct data', () => {

    describe('#Valid text for GET request to home page', () =>{
      it('should respond withB onjour, mon ami!', () =>{
        return superAgent.get(':3333/')
          .then(res => {
            expect(res.text).toEqual('Bonjour, mon ami!');
          })
          .catch(console.err);
      });
    });

    describe('#Valid text response for GET request to cowsay page with out parameters', () =>{
      it('should respond with Bonjour, mon am!' , () =>{
        return superAgent.get(':3333/')
          .then(res => {
            expect(res.text).toEqual('Bonjour, mon ami!');
          })
          .catch(console.err);
      });
    });

    describe('#Valid response for GET request to cowsay page with text parameters', () =>{
      it('should respond Hello Kevin', () =>{
        return superAgent.get(':3333/cowsay?text=Hello+Kevin')
          .then(res => {
            expect(res.text).toMatch(/Hello Kevin/);
          })
          .catch(console.err);
      });
    });

    describe('#Valid response for POST request to cowsay page with text parameters', () =>{
      it('should respond with a status code of 200', () =>{
        return superAgent.post(':3333/cowsay')
          .send({text: 'hello Squirrel head'})
          .then(res => {
            expect(res.text).toMatch(/hello Squirrel head/);
          })
          .catch(console.err);
      });
    });
  });

  describe('#Expecting bad request', () => {

    describe('#Invalid response for GET request to cowsay page with a text key but no message', () =>{
      it('should respond with bad request', () =>{
        return superAgent.get(':3333/cowsay?text=')
          .catch(res => {
            expect(res.response.text).toMatch(/Bad Request/);
          });
      });
    });

    describe('#Invalid response for GET request to cowsay page with the wrong key but with a message', () =>{
      it('should respond with bad request', () =>{
        return superAgent.get(':3333/cowsay?next=Hello')
          .catch(res => {
            expect(res.response.text).toMatch(/Bad Request/);
          });
      });
    });   
    

    describe('#Invalid response for POST request to cowsay page without text parameters', () =>{
      it('should respond with a bad request', () =>{
        return superAgent.post(':3333/cowsay')
          .send()
          .catch(res => {
            expect(res.response.text).toMatch(/Bad Request/);
          });
      });
    });

    describe('#Invalid response GET for bad get requests on other routes', () =>{
      it('should respond with a status code of 400', () =>{
        return superAgent.get(':3333/sleep')
          .catch(res => {
            expect(res.response.text).toMatch(/Bad Request/);
          });
      });
      
    });
  });
});
      
