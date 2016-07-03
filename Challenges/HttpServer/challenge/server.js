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

// request handler function
var reqHandler = function(req, res) {

    // you will need the url module here to parse the request url
    var uri;

    // use the path module and process global object to build the physical path from the uri
    var filePath;

    /*
     after parsing and building the requested file path,
     use the fs module to determine if the file exists
     and write its content to the response stream
     */


    return;

};

// use the http module to create a server and start listening
