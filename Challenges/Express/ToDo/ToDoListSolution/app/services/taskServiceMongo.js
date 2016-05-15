var mongoose = require('mongoose');

var taskSchema = mongoose.Schema({
    id: String,
    title: String,
    completed: Boolean
});

var Task = mongoose.model("task", taskSchema)

mongoose.connect("mongodb://webuser:webuser@ds050077.mongolab.com:50077/tasks");
var _ = require('lodash');

module.exports.getTasks = function(completed, callback) {

    var onGetTasksDone = function(err, tasks) {
        if (err) return callback(err);
        return callback(null, tasks);
    }

    if (typeof(completed) !== "undefined") {
        return Task.find({completed: completed}, onGetTasksDone);
    }
    else {
        return Task.find(onGetTasksDone);

    }
};

module.exports.createTask = function(id, title, callback) {
    var task = new Task({id: id, title: title, completed: false});
    task.save(function onCreateTaskDone(err, tsk) {
        if (err) return callback(err);
        return callback(null, tsk);
    });

};

module.exports.deleteTasks = function(tasksToremove, callback) {
    if (_.isArray(tasksToremove)) {

        var tIds = _.map(tasksToremove, function(t) {
            return t.id
        });

        Task.where("id").in(tIds).remove(function(err) {
            if (err) return callback(err);
            return module.exports.getTasks(undefined, callback);
        });
    }


}


module.exports.update = function(_tasks, callback) {

    if (_.isArray(_tasks)) {

        _tasks.forEach(function(t) {
            Task.update({id: t.id}, t).exec();
        });

        process.nextTick(function() {
            return module.exports.getTasks(undefined, callback);
        })

    }

};
