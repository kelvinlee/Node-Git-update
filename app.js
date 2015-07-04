var http = require('http');
var url = require('url');
var exec = require("child_process").exec;
var port = 9998;
var pm2 = require('pm2');
var Gpath = "";

function gitpull(pathname) { 
  console.log("cd "+pathname+" && git pull");
  exec("cd "+pathname+" && git pull",finished);
  // exec("cd /my/demo/douban && git pull");
  return true;
}
function finished() {
	pm2.connect(function(err){
    pm2.restart("all",function(err,proc){
      console.log("PM2 restart All.");
      pm2.disconnect(function() { process.exit(0) });
    })
  })
}
function init() {
	gitpull("/my/insurance-quote")
}

init()