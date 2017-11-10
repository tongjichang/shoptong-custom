var http=require('http');
fs=require('fs');
 urlutil=require('url');
 path=require('path');

http.createServer(function(request, response){

    var urlpath = urlutil.parse(request.url).pathname;

    var absPath = __dirname  + urlpath;
console.log(absPath);
    fs.readFile(absPath,function(err, data) {

        //if(err) throw err;
        console.log(data);
        response.write(data);
        response.end();
    });
}).listen(8888);