class Animal {
    constructor(name) {
        this.name = name;
        this.height = 0;
    }

    sound() {
        console.log('sound');
    }

    sayMyName() {
        console.log(this.name);
    }

    echo(...things) {
        console.log('things:', things);
        // var things = arguments;
        // if(things !== undefined && things instanceof Array) {
        //     for (var i = 0; i < things.length; i++) {
        for (var thing of things) {
            // console.log(things[i]);
            console.log(thing);
        }
        // }
    }

    stop() {

    }

    start() {
        return () =>
            this.stop()
        ;
    }
}

var animal = new Animal('rufus');
console.log(animal.name);
animal.sound();

animal.sayMyName.apply({});

var {name, height} = animal;
console.log('name:', name, 'height:', height);

var numbers = [1, 2, 3, 4, 5];
var [ head, ...tail ] = numbers;
console.log('head:', head, 'tail:', tail);

animal.echo('hello', 'world');
animal.echo();

// var more = Iter.from([1, 2, 3]);
// console.log('more:', more);


var url = 'http://....';
var port = 3000;

// var options = { url: url, port: port };
var options = {url, port};
// callFoo({ url, port });


// hoisting

function foo() {
    var i;
    var x;
    for (i = 0; i < 5; i++) {
        x = i;
        console.log(x);
    }
    console.log('last:', x);
}

function foo() {
    for (let i = 0; i < 5; i++) {
        // console.log(x);

        const x = i;
        // x = 5;
        console.log(x);
    }
    // console.log('last:', x);
}

foo();


function outer() {
    let name = 'noam';

    return function(newName) {
        name = newName;
        console.log(name);
    };
}

var inner = outer();
inner('one');
inner('two');





function outer2() {
    let name = 'noam';

    return (newName) => {
        name = newName;
        console.log(name);
    };
}

var inner2 = outer2();
inner2('one');
inner2('two');