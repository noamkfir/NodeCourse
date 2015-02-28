//var mongoose=require('mongoose');
//
//var taskSchema=mongoose.Schema({
//	id:String,
//	title:String,
//	completed:Boolean
//});
//
//var Task = mongoose.model("task",taskSchema)
//
//mongoose.connect("mongodb://webuser:123456@linus.mongohq.com:10018/NodeSample_MyUsers");
var _ = require('lodash');
var Task=function(id,title){
    this.id=id;
    this.title=title;
    this.completed=false;
}
var tasks=[];

module.exports.getTasks = function(completed,callback){

	var onGetTasksDone = function(err,tasks){
	 	if(err) return callback(err);
	 	return callback(null,tasks);
	}

	if(typeof(completed)!=="undefined"){
		//Task.find({completed:completed},onGetTasksDone);
        return callback(null,_.filter(tasks,{completed:completed}))
	}
	else{
		//Task.find(onGetTasksDone);
        return callback(null,tasks);
	}
};

module.exports.createTask = function(id,title,callback){
    var task = new Task(id,title);
    //task.save(function onCreateTaskDone(err,tsk){
	// 	if(err) return callback(err);
	// 	return callback(null,tsk);
	//});
    tasks.push(task);
    callback(null,task);
};

module.exports.deleteTasks=function(tasksToremove,callback){
    if(_.isArray(tasksToremove)){
       tasks = _.difference(tasks,tasksToremove);
    }
    callback(null,tasks);
}


module.exports.setTaskCompleted = function(id,callback){

    var task=_.find(tasks,{id:id});
    if(task){
        task.completed=true;
        return callback(null,task);
    }
    else{
        return callback(new Error("couldn't find task"));
    }
    //Task.findOneAndUpdate({id:id},{completed:true},function onSetTaskCompleted(err,task){
    //    if(err){
    //        return callback(err);
    //    }
    //    return callback(null,task);
    //})

};
