5
/*global jQuery, Handlebars */
jQuery(function($) {
    'use strict';

    Handlebars.registerHelper('eq', function(a, b, options) {
        return a === b ? options.fn(this) : options.inverse(this);
    });

    var ENTER_KEY = 13;
    var ESCAPE_KEY = 27;

    var util = {
        uuid: function() {
            /*jshint bitwise:false */
            var i, random;
            var uuid = '';

            for (i = 0; i < 32; i++) {
                random = Math.random() * 16 | 0;
                if (i === 8 || i === 12 || i === 16 || i === 20) {
                    uuid += '-';
                }
                uuid += (i === 12 ? 4 : (i === 16 ? (random & 3 | 8) : random)).toString(16);
            }

            return uuid;
        },
        pluralize: function(count, word) {
            return count === 1 ? word : word + 's';
        },
        store: function(namespace, task, callback) {

            var cb = arguments.length > 2 ? callback : task;

            if (arguments.length > 2) {

                $.ajax("/tasks", {
                    type: "PUT",
                    data: JSON.stringify(task),
                    headers: {
                        "Content-Type": "application/json"
                    }
                }).success(cb);
            }
            else {

                $.ajax("/tasks", {
                    type: "GET"
                }).success(cb);
                //cb(store);
            }
        },
        delete: function(namespace, _tasks, callback) {

            var params = {};
            if ($.isArray(_tasks)) {

                params.tasks = _tasks;
            }
            else {

                params.tasks = [_tasks];
            }

            $.ajax("/tasks", {
                type: "DELETE",
                data: JSON.stringify(params),
                headers: {
                    "Content-Type": "application/json"
                }
            }).success(callback);

        },
        update: function(namespace, _tasks, callback) {

            var params = {};
            if ($.isArray(_tasks)) {

                params.tasks = _tasks;
            }
            else {

                params.tasks = [_tasks]
            }

            $.ajax("/tasks", {
                type: "POST",
                data: JSON.stringify(params),
                headers: {
                    "Content-Type": "application/json"
                }
            }).success(callback)
        }
    };

    var App = {
        init: function() {
            var self = this;
            util.store('todos-jquery', function(data) {
                self.todos = data || [];
                self.cacheElements();
                self.bindEvents();

                Router({
                    '/:filter': function(filter) {
                        self.filter = filter;
                        self.render();
                    }.bind(self)
                }).init('/all');
            });


        },
        cacheElements: function() {
            this.todoTemplate = Handlebars.compile($('#todo-template').html());
            this.footerTemplate = Handlebars.compile($('#footer-template').html());
            this.$todoApp = $('#todoapp');
            this.$header = this.$todoApp.find('#header');
            this.$main = this.$todoApp.find('#main');
            this.$footer = this.$todoApp.find('#footer');
            this.$newTodo = this.$header.find('#new-todo');
            this.$toggleAll = this.$main.find('#toggle-all');
            this.$todoList = this.$main.find('#todo-list');
            this.$count = this.$footer.find('#todo-count');
            this.$clearBtn = this.$footer.find('#clear-completed');
        },
        bindEvents: function() {
            var list = this.$todoList;
            this.$newTodo.on('keyup', this.create.bind(this));
            this.$toggleAll.on('change', this.toggleAll.bind(this));
            this.$footer.on('click', '#clear-completed', this.destroyCompleted.bind(this));
            list.on('change', '.toggle', this.toggle.bind(this));
            list.on('dblclick', 'label', this.edit.bind(this));
            list.on('keyup', '.edit', this.editKeyup.bind(this));
            list.on('focusout', '.edit', this.update.bind(this));
            list.on('click', '.destroy', this.destroy.bind(this));
        },
        render: function() {
            var todos = this.getFilteredTodos();
            this.$todoList.html(this.todoTemplate(todos));
            this.$main.toggle(todos.length > 0);
            this.$toggleAll.prop('checked', this.getActiveTodos().length === 0);
            this.renderFooter();
            this.$newTodo.focus();
            //util.store('todos-jquery', this.todos);
        },
        renderFooter: function() {
            var todoCount = this.todos.length;
            var activeTodoCount = this.getActiveTodos().length;
            var template = this.footerTemplate({
                activeTodoCount: activeTodoCount,
                activeTodoWord: util.pluralize(activeTodoCount, 'item'),
                completedTodos: todoCount - activeTodoCount,
                filter: this.filter
            });

            this.$footer.toggle(todoCount > 0).html(template);
        },
        toggleAll: function(e) {
            var that = this;
            var isChecked = $(e.target).prop('checked');
            this.todos.forEach(function(todo) {
                todo.completed = isChecked;
            });

            util.update('todos-jquery', this.todos, function(data) {
                that.todos = data;
                that.render();
            });


            this.render();
        },
        getActiveTodos: function() {
            return this.todos.filter(function(todo) {
                return !todo.completed;
            });
        },
        getCompletedTodos: function() {
            return this.todos.filter(function(todo) {
                return todo.completed;
            });
        },
        getFilteredTodos: function() {
            if (this.filter === 'active') {
                return this.getActiveTodos();
            }

            if (this.filter === 'completed') {
                return this.getCompletedTodos();
            }

            return this.todos;
        },
        destroyCompleted: function() {
            var that = this;
            util.delete('todos-jquery', this.getCompletedTodos(), function(data) {
                that.todos = data;
                that.filter = 'all';
                that.render();
            });

        },
        // accepts an element from inside the `.item` div and
        // returns the corresponding index in the `todos` array
        indexFromEl: function(el) {
            var id = $(el).closest('li').data('id');
            var todos = this.todos;
            var i = todos.length;

            while (i--) {
                if (todos[i].id === id) {
                    return i;
                }
            }
        },
        create: function(e) {
            var $input = $(e.target);
            var val = $input.val().trim();

            if (e.which !== ENTER_KEY || !val) {
                return;
            }

            var task = {
                id: util.uuid(),
                title: val,
                completed: false
            };
            var self = this;
            util.store('todos-jquery', task, function(data) {
                self.todos.push(data);
                self.render();

            });


            $input.val('');


        },
        toggle: function(e) {
            var that = this;
            var i = this.indexFromEl(e.target);
            var task = $.extend({}, this.todos[i]);
            task.completed = !task.completed;
            util.update('todos-jquery', task, function(data) {
                that.todos = data;
                that.render();
            });
        },
        edit: function(e) {
            var $input = $(e.target).closest('li').addClass('editing').find('.edit');
            $input.val($input.val()).focus();
        },
        editKeyup: function(e) {
            if (e.which === ENTER_KEY) {
                e.target.blur();
            }

            if (e.which === ESCAPE_KEY) {
                $(e.target).data('abort', true).blur();
            }
        },
        update: function(e) {
            var el = e.target;
            var $el = $(el);
            var val = $el.val().trim();

            if ($el.data('abort')) {
                $el.data('abort', false);
                this.render();
                return;
            }

            var i = this.indexFromEl(el);
            var that = this;
            if (val) {
                this.todos[i].title = val;
                util.update('todos-jquery', this.todos[i], function(data) {
                    that.todos = data;
                    that.render();
                })
            }
            else {
                util.delete('todos-jquery', this.todos[i], function(data) {
                    that.todos = data;
                    that.render();
                });
            }


        },
        destroy: function(e) {
            var inx = this.indexFromEl(e.target)
            var that = this;
            util.delete('todos-jquery', this.todos[inx], function(data) {
                that.todos = data;
                that.render();
            });
        }
    };

    App.init();
});
