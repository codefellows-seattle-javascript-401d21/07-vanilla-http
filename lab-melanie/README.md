# 07 Vanilla HTTP

This is an application that allows a user to type a message in the query string of a web address and will return with a `cowsay` message.

Example:
```
localhost:3000/cowsay?text=howdy
```
Returns:

```
 _______
< howdy >
 -------
        \   ^__^
         \  (oo)\_______
            (__)\       )\/\
                ||----w |
                ||     ||
```

---

## How to Get Started

### Install
Fork and git clone this repository to your local computer. Navigate to the `lab-melanie` directory in in your terminal and type: `npm install`, this will install all necessary packages.

### Get Typing
From the same directory, run `nodemon` to activate the server. In your web browser, type in the address:

`localhost:3000/cowsay?text=<your text here>`

Type any message you would like after the `text=` in the address bar and enjoy!

```
 __________________
< giddy up partner >
 ------------------
        \   ^__^
         \  (oo)\_______
            (__)\       )\/\
                ||----w |
                ||     ||
```

---
## Data Structures

### Server Module
The server module contain a function that creates a server. From here, data entered in the address bar gets sent to the body-parse module and returns with valid and invalid `GET` responses. If there is an error in the data, the server module with throw an error using the cowsay package.

### Body-Parse Module
This module contains a function that takes in the request information sent from the server module and parses out the information from a `GET` request into readable content. The parsed data then gets sent back to the server module to be posted to the browser.