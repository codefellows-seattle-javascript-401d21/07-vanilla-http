# Lab 07: Vanilla HTTP Server



A Basic HTTP api server created using the native NodeJS http module with the implementation of a custom body-parser, ul-parser.  The api handles basic CRUD requests of GET, POST.  All operations are served on the same route, '/cowsay' and the user can send a message and receive it back in a response.



>## Install
    
The project has the following dependencies:

```JSON

  "devDependencies": {
    "eslint": "^4.16.0",
    "jest": "^22.1.4",
    "superagent": "^3.8.2"
  },
  "dependencies": {
    "cowsay": "^1.2.1"
  }

```

Rnn npm to install the node modules.

```bash
npm i 
```

The following npm scripts are available:

```JSON

 "scripts": {
    "lint" : "eslint .",
    "test": "jest --verbose -i",
    "start": "nodemon index.js"
  },
```

### Run the tests!

```bash
    npm test
```

>## Usage

There are two methods available;

### GET

  - A request to the home path returns a status of 200 and a text message

```
 GET:   http :3000/
 ```

```HTML
  Bonjour, mon ami!
```

```
    HTTP/1.1 200 OK
    Connection: keep-alive
    Content-Type: text/plain
    Date: Sun, 28 Jan 2018 05:20:49 GMT
    Transfer-Encoding: chunked
```

- A request to the /cowsay?text=Message returns a status of 200 and a cowsay message.

```
GET:  http :3000/cowsay?text=The+cow+says+moo
```

```HTTP
    __________________
    < The cow says moo >
    ------------------
            \   ^__^
            \  (oo)\_______
                (__)\       )\/\
                    ||----w |
                    ||     ||


  ```

  ```
    HTTP/1.1 200 OK
    Connection: keep-alive
    Content-Type: text/plain
    Date: Sun, 28 Jan 2018 05:29:16 GMT
    Transfer-Encoding: chunked
  ```

- A request to /cowsay returns a status of 400 and a cowsay bad request message.

```
  GET:    http :3000/cowsay
```

```HTML
 _____________                         
< Bad Request >
 -------------
        \   ^__^
         \  (oo)\_______
            (__)\       )\/\
                ||----w |
                ||     ||

```

```
HTTP/1.1 400 Bad Request
Connection: keep-alive
Content-Type: text/plain
Date: Sun, 28 Jan 2018 05:34:30 GMT
Transfer-Encoding: chunked
```

### POST

  - A request made to /cowsay with JSON data returns a cowsay message

  ```
    POST:   /cowsay
  ```

  ```JSON
    { "text": "Oh those golden grahams" }
  ```

```HTML
_________________________
< Oh those golden grahams >
 -------------------------
        \   ^__^
         \  (oo)\_______
            (__)\       )\/\
                ||----w |
                ||     ||

```

```
    HTTP/1.1 200 OK
    Connection: keep-alive
    Content-Type: text/plain
    Date: Sun, 28 Jan 2018 05:41:50 GMT
    Transfer-Encoding: chunked
```

- The response body is the json that was sent to create the message

 ```JSON
    { "text": "Oh those golden grahams" }
  ```

- A post made with out JSON in the body returns a cowsay bad request message  and a JSON object in teh response body

  ```
    POST:   /cowsay
  ```

  ```JSON
    {}
  ```

  ```HTML
      _____________
    < Bad Request >
    -------------
            \   ^__^
            \  (oo)\_______
                (__)\       )\/\
                    ||----w |
                    ||     ||

  ```

 ```JSON
    { "text": "Bad Request" }
  ```

```
    HTTP/1.1 400 Bad Request
    Connection: keep-alive
    Content-Type: text/plain
    Date: Sun, 28 Jan 2018 05:48:45 GMT
    Transfer-Encoding: chunked

```


  
>## Tests

  ### Valid requests

  #### POST

  - Test to validate the creation of new note

  - Test to validate receiving a 201 status code.

  - Test to validate that there is an id in the response body

  #### GET

  - Test to validate receiving a 200 status code.

  - Test to validate the item returned with the id that was requested

  - Test to validate the id was a correctly formed uuid

  - Test to validate a status of 200'
  
  - Test to validate the return an array
  
  - Test to validate the return of an array of all the ids

### Inalid requests

  #### GET
     
   - Validate a 404 error when sending a request to the wrong route
    
  #### POST
     
   - Validate a 404 error when sending a request to the wrong route
  
  #### PUT
     
   - Validate a 404 error when sending a request to the wrong route
   
   #### DELETE
     
   - Validate a 404 error when sending a request to the wrong route




### Expecting status 200

#### GET

- Test to validate a status code of 200 for a request to home page

- Test to validate a status code of 200 for a GET request to /cowsay with query string

- Test to validate the the return of the same message sent

#### POST

- Test to validate a status code of 200 for for a POST request to /cowsay page with JSON in the request body

- Test to validate a text response for a POST request to /cowsay page with JSON in the request body

-

  
### Expecting status 400'

#### GET

- Test to validate a 400 status code for a  GET request to cowsay page with a text key but no message

- Test to validate a 400 status code for a  GET request to cowsay page with the wrong key with a message

- Test to validate a 400 status code for a  GET request for an unhandled route

- Test to validate that the correct text was returned for a bad request

#### POST

- Test to validate a 400 status code for a Invalid response for POST request to cowsay page without text parameters
    
