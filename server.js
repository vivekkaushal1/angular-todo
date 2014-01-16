var express = require('express')
var app = express();
var mongoose = require('mongoose');

mongoose.connect('mongodb://node:node@mongo.onmodulus.net:27017/uw03mypu');

app.configure(function() { 
	app.use(express.static('/public'));
	app.use(express.logger('dev'));
	app.use(express.bodyParser());
	app.use(express.methodOverride());
});

//define model
var Todo = mongoose.model('Todo', {
	text : String
});

//routes
	//api
	//get all todos
	app.get('/api/todos', function(req, res) {
		Todo.find(function(err, todos) {
			if (err)
				res.send(err)

			res.json(todos);
		});
	});

	//post all todos
	app.post('/api/todos', function(req, res) {

		Todo.create({
			text : req.body.text,
			done : false
		}, function(err, todo) {
			if (err)
				res.send(err);

			Todo.find(function(err, todos) {
				if (err)
					res.send(err)
				res.json(todos);
			});
		});
	});

	//delete todo on id
	app.delete('/api/todos/:todo_id', function(req, res) {
		Todo.remove({
			_id : req.params.todo_id
		}, function(err, todo) {
			if (err)
				res.send(err);

			Todo.find(function(err, todos) {
				if (err)
					res.send(err)
				res.json(todos);
			});
		});
	});

	//application
	app.get('*', function(req, res) {
		res.sendfile('./public/index.html');
	});

app.listen(8080);
console.log("App listening on port 8080");