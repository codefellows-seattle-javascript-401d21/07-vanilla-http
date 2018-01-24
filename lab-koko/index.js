'use strict';

const server = require('./lib/server');
server.start(5000, () => console.log(`Listening on port 5000`));