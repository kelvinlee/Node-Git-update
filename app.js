var http = require('http');
var url = require('url');
var exec = require("child_process").exec;
var port = 9998;
var Gpath = "";
var send = require('./send.js');

function finished(logs) {
  console.log("success");
}
function gitpull(pathname,req,res) {
  send.post("http://120.26.226.79:9998"+pathname);
  send.post("http://120.55.126.223:9998"+pathname);
  console.log(new Date().toLocaleDateString()+" "+new Date().toLocaleTimeString()+": cd "+pathname+" && git pull");
  exec("cd "+pathname+" && git pull && git rev-parse --short HEAD",function(err,logs){
    body = "null";
    if (logs.split("\n").length > 1) {
      body = logs.split("\n")[1];
    }
    res.write();
    res.end();
  });
  // exec("cd /my/demo/douban && git pull");
  // send.post("http://47.96.29.129:9998"+pathname)
  
  return true;
}
function routes(req,res) {
  var pathname = url.parse(req.url).pathname;
  if (req.method.toLowerCase()=="post") { 
    gitpull(pathname,req,res);
    console.log("Run git command.");
  }else{
    res.end();
    return "404";
  }
}
var req = http.createServer(function(req,res){
  res.writeHead(200, {'Content-Type': 'text/plain'}); 
  routes(req,res);
  
}).listen(port);
console.log("Node-Git-update start.");