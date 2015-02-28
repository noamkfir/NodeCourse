var express= require('express');
var taskService = require('../services/taskService');
var Task = taskService.Task;
var router = express.Router();

router.get('/:state?',function(req,res,next){

    var completed;
    if(req.params.state)
    {
        completed = req.params.state==='completed';
    }

    taskService.getTasks(completed,function gotTasks(err,tasks){
        res.send(tasks);
    });
});

router.put('/',function(req,res,next){

    taskService.createTask(req.body.id,req.body.title,function gotTasks(err,task){
        res.send(task);
    });
});

module.exports  = router;
