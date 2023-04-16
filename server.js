 const http = require('http');
const fs = require('fs');
const _ = require('lodash');
 const server = http.createServer((req, res) => {
    console.log(req.url,req.method);
    //lodash.
    const num = _.random(1,100);
console.log(num);
const greet = _.once(() => {
    console.log('Hello')
})
greet()
greet()
   res.statusCode = 200;
   res.setHeader('Content-Type', 'HTML');
   let path = "./views/";
   switch (req.url){
    case '/':
        path += "index.html";
        res.statusCode = 200;
        break
    case '/about':
        path += "about.html";
        res.statusCode = 200;
        break
    case '/about-us':
        res.statusCode = 301;
        res.setHeader('Location','/about');
        res.end();
    default:
        path += "404.html";
        res.statusCode = 404;
        break;

   }
   fs.readFile(path, (err, data) => {
    if (err) {
      console.log(err);
   }else{
    res.end(data);
   }
})
 });
 server.listen(3000,'localhost',()=>{
    console.log('Server running at http://localhost:3000/');
 });