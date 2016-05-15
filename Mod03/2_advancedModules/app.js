var logger = require('./logger/logger');
console.log(("loading colors from:" + require.resolve('colors')).grey);

logger.log('all good');

setTimeout(function() {
    logger.log('going twice');
}, 1000);

setTimeout(function() {
    logger.err('error');
}, 2000);


console.log(logger.prefix);