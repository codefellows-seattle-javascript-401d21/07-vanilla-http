'use strict';

const server = require('./lib/server'); //require in server module
server.start(3000, () => console.log(`Listening on port 3000`)); //start server listening on specified port, and log that to the console running the server