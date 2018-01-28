# Lab 7 ~ Vanilla HTTP Server

**Author**: Mitchell
**Version**: 1.0.0

## Overview
In this lab, we were tasked to create a simple HTTP server with the HTTP NodeJS module. We were also tasked to create a custom body parsing module for use in parsing the body of all **POST** and **PUT** requests. This also needed to integrate the Cowsay NPM package, and use `/cowsay` as an endpoint to post to, and utilize the `/cowsay?text={message}` query string for **GET** requests. **GET** and **POST** requests to these endpoints were to be tested using Jest.

## Getting Started
To get this application up and running, fork and/or clone this repository using the `git clone <git repository link>` command in your terminal. Next, run the `npm install` command, which will install all the necessary dependencies in the accompanying package.json file. After those packages have installed, you can run `npm test` to explore the included tests and functionality of their respective solutions. You can open up the code in your favorite editor to explore/modify the code, see how the tests are structured, and create tests of your own if desired. `npm start` will start a nodemon localhost server listening on port 3000, unless otherwise specified. 

## Description
The lib/ directory contains two main files, body-parse.js and server.js. The test coverage included only focuses on server.js, as you can see in the test/ directory. body-parse.js exports a single anonymous function, expecting only one request argument. server.js exports only a server module to be used by the index.js entry point and the server.test.js file, but don't be alarmed there is plenty going on with the non-exported `app` which utilizes the NodeJS http module's `http.createServer()` method. It handles a few different request types and routes, and returns `404 Not Found` if any routes are not handled directly. It is expecting `GET /`, `GET /cowsay`, and `POST /cowsay`. Once a server is up and running, you can enter `localhost:3000/` which will take you to a page with one line of text reading `hello from my server!`. 

There are a few requests you can make to play around with the Cowsay package. Entering `localhost:3000/cowsay?text=<your text here>` generate some sweet ASCII art to echo your query back to you. It would look a little something like this:

```
 __________________
< <your text here> >
 ------------------
        \   ^__^
         \  (oo)\_______
            (__)\       )\/\
                ||----w |
                ||     ||

```

Another method of generating these responses would be to make PUT requests, either by using Postman (which I did) or installing the HTTPie package (which I did not) and using that command line tool instead. Postman has a relatively easy to navigate UI, and after installing you would click on the box in the top left out of 6 options upon opening the application that says `Make a Request`. From there, you can choose from a dropdown that defaults to `GET` and change the request type to `POST`, enter the desired path of `localhost:3000/cowsay`, change ideally to the `Body` tab below the URL entry area, click on `raw`, and then enter what you want le cowsay to say as JSON:

```
{
  "text": "how do you do?"
}
```
Which will generate in the GUI below when you press the bright blue `Send` button in the top right corner:
```
 ________________
< how do you do? >
 ----------------
        \   ^__^
         \  (oo)\_______
            (__)\       )\/\
                ||----w |
                ||     ||

```

WHEW! Made it through that. The HTTPie alternative, granted a successful download and installation as well, go ahead and do the much simpler version of entering `http POST http://localhost:3000/cowsay text=how do you do?` which should do all the same with much less effort overall.

## Credits and Collaborations
[NodeJS HTTP Module Docs](https://nodejs.org/api/http.html) ~ https://nodejs.org/api/http.html
[NPM Cowsay Package Docs](https://www.npmjs.com/package/cowsay) ~ https://www.npmjs.com/package/cowsay
[Jest Docs](https://facebook.github.io/jest/) ~ https://facebook.github.io/jest/
[SuperAgent Docs](http://visionmedia.github.io/superagent/) ~ http://visionmedia.github.io/superagent/
[Postman Docs](https://www.getpostman.com/docs/) ~ https://www.getpostman.com/docs/
[HTTPie Docs](https://httpie.org/doc) ~ https://httpie.org/doc
