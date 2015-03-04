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
        return callback(null,_.filter(tasks,{completed:completed}))
	}
	else{
        return callback(null,tasks);
	}
};

module.exports.createTask = function(id,title,callback){
    var task = new Task(id,title);
    tasks.push(task);
    callback(null,task);
};

module.exports.deleteTasks=function(tasksToremove,callback){
    if(_.isArray(tasksToremove)){
       tasks = _.filter(tasks,function(t){
           var inx= _.findIndex(tasksToremove,function(tr){
              return t.id===tr.id;
           });

           return inx<0;
       });
    }
    callback(null,tasks);
}


module.exports.update = function(_tasks,callback){

    _tasks.forEach(function(t){
        var inx=_.findIndex(tasks,{id: t.id});
        if(inx>=0){
            tasks[inx]=t;
        }
    });
    return callback(null,tasks);


};
