'use strict';
const server = require('./lib/server.js');

server.start(3000, () => console.log(`Listening on port 3000`));


