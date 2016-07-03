const { EventEmitter } = require('events');

const e = new EventEmitter();

module.exports.notifier = e;

setInterval(() => e.emit('now', new Date()), 1000);
