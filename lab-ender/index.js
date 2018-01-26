'use strict';

const server = require('./lib/server');
server.start(3000, () => console.log(`listening on port 3000`));
