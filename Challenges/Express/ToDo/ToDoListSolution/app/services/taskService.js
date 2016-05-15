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
var Task = function(id, title) {
    this.id = id;
    this.title = title;
    this.completed = false;
}
var tasks = [];

module.exports.getTasks = function(completed, callback) {

    var onGetTasksDone = function(err, tasks) {
        if (err) return callback(err);
        return callback(null, tasks);
    }

    if (typeof(completed) !== "undefined") {
        //Task.find({completed:completed},onGetTasksDone);
        return callback(null, _.filter(tasks, {completed: completed}))
    }
    else {
        //Task.find(onGetTasksDone);
        return callback(null, tasks);
    }
};

module.exports.createTask = function(id, title, callback) {
    var task = new Task(id, title);
    //task.save(function onCreateTaskDone(err,tsk){
    // 	if(err) return callback(err);
    // 	return callback(null,tsk);
    //});
    tasks.push(task);
    callback(null, task);
};

module.exports.deleteTasks = function(tasksToremove, callback) {
    if (_.isArray(tasksToremove)) {
        tasks = _.filter(tasks, function(t) {
            var inx = _.findIndex(tasksToremove, function(tr) {
                return t.id === tr.id;
            });

            return inx < 0;
        });
    }
    callback(null, tasks);
}


module.exports.update = function(_tasks, callback) {

    _tasks.forEach(function(t) {
        var inx = _.findIndex(tasks, {id: t.id});
        if (inx >= 0) {
            tasks[inx] = t;
        }
    });
    return callback(null, tasks);


    //Task.findOneAndUpdate({id:id},{completed:true},function onSetTaskCompleted(err,task){
    //    if(err){
    //        return callback(err);
    //    }
    //    return callback(null,task);
    //})

};
