const http = require('http');
const https = require('https');
const url = require('url');
const exec = require("child_process").exec;
const querystring = require('querystring');
const port = 9997;
// const _URL = "http://47.96.29.129:9998"

exports.post = function(_URL) {
  let post_option = url.parse(_URL)
  post_option.method = "POST"
  post_data = querystring.stringify({
    'action_name': 'QR_LIMIT_SCENE'
  });

  post_option.headers = {
      'Content-Type' : 'application/x-www-form-urlencoded',
      'Content-Length' : post_data.length
  };

  let post_req = http.request(post_option,function(res){
    console.log(_URL+" post :",res.statusCode);
    res.setEncoding('utf8');
    res.on('data',function(chunk){
      console.log(chunk);
    });
  })
  post_req.write(post_data);
  post_req.end();
}