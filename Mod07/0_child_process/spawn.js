var spawn = require("child_process").spawn;

var curl= spawn("curl",['http://www.sport5.co.il']);
var grep  = spawn("grep",['<img']);

curl.stdout.pipe(grep.stdin);
grep.stdout.pipe(process.stdin);
