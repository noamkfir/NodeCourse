(function(){

	var rootUrl = [document.location.protocol,"//",document.location.host,"/"].join('');
	var panel;
	var button;
	var nickModal;

	$(function(){

		panel=$("#chatPanel");

		nickModal=$(".modal").modal();
		nickModal.find("button").click(function(){
			var nick=nickModal.find('input').val();
			socket.emit("set_name",{nickname:nick});
		});

		var socket =io.connect(rootUrl+"/chatCom");
		var socketAdmin = io.connect(rootUrl + "/chatAdmin");

		socketAdmin.on("newMessage",function(data){
			displayMessage(data);
		});
		
		socket.on("newMessage",function(data){
			displayMessage(data);
		});

		socket.on("name_set",function(data){
			displayMessage(data);
			nickModal.modal('hide');
		});

		socket.on("user_joined",function(data){
			displayMessage(data);
		})

		$("#sendBtn").click(function(){
			var txt=$("#msgInput").val();
			socket.emit("newMessage",{type:"userMessage",message:txt});
		});


		


	});

	var displayMessage=function(msg){
			var style = "text-primary";
			var html=[];
	
			if(msg.type==="serverMessage"){
				style="text-info"
			}
			else if(msg.type==="myMessage")
			{
				style="text-muted";
			}
			else if(msg.type==="adminMessage"){
				style="text-warning";
			}
	
			html.push("<p class='" + style + "' >")
			if(msg.nickname){
				html.push(msg.nickname+ ": ");
			}
			html.push(msg.message);
			html.push("</p>");
	
			panel.append(html.join(''));
	}





}())