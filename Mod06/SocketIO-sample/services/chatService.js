var io = require("socket.io");

module.exports.init = function(server) {

    var Message = function(_type, _message, nick) {
        this.type = _type;
        this.message = _message;
        this.nickname = nick;
    }

    io = io(server);


    io.on("connection", function(socket) {
        socket.emit("newMessage", new Message("serverMessage"
            , "Welcome To incredible chat"));

        socket.on("newMessage", function(data) {
            data.nickname = socket.nickname;
            socket.broadcast.emit("newMessage", data);
            data.type = "myMessage";
            socket.emit("newMessage", data);
        })

        socket.on("set_name", function(data) {
            socket.nickname = data.nickname;
            socket.emit("name_set", new Message("serverMessage", "hi " + socket.nickname));
            socket.broadcast.emit("newMessage", new Message("serverMessage", socket.nickname + " has joined"));
        })
    });


}