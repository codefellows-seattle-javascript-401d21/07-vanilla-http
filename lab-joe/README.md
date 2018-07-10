COWSAY

Brief description of app:

This app is a project to demonstrate the different uses of http, we used the cowsay module to write text images to the server based on the query string.


To install and get started, install the cowsay node module.

https://www.npmjs.com/package/cowsay

To interact with the app:

visit localhost:3000/

you should get the message:

hello from my server!

visit http://localhost:3000/cowsay?text=cow

you should get something that looks like this in the browser:

https://i.imgur.com/MP5T2Qu.png

We created an HTTP Server using the NodeJS http module

We created a custom body parsing module that is used for parsing the body of all POST and PUT requests
