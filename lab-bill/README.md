This app is designed to simulate an HTTP server on our local device.

To use this app, please install cowsay. If you wish to use this app as a developer, jest, eslint, and superagent are recommended to install. Install via npm i in your terminal.

Index.js is the entry point for running this app locally. Open your terminal and initiate a server using nodemon. Then go to your browser and enter localhost:3000.
Upon entry you should see a welcome message 'hello from my server'

If you enter localhost:3000/cowsay?text=hello

You will see the cow speak out hello.

If you want the cow to interact with your own custom message, simply place your custom message instead of hello. (No spaces)

If using this app as a developer you can also send a post route using superagent. So far the only functionality for this is located in server.test.js, but you can craft a custom message there by using .send({text: *your message here*})

The tests in server.test.js are formatted so that each get request will send a valid code on success, as well as sending the corresponding message that the user has chosen. It will also test to make sure given an invalid input the cow will tell the user bad response, or a 404 if the directory they were searching for does not exist. 

The body-parser.js section of the code breaks down the user input, allowing us to validate their inputs as well as compile the data they give us into meaningful request bodies to send to our server. It involves returning a Promise. If the route is a GET route the promise will return resolve after it has parsed the url information. Ia POST or PUT route is entered the promise will parse the JSON data before retuning resolved. 