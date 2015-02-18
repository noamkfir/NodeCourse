var io  = require("socket.io");

module.exports.init=function(server){

	var Message = function(_type,_message,nick){
		this.type=_type;
		this.message = _message;
		this.nickname = nick;
	}

	io = io(server);


	var chatAdmin=io.of("/chatAdmin");
	chatAdmin.on('connection',function(socket){
		setInterval(function(){
			socket.emit("newMessage",new Message("adminMessage","This is an admin message"));
		}, 5*1000)
	});

	var chatCom = io.of("/chatCom");
	chatCom.on('connection',function(socket){

		socket.emit("newMessage",new Message("serverMessage","Welcome to incrediable chat"));

		socket.on("newMessage",function(message){

			message.nickname = socket.nickname;
			socket.broadcast.emit("newMessage",message);
			message.type="myMessage";
			socket.emit("newMessage",message);

		});

		socket.on("set_name",function(data){
			socket.nickname=data.nickname;
			socket.emit("name_set",new Message("serverMessage","Hi "+socket.nickname,socket.nickname));
			socket.broadcast.emit("user_joined",new Message("serverMessage",socket.nickname+" Has joined"));

		});

	});



}