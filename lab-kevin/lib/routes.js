'use strict';

const cowsay = require('cowsay');

const routes = module.exports = {};

const getArray = [['/', home], ['/cowsay', cowsayResp]];
const getMap = new Map(getArray);
const postArray = [['/cowsay', cowsayResp]];
const postMap = new Map(postArray);

const respObject = {};
const errObject = {status: 404, content:  {'Content-Type': 'text/plain'} ,body: 'Bad Request'};

routes.get = (path, qStr) => {
  let path_handler = getMap.get(path);
  if(!path_handler) return errObject;
  return path_handler(qStr);
};

routes.post = (path, qStr) => { 
  let path_handler = postMap.get(path);
  if(!path_handler) return errObject;
  return path_handler(qStr);
};

function home(){
  respObject.content =  {'Content-Type': 'text/plain'};
  respObject.body ='Bonjour, mon ami!';
  respObject.status = 200;
  return respObject;
}

function cowsayResp(qStr){
  let statusCode = 200;
  let msg = qStr ? qStr.text : 'bad request';
  if (msg === 'bad request' ) statusCode = 400;
  let cowSayText = cowsay.say({ text: msg });
  respObject.content = {'Content-Type': 'text/plain'};
  respObject.body = cowSayText;
  respObject.status = statusCode;
  return respObject;
}
  

