var io  = require("socket.io");

module.exports.init=function(server){

	var Message = function(_type,_message,nick){
		this.type=_type;
		this.message = _message;
		this.nickname = nick;
	}
	io = io(server);
	
	var chatCom=io.of("/chatCom");
	var chatAdmin=io.of("/chatAdmin");


	chatAdmin.on("connection",function(socket){
		setInterval(function(){
			socket.emit("newMessage",new Message("adminMessage","this is an admin message","chatAdmin"));
		}, 5000);

	});

	chatCom.on("connection",function(socket){

		socket.emit("newMessage",new Message("serverMessage","Welcome to incrediable chat"));

		socket.on("newMessage",function(data){

			data.nickname=socket.nickname;
			socket.broadcast.emit("newMessage",data);
			data.type="myMessage";

			socket.emit("newMessage",data);

		});

		socket.on("set_name",function(data){

			socket.nickname=data.nickname;

			socket.emit("name_set",new Message("serverMessage","Hi "+socket.nickname,socket.nickname))
			socket.broadcast.emit("user_joined",new Message("serverMessage",socket.nickname + ' has joined'));
		});

	});

	


	


}