# Lab 07: Vanilla HTTP Server

## Installation
To run the application for the first time user should  
    `npm i`   
    `npm start`  
To user can then access the server via a browser or CLI like HTTpie.

Connect to localhost:3000, and requests can be make.

A request to the endpoint / ie. `http localhost:3000/`    
will return the text   
'hello from my server '

Using the server and cowsay:  
The format for using cowsay is as follows:

`http localhost3000:/cowsay?text=<text>`

If the text part is left out or the query is malformed a 400 Bad request will be returned from the server.

## Testing

To run the test suite the user should  

```npm test```

The test suite will run.
