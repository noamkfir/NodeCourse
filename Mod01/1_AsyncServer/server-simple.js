var http = require('http');

function handleRequests(res) {
    console.log('a request has come in');
    res.end();
}

var server = http.createServer(handleRequests);

server.listen(3000);