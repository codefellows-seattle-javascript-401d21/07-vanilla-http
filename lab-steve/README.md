# Vanilla HTTP Server

**Author**: Steve Carpenter
**Version**: 1.0.0

## Overview
This is a simple HTTP Server with integration with the cowsay module.

## Getting Started
The user needs to do the following to get the code up and running:
-Clone the repository from github [here](https://github.com/stevegcarpenter/07-vanilla-http)
-Run `npm install` in the lab-steve directory to install all the Node packages
-Run nodemon to start the server listening
-Type in a route into the browser with a query string ending in `/cowsay?text=<your-text>` to print a cowsay message
-Utilize something like [Postman](https://www.getpostman.com/) to test the `POST` route similarly by specifying `{text: <your-text>}`
-Type in the `/` root to get little Hello message

## Architecture
-NodeJS
-npm
-cowsay
-JS

## Change Log
2018-01-23 Scaffolded files and directories [Steven Carpenter]
2018-01-23 Added eslint, superagent, and jest [Steven Carpenter]
2018-01-23 Added cowsay [Steven Carpenter]
2018-01-23 Added jest configuration to the package.json file for beefed stats [Steven Carpenter]
2018-01-23 Write simple tests that don't pass yet [Steven Carpenter]
2018-01-23 Installed local version of nodemon [Steven Carpenter]
2018-01-23 Implemented the '/' root path for the server [Steven Carpenter]
2018-01-23 Added tests for the /cowsay path/route [Steven Carpenter]
2018-01-23 Added the /cowsay route [Steven Carpenter]
2018-01-23 Modified GET /cowsay code to match directions [Steven Carpenter]
2018-01-23 Added failure test for GET /cowsay [Steven Carpenter]
2018-01-23 Added the POST route for cowsay [Steven Carpenter]
2018-01-23 Added POST /cowsay route tests and reformatted tests [Steven Carpenter]

## Credits and Collaborations
[NodeJS](https://nodejs.org)
[npm](https://www.npmjs.com/)
[JavaScript](https://www.javascript.com/)
[Cowsay](https://www.npmjs.com/package/cowsay)

