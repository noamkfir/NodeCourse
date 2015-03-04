# ToDo List Challenge

In this challenge you will create a simple ToDo List web application that interacts with an ExpressJS backend.

inside [/ToDoListChallenge/app](https://github.com/noynir/NodeCourse/tree/master/Challenges/Express/ToDo/ToDoListChallenge/app) you'll find a small skeleton for an ExpressJs application.
in this skeleton you will need to use and refactor the following files
   * [/app.js]() - the root of the ExpressJS application
   * [/views/index.html]() - this is the html for the main view.
   * [/views/index.jade]() - this will be the main view of the application.
   * [/services/tasks]() - a service that provides all the logic for managing the ToDo List.
   * [/public/javascripts/app.js]()  - this the main client side javascript file where the application logic is implemented.

This challenge is divided to x steps.

1. Create an express application, that listens on port 3000 with a single route for the application's Root.
   The route should return a "hello world" message as the response.

2. Create a new express Router on a separate module.
   The router should contain a route for "/tasks" and return a JSON response with an array of random values.

3.  **Jade**
    1. Open the [/views/index.html]() file and convert all the content                inside the 
    >Convert This part in index.jade file 
    
        comment to jade syntax inside the [/views/index.jade]() file.
    2.  in the head element of the page include links to the .CSS files inside the "public/stylesheets" folder
    3.  Change the route created in section 1 to return the index.jade view.
    
4. **CRUD**
    1. inside [/public/javascripts/app.js]() go to the util object.
    2. util.store - this function is used to get and create tasks.
                ```
                store: function (namespace,task,callback) {
                    var cb = arguments.length > 2 ? callback : task;
                    if (arguments.length > 2) {
                        $.ajax("/tasks",{
                            type:"PUT",
                            data:JSON.stringify(task),
                            headers:{
                                "Content-Type":"application/json"
                            }
                        }).success(cb);
                    }
                    else{
                        $.ajax("/tasks",{
                            type:"GET"
                        }).success(cb);
                        //cb(store);
                    }
                }
                ```
    inside the router created in section 2 create the routes for the ajax calls in the above method. your api should follow RESTful conventions i.e
GET for fecthing, PUT for create, POST for update and DELETE for remove.
your api endpoints should use the service defined in [/services/tasks]() for the appropriate methods.

    3. Create an api endpoint for the util.update method:
    		```
    		update: function(namespace,_tasks,callback){
                var params={};
    			if($.isArray(_tasks)){
                    params.tasks=_tasks;
    			}
    			else{
                    params.tasks=[_tasks]
    			}
                $.ajax("/tasks",{
                    type:"POST",
                    data:JSON.stringify(params),
                    headers:{
                        "Content-Type":"application/json"
                    }
                }).success(callback)
    		}
    		```
	
    4.  create an api endpoint for the util.delete method:
            ```
            delete: function(namespace,_tasks,callback){
                var params ={};
                if($.isArray(_tasks)){
                    params.tasks=_tasks;
                }
                else{
                    params.tasks=[_tasks];
                }
                $.ajax("/tasks",{
                    type:"DELETE",
                    data:JSON.stringify(params),
                    headers:{
                        "Content-Type":"application/json"
                    }
                }).success(callback);
            }
            ```

5. **Mongoose** - rewrite the entire task service to use [Mongoose](http://mongoosejs.com/) and connect to a MongoDB instance. 
you can create a MongoDB instance in [MongoLab](https://mongolab.com)