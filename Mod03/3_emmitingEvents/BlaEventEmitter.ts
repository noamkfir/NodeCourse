class BlaEventEmitter extends EventEmitter {
    private numbers = {};

    constructor(private innerEventEmitter: EventEmitter) {
        super();
    }

    onSomething(person: Person, callback) {
        innerEventEmitter.on('something', callback);
    }

    on(name: string, data: any) {
        if(!numbers.hasKey(name)) {
            numbers[name] = 0;
        }
        numbers[name]++;
    }

    emit(name, ...args) {

    }
}