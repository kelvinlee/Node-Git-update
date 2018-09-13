var http = require('http');
var url = require('url');
var exec = require("child_process").exec;
var port = 9998;
var Gpath = "";
var send = require('./send.js');

function finished(logs) {
  console.log("success");
}
function dockerRestart() {
  console.log("active restart")
}
function gitpull(pathname) { 
  console.log("cd "+pathname+" && git pull");
  if (pathname.indexOf("active") > 1) {
    exec("cd "+pathname+" && git pull && docker restart active",dockerRestart);
  } else if (pathname.indexOf("giccoo-node") >= 1) {
    exec("cd "+pathname+" && git pull && docker restart giccoo-node",finished);
  }else{
    exec("cd "+pathname+" && git pull",finished);
  }
  // exec("cd /my/demo/douban && git pull");
  return true;
}
function routes(req,res) {
  var pathname = url.parse(req.url).pathname;
  if (req.method.toLowerCase()=="post") { 
    gitpull(pathname);
    console.log("Run git command.");
    res.end();
  }else{
    exec("cd "+pathname+" && git rev-parse --short HEAD",function(err,logs){
      if (logs) {
        res.write(logs);
      }else{
        res.write("404");
      }
      res.end();
    });
    return "404";
  }
}
var req = http.createServer(function(req,res){
  res.writeHead(200, {'Content-Type': 'text/plain'}); 
  routes(req,res);
}).listen(port);
console.log("Node-Git-update start.");