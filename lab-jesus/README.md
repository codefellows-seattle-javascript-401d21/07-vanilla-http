#Documentation
Author: Jesus
Title: Cow-Say API
Description: Creates an API where a user can interact with a server via API Calls

The available requests are:
 "/time" : Returns the current time
 "/echo" : returns an echo of sent items
 "/cowsay" : returns a cow that says whatever is place in the query string
  Enjoy!

  Modules:
  server.js
    -takes in the routes and sends back requested data
    -validates routes and data input
    -uses cowsay

  body-parse.js
    -parses the body of message to a useful form

