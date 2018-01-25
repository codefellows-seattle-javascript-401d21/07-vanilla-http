'use strict';

const server = require('./lib/server');
server.start(3000, () => console.log('Listening on PORT 3000'));