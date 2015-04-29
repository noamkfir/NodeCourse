(function(){

	var rootUrl = [document.location.protocol,"//",document.location.host,"/"].join('');
	var panel;
	var button;
	var nickModal;

	$(function(){

		panel=$("#chatPanel");

		var socket=io.connect(rootUrl);

		$("#sendBtn").click(function(){
			var txt=$("#msgInput").val();
			socket.emit("newMessage",{
				type:"userMessage",
				message:txt
			});
		});

		nickModal=$(".modal").modal();
		nickModal.find("button").click(function(){
			var nick=nickModal.find('input').val();
			socket.emit("set_name",{nickname:nick});
		});

		socket.on("newMessage",function(data){
			displayMessage(data);
		});

		socket.on("name_set",function(data){
			nickModal.modal('hide');
			displayMessage(data);
		})

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