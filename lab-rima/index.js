'use strict';

const server = require('./lib/server');

server.start(8888, () => console.log('Listening on port 8888'));
