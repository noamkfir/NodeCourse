/*
Create a simple node application which receives a full file path
  and prints its content to the console. The application should
  validate that the file exists and check if the path is a
  directory. A different message should be shown for each case.
 */
var fs = require('fs');

var filePath = process.argv[2];


fs.stat(filePath, function(err, stats) {
    if (err) {
        return console.log("File not found");
    }
    if (stats.isDirectory()) {
        return console.log("No file in path");
    }

    var stream = fs.createReadStream(filePath, 'utf8');

    stream.pipe(process.stdin);

});


