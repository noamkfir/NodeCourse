var express = require('express');
var taskService = require('../services/taskService');
var Task = taskService.Task;
var router = express.Router();

router.route("/")
    .get(function(req, res, next) {
        var completed;
        if (req.params.state) {
            completed = req.params.state === 'completed';
        }

        taskService.getTasks(completed, function gotTasks(err, tasks) {
            res.send(tasks);
        });
    })
    .put(function(req, res, next) {
        taskService.createTask(req.body.id, req.body.title, function gotTasks(err, task) {
            res.send(task);
        });
    })
    .post(function(req, res, next) {
        taskService.update(req.body.tasks, function(err, tasks) {
            res.send(tasks);
        });
    })
    .delete(function(req, res) {
        taskService.deleteTasks(req.body.tasks, function tasksDeleted(err, tasks) {
            res.send(tasks);
        });
    });

module.exports = router;
