
# 06-HTTP lab 

### Installing and How to use.

To install this program, place fork and 'git clone' this repo to your computer. From the terminal, navigate to  `lab-heath`. once there, install NPM but typing in , `nmp install`, and you need to do a `npm init`. after that you need to install jest, superagent, url, querystring, and cowsay which is done with `npm install -D jest superagent url quertstring cowsay`. 


next you need to have these scripts adjusted in your package.json file.

```javascript
"scripts": {
    "test": "jest",
    "lint": "eslint",
    "start": "node index.js",
    "start:watch": "nodemon index.js"
  },
  ```

from there, you can go to your terminal and type, 

```javascript
node run start
```
and this will start up your server, if you do `npn run start:watch`, this will let you see it in your localhost in your browser.


### some helpful commands  


now you can do and this`localhost:3000/` should print `hello from my server`.  

### function code for this call

```javascript
if(parserRequest.method === 'GET' && parserRequest.url.pathname === '/') {
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.write('hello from my server');
        res.end();
        return;
      }
```

if you type `localhost:3000/cowsay?text={your saying here}` should print.

### function code for this call

```javascript
 if(parserRequest.method === 'GET' && parserRequest.url.pathname === `/cowsay`) {
        if (parserRequest.url.query.text) {
          res.writeHead(200, {'Content-Type': 'text/plain'});
          res.write(cowsay.say({ text: `${parserRequest.url.query.text}`}));
          res.end();
          return;
        }
```

```javascript
 _______
< hello >
 -------
        \   ^__^
         \  (oo)\_______
            (__)\       )\/\
                ||----w |
                ||     ||
```

if you type `localhost:3000/cowsay?text=` with out any input, it will diplay  

`dude, you did not write anything!`  

### function code for this part  
```javascript
if (!parserRequest.url.query.text) {
          res.writeHead(400, {'Content-Type': 'text/plain'});
          res.write('dude, you did not write anything!');
          res.end();
          return;
        }
      }
```

we have also some post calls but you have to use a third party app like postman.

if you do that. just simple type `localhost:3000/cowsay?text={your saying here}`
and make sure set it to POST not the defualt GET.

### code for these functions

```javascript
if(parserRequest.method === 'POST' && parserRequest.url.pathname === '/cowsay') {
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.write(JSON.stringify(parserRequest.body));
        res.end();
        return;
      }
    })
```

and the catch for the error is this code

```javascript
 .catch(err => {
      res.writeHead(400, { 'Content-Type': 'text/plain' });
      res.write('Bad parserRequest');
      res.end();
      return;
    });
```

### testing 

testings was done with superagent to make the calls for us and the test code looks like this

### test block 1.
these test checks to see if we connect to the server

it #1 checks the status code
it #2 checks to see if text to be sent to us is matching
it #3 checks to see if the response is a object

```javascript
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
```

### test block 2.
these test checks to see if we send something into the URL that we can pass along so we can have it send some text back.

it #1 checks the status code
it #2 checks to see if text to be sent to us is matching
it #3 checks to see if the response is a object

```javascript
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
```

### test block 3.
these test checks if we get invalid response or error back.

it #1 checks the status code
it #2 checks to see if text to be sent to us is matching
it #3 checks to see if the response is a object

```javascript
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
```

### test block 4.
these test checks if we get valid response back from the API.

it #1 checks the status code
it #2 checks to see if text to be sent to us is matching
it #3 checks to see if the response is a object

```javascript
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
```

### test block 5.
these test checks if we get invalid response back from the API.

it #1 checks the status code
it #2 checks to see if its an object
it #3 checks to see if the response matachs the saying given

```javascript
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
      it('this should be the .catch at the end if nothing is sent', () => {
        return superagent.put(':4000/')
          .catch(err => {
            expect(err.response.text).toBe('Bad parserRequest');
          });
      });
    });
  });
```

help they is helpful

