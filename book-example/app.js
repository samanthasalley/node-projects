var express		= require('express'),
	app			= express(),
	bodyParser	= require('body-parser'),
	mongoose	= require('mongoose'),
	Book		= require('./api/models/book.model'),
	port		= 8080,
	db			= 'mongodb://localhost/project1';

mongoose.connect(db);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended:true
}));

app.get('/', function(req, res){
	res.send('happy to be here');
});

app.get('/books', function(req, res){
	console.log('getting all books');
	Book
		.find({})
		.exec(function(err, books){
			if(err){
				res.send('err has occured');
			}else{
				console.log(books);
				res.json(books);
			}
		});
});

app.get('/books/:id', function(req, res){
	console.log('getting one books');
	Book
		.findOne({
			_id: req.params.id
		})
		.exec(function(err, book){
			if(err){
				res.send('err has occured');
			}else{
				console.log(book);
				res.json(book);
			}
		});
});

app.post('/books', function(req, res){
	console.log('adding new book');
	var newBook = new Book();
		newBook.title = req.body.title;
		newBook.author = req.body.author;
		newBook.category = req.body.category;
	newBook
		.save(function(err, book){
			if(err){
				res.send('err adding book');
			}else{
				console.log(book);
				res.send(book);
			}
		});
});

app.put('/books/:id', function(req, res){
	console.log('updating one book');
	Book
		.findOneAndUpdate({
			_id: req.params.id
		},{
			$set: {
				title: req.body.title,
				author: req.body.author,
				category: req.body.category
			}
		},{
			upsert:true
		},function(err, newBook){
			if(err){
				res.send('err has occured');
			}else{
				console.log(newBook);
				res.send(newBook);
			}
		});
});

app.delete('/books/:id', function(req, res){
	console.log('getting one books');
	Book
		.findOneAndRemove({
			_id: req.params.id
		})
		.exec(function(err, book){
			if(err){
				res.send('err deleting');
			}else{
				console.log(book);
				res.send(book);
			}
		});
});



app.listen(port, function(){
	console.log('app listening on port: ' + port);
});