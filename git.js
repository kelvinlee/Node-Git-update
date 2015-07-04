var http = require('http');
var url = require('url');
var exec = require("child_process").exec;
var port = 9998;
var Gpath = "";

var pm2 = require('pm2');

function finished(logs) {
  // exec("pm2 restart all");
  // console.log("PM2 restart All.",logs);
  pm2.connect(function(err){
    pm2.restart("all",function(err,proc){
      console.log("PM2 restart All.",logs);
      pm2.disconnect(function() { process.exit(0) });
    })
  })
}
function gitpull(pathname) { 
  console.log("cd "+pathname+" && git pull");
  exec("cd "+pathname+" && git pull",finished);
  // exec("cd /my/demo/douban && git pull");
  return true;
}
function routes(req,res) {
  var pathname = url.parse(req.url).pathname;
  if (req.method.toLowerCase()=="post") { 
    gitpull(pathname);
    console.log("Run git command.");
  }else{
    return "404";
  }
}
var req = http.createServer(function(req,res){
  res.writeHead(200, {'Content-Type': 'text/plain'}); 
  routes(req,res);
  console.log("someone coming here");
  res.end(); 
}).listen(port);
console.log("Node-Git-update start.");