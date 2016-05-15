var start = Date.now();
// console.log('start: ' + start);

    for(var i =0;i < 5000000000; i++){
    }
setTimeout(function() {
    console.log('Going once: ' + (Date.now() - start));
}, 1000);

setTimeout(function() {
    console.log('Going twice: ' + (Date.now() - start));
}, 2000);
