var fs = require('fs');
var start = Date.now();

console.log('start reading file');

var f = fs.readFileSync(process.argv[2], 'utf-8');
console.log(f);

console.log('done reading file after ' + (Date.now() - start));
