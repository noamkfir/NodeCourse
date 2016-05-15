console.log('start reading files from console');

process.stdin.pipe(process.stdout);

// const fs = require('fs');
// fs.createReadStream(process.argv[2]).pipe(process.stdout);
