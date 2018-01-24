# Lab 07 - Vanilla HTTP Server
Joy Hou, Jan 23, 2018 

## Description
I am creating a vanilla HTTP server in Node.js that accepts and responds to requests.

## Installation and Interaction
Git clone this repository. In your terminal, navigate to the lab-joy folder and run "node index.js" to start your server. In your browser address bar, you can type requests such as:

```localhost:3000/cowsay?text=hello```

You will receive this response from the server in your browser window:

```
 _______
< hello >
 -------
        \   ^__^
         \  (oo)\_______
            (__)\       )\/\
                ||----w |
                ||     ||
```

## Modules
### Body-Parse
This module parses post and put requests to the server to return responses in human readable format.

### Server
This module creates a basic HTTP server that takes in requests and formulates and sends responses. 

### Index
Index.js starts the server at the designated port.