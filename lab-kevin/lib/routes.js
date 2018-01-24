'use strict';


const getArray = [['/', home], ['/cowsay', getCowsay]];
const getMap = new Map(getArray);


const postArray = [['/cowsay', postCowsay]];
const postMap = new Map(postArray);


const routes = module.exports = {};


routes.GET = (path) => getMap.get(path)();

routes.POST = (path, qStr) => postMap.get(path)(qStr);

const home = () => {
  let res = {
    content: {'Content-Type': 'text/plain'},
    body: 'Bonjour, mon ami!',
    status: 200
  };
  httpRes.call(res);
};

const getCowsay = (qStr) => {
  let statusCode = 200;
  let msg = qStr.text || '';
  let cowSayText; 

  if (!msg) statusCode = 400;

  let res = {
    content: {'Content-Type': 'text/plain'},
    body: '',
    status: statusCode
  };
  httpRes.call(res);
};
  

const postCowsay = (path, qStr) => { 
  
  httpRes() 
};

const httpRes = () => {
  res.writeHead(this.status, this.content);
  res.write(this.body);
  res.end();
};





For all GET requests made to /cowsay, the server should respond with the following:
Note: the query string should have the key value text=message
The response header should include Content-Type: text/plain
If the query text=message is set, respond with:
A status code of 200

A response body that includes the value returned from cowsay.say({ text: <querystring text> })
If the query text=message is not set, respond with:
Status code 400
A body including the value returned from cowsay.say({ text: 'bad request' })