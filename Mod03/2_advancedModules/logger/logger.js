var colors = require('colors');
console.log(("loading colors from:" + require.resolve('colors')).blue);
var prefix = '!----->';

exports.log = function(msg) {
    console.log(format(msg).green);
}

exports.err = function(msg) {
    console.log(format(msg).red);
}

function format(msg) {
    return new Date().getTime() + global.prefix + msg;
}
