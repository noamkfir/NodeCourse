const User = require('./User');

class UserService {
    constructor() {
        this.userRouter = [];
    }

    authenticate({ email, password }, callback) {
        const result = email && password && !!this.users.filter((user) => user.email === email && user.password === password)[0];
        callback(result);
    }

    register({ email, password }, callback) {
        let result = false;

        if(email && password) {
            const user = new User(email, password);
            this.users.push(user);
            result = true;
        }
        callback(result);
    }
}

const userService = new UserService();

module.exports = userService;
