var io  = require("socket.io");

module.exports.init=function(server){

	var Message = function(_type,_message,nick){
		this.type=_type;
		this.message = _message;
		this.nickname = nick;
	}
	


}