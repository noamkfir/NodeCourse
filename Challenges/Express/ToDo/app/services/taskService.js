var mongoose=require('mongoose');

var taskSchema=mongoose.Schema({
	id:String,
	title:String,
	completed:Boolean
});

var Task = mongoose.model("task",taskSchema)


mongoose.connect("mongodb://webuser:123456@linus.mongohq.com:10018/NodeSample_MyUsers");

module.exports.getTasks = function(completed,callback){

	var onGetTasksDone = function(err,tasks){
	 	if(err) return callback(err);
	 	return callback(null,tasks);
	}

	if(typeof(completed)==="undefined"){
		Task.find({completed:completed},onGetTasksDone);
	}
	else{
		Task.find(onGetTasksDone);
	}
};

module.exports.createTask = function(id,title,callback){
	var task = new Task({id:id,title:title,completed:false});
	task.save(function onCreateTaskDone(err,tsk,callback){
	 	if(err) return callback(err);
	 	return callback(null,tsk);
	});
};


module.exports.setTaskCompleted = function(id,callback){

	Task.findOne({id:id},onSetTaskCompleted)
	task.save(function(err,tsk){
		if(err){
			return callback(err);
		}

		return callback(null,tsk);
	});
};

var onSetTaskCompleted=function(err,tsk,callback){
 	if(err) return callback(err);
 	return callback(null,tsk);
}





