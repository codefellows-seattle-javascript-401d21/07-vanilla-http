'use strict';

const server = require('./lib/server');
const PORT = process.env.PORT || 3000;

server.start(PORT, () => console.log('opened server on ', PORT));