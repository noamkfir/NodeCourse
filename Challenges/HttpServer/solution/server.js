/*
 Build a simple HTTP static file server.
 The server should accept an HTTP request and serve the file with an appropriate mime type.
 If the file doesn't exist return 404.
 Use only core nodejs modules.
 */

/*
 These are the modules you need.
 Go to their documentation and learn how to use them.
 */
var fs = require('fs');
var http = require('http');
var path = require('path');
var url = require('url');
/***********************************/

var mimeTypes = {
    ".html": "text/html",
    ".jpeg": "image/jpeg",
    ".jpg": "image/jpeg",
    ".png": "image/png",
    ".js": "text/javascript",
    ".css": "text/css"
};


var reqHandler = function(req, res) {
    console.log(req.path);
    console.log(process.cwd());
    var uri = url.parse(req.url);
    var filepath = path.join(process.cwd(), uri.pathname);

    var fileExt = path.extname(filepath);
    var mimeType = fileExt.length > 1 ? mimeTypes[fileExt] : "text/plain";


    var stream = fs.createReadStream(filepath);
    res.writeHead(200, {'Content-Type': mimeType});

    stream.on('error', function(err) {
        res.writeHead(404);
        res.write("Whoops.. file not found.");
        res.end();
        return;
    });

    stream.pipe(res);

    return;

};

var server = http.createServer(reqHandler);

server.listen('3000');
