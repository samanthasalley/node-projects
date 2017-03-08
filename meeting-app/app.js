var bodyParser	= require('body-parser'),
	controller	= require('./api/controllers/user.controller');
	mongoose	= require('mongoose'),
	express		= require('express'),
	app			= express(),
	path		= require('path'),
	port		= 8080,
	db			= 'mongodb://localhost/loginapp';

mongoose.connect(db);

app.use(express.static(path.join(__dirname, 'views')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended:true
}));


app.get('/', function(req, res){
	res.render('index.html');
});

app.post('/', controller.register);


app.listen(port, function(){
	console.log('app listening on port: ' + port);
});