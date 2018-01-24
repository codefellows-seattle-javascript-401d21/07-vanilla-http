'use strict';

const cowsay = require('cowsay');

const getArray = [['/', home], ['/cowsay', cowsayRes]];
const getMap = new Map(getArray);
const postArray = [['/cowsay', cowsayResy]];
const postMap = new Map(postArray);
const routes = module.exports = {};

let respObject = {}

routes.get = (path, qStr) => getMap.get(path)();
routes.post = (path, qStr) => postMap.get(path)(qStr);

const home = () => {
  respObject.content =  {'Content-Type': 'text/plain'};
  respObject.body ='Bonjour, mon ami!';
  respObject.status = 200;
  return respObject;
};

const cowsayRes = (qStr) => {
  let statusCode = 200;
  let msg = qStr.text || 'bad request';

  if (msg ==='bad request' ) statusCode = 400;
  let cowSayText = cowsay.say({ text :msg });
  respObject.content = {'Content-Type': 'text/plain'}
  respObject.body = cowSayText;
  respObject.status = statusCode;
  return respObject;
};
  

