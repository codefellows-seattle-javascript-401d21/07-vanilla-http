# Jeremy's HTTP Server

Author: Jeremy Pearson
Version: 1.0.0
Libraries: jest/cowsay/superagent
Last modified: 1/23/2018

## How to start the server

1.) Open terminal
2.) Navigate to the lab-jeremy subfolder
3.) Install dependencies (jest/cowsay/superagent)
4.) launch index.js with node (node index.js)
    - Open a browser or use some other method to request: localhost:3000/
    - Open a browser or use some other method to request: localhost:3000/cowsay?text={text}
    - Use superagent to send an object in the form of { text: 'TEXT HERE' } to route :4444/cowsay

## Exported Values

File: server.js
Exported function(s): server.start and server.stop 
Purpose: Functions to start listening with the server and stop it.

File: body-parse.js
Exported function(s): single anonymous function
Purpose: Returns a promise that tries to return the request as is for GET or DELETE routes. For other routes the promise tries to piece together together chunks of string data and then set that data, after parsing with JSON, to the request.body. If successful, it returns the callback promise successful. If not it returns the error.