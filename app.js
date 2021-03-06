var http = require('http');
var url = require('url');
var exec = require("child_process").exec;
var port = 9998;
var Gpath = "";
var send = require('./send.js');
var GET = require('./get.js');

function finished(logs) {
  console.log("success");
}
function gitpull(pathname,req,res) {
//   send.post("http://120.26.226.79:9998"+pathname);
  send.post("http://47.114.135.124:9998"+pathname);
  send.post("http://47.96.29.129:9998"+pathname);
  console.log(new Date().toLocaleDateString()+" "+new Date().toLocaleTimeString()+": cd "+pathname+" && git pull");
  exec("cd "+pathname+" && git pull && git rev-parse --short HEAD",function(err,logs){
    res.write("success");
    res.end();
  });
}
function getVersion(pathname) {
  return new Promise(function(success){
    exec("cd "+pathname+" && git rev-parse --short HEAD",function(err,logs){
      success(logs);
    });
  });
}
function routes(req,res) {
  var pathname = url.parse(req.url).pathname;
  if (req.method.toLowerCase()=="post") { 
    gitpull(pathname,req,res);
    console.log("Run git command.");
  }else{
    Promise.all([
      getVersion(pathname),
//       GET.get("http://120.26.226.79:9998"+pathname),
      GET.get("http://47.114.135.124:9998"+pathname),
      GET.get("http://47.96.29.129:9998"+pathname)])
    .then(function(vals){
      info = {
//         "third": vals[0].replace("\n",""),
        "second": vals[0].replace("\n",""),
        "ssd": vals[1].replace("\n",""),
        "US": vals[2].replace("\n","")
      }
      res.write(JSON.stringify(info));
      res.end();
    }).catch(function(err){
      console.log(err);
      res.write("error")
      res.end();
    });
  }
}
var req = http.createServer(function(req,res){
  res.writeHead(200, {'Content-Type': 'text/plain'}); 
  routes(req,res);
  
}).listen(port);
console.log("Node-Git-update start.");
