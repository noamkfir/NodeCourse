/*
Create a simple node application which receives a full file path
  and prints its content to the console. The application should
  validate that the file exists and check if the path is a
  directory. A different message should be shown for each case.
 */
const fs = require('fs');

const path = process.argv[2];

fs.stat(path, (err, stats) => {

    if(err) {
        console.error('File not found:', err);
        return;
    }

    if(stats.isDirectory()) {
        console.error('The path is a directory');
        return;
    }

    const stream = fs.createReadStream(path, 'utf-8');
    stream.pipe(process.stdout);

});
