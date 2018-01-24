## HTTP Server

This is an assignment for cf-401 to create a HTTP server.

#### How to start

In terminal
```
git clone <clone ssh of this repo>
npm intall -g nodemon
npm start
```

#### Three active routes

* GET/ -> response (status: 200) with 'hello from my server!'
* GET/cowsay?text={message} -> response (status: 200) with cowsay.say({ message })
* GET/cowsay with no text -> response (status: 400) with cowsay.say({bad request'})
* POST/cowsay with JSON obj that has property 'text' -> response (status: 200) with cowsay.say({ value of key 'text' })
* POST/cowsay with no JSON obj that has property 'text' -> response (status: 400) with cowsay.say('bad request')
