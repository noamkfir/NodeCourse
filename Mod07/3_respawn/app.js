var cluster = require('cluster');
var http = require('http');
var colors = require('colors');
var numCPUs = require('os').cpus().length;

if(cluster.isMaster){
	for(var i=0; i< numCPUs; i++){
		cluster.fork();
	}

	cluster.on("listening",function(worker,address){
		console.log( ('worker ' + worker.process.pid + ' is listening on ' + address.address + ':' + address.port).green);
	});

	cluster.on("exit",function(worker){
		console.log( ('worker ' + worker.process.pid + ' has exited respawning a new one').red);
		cluster.fork();
	});

}
else{
	http.createServer(function(req,res){
		res.writeHead(200,{connection:"close"});
		res.end('worker ' + cluster.worker.process.pid + 'returned the result \n');
		var rand = Math.floor((Math.random() * 10) + 1);
		if(rand%2===0){
			process.exit(1);
		}
	}).listen(8000);
}