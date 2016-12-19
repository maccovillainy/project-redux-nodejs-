let express = require('express');
var formidable = require('formidable' );
let fs = require('fs')
let credentials = require('./credentials')// секрет куки

let id = 4;

 function templ(name, pass, arr){
	this.id = ++id;
	this.name = name;
	this.pass = pass;
	this.authoris = false
	this.access = arr
}

let db = require('./db');


var app = express();

app.use(require('cookie-parser')(credentials.cookieSecret));
app.use(require('express-session')({
resave: false,
saveUninitialized: false,
secret: credentials.cookieSecret
}));
app.use(require('body-parser').urlencoded({ extended: true }));
// Установка механизма представления handlebars
var handlebars = require('express-handlebars')
	.create({ defaultLayout:'main' });
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');


app.use(express.static(__dirname + '/public'));

app.set('port', process.env.PORT || 8080);

app.post('/authoris', (req, res) => {
	let data = db.get(),
		sucsess = false,
		pass = req.body.pass,
		id,
		name = req.body.login.toLowerCase().trim();
	for (let user of data){
		if (user.name.toLowerCase().trim() === name && user.pass === pass ){
			sucsess = true;				
			id = user.id
		}
	}

	if (sucsess) {
		req.session.userId = id
		res.send(name)
	}else res.send(false) 
			
})

app.get('/', (req, res) => res.render('signUp'))

app.get('/cookie', (req, res) => {
	if (req.session.userId)
	res.send(db.get().filter(item => item.id == req.session.userId)[0].name)
	else res.send(false)
})

app.post('/post', (req, res) => {
	if(db.get().filter(item => item.id === req.session.userId)[0].access.indexOf('add') > -1){
		let arrayOfAccess = req.session.userId == 1 ? req.body.access : []
		db.set(new templ(req.body.name, req.body.pass, arrayOfAccess))
		res.send(db.get())
	}
})

app.delete('/delete', (req, res) => {
	if(db.get().filter(item => item.id === req.session.userId)[0].access.indexOf('delete') > -1){
		db.delete(+req.body.id)
		res.send(db.get())
	}
})
app.put('/put', (req, res) => {
	if(db.get().filter(item => item.id === req.session.userId)[0].access.indexOf('edit') > -1){
		db.put(req.body.name, +req.body.id)
		res.send(db.get())
	}
})

app.get('/signOut', (req, res) => {
	if (req.session.userId) {
		delete req.session.userId
		res.send(false)
	}
})

app.get('/get', (req, res) => {
	res.send(db.get())
})
// пользовательская страница 404
app.use(function(req, res){
res.type('text/plain');
res.status(404);
res.send(404);
});
// пользовательская страница 500
app.use(function(err, req, res, next){
console.error(err.stack);
res.type('text/plain');
res.status(500);
res.send(500);
});

app.listen(app.get('port'), function(){
console.log( 'Express запущен на http://localhost:' +
app.get('port') + '; нажмите Ctrl+C для завершения.' );
});