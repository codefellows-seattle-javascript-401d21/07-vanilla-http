'use strict';

const server = require('./lib/server');
const PORT  = process.env.PORT || 3000;

server.start(PORT, () => console.log(`Listening on port ${PORT}`));