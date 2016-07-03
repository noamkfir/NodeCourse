const { EventEmitter } = require('events');

module.exports.bla = function() {

    const e = new EventEmitter();

    setTimeout(function() {
        e.emit('data', 'some data', 1, true);
    }, 1000);

    setTimeout(function() {
        e.emit('nodata', 'no data');
    }, 2000);

    return (e);

};
