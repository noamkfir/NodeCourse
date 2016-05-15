var exec = require('child_process').exec;

var child = exec("curl http://www.sport5.co.il", function(err, stdout, stderr) {
    if (err) throw(err);
    if (stderr) {
        console.log("Error: " + stderr);
    }

    console.log("output is :" + stdout);


});

console.log("child Pid is :" + child.pid);