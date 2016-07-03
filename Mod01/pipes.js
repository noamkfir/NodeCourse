const http = require('http');
const zlib = require('zlib');

const server = http.createServer(handleRequests);

server.listen(3000);

const options = {
    host: 'api.worldbank.org',
    path: '/countries',
    method: 'GET'
};

function handleRequests(req, res) {

    http.get(options, (response) => {
        // // function() -> this == local function
        // // => -> this == handleRequests

        // var str = '';
        // response.on('data', function(chunk) {
        //     console.log(chunk);
        //     str += chunk;
        // });
        // response.on('end', function() {
        //     console.log(str);
        //     res.end(str);
        // });

        // console.log(response.headers);

        // res.writeHead(response.rawHeaders);
        // res.writeHeader({'Content-Type': 'text/xml'});
        response.pipe(zlib.createGunzip()).pipe(res);
    });

}