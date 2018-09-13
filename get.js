const http = require('http');

exports.get = function(url){
	return new Promise(function(success) {
	  return http.get(url, function(newres) {
	    var content, len;
	    content = [];
	    len = 0;
	    newres.on('data', function(chunk) {
	      content.push(chunk);
	      return len += chunk.length;
	    });
	    return newres.on('end', function() {
	      var data;
	      data = Buffer.concat(content, len);
	      return success(new Buffer(data).toString('UTF-8'));
	    });
	  });
	});
}