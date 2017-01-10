let express = require('express');
let formidable = require('formidable' );
let fs = require('fs')
let credentials = require('./credentials')// секрет куки
let router = express.Router();
let expressValidator;
expressValidator = require('express-validator');
let expressSession = require('express-session')
let app = express();

let nodemailer = require('nodemailer')

let mongoose = require('mongoose')
mongoose.Promise = global.Promise
mongoose.connect('localhost:27017/test')

app.use(require('cookie-parser')(credentials.cookieSecret));

app.use(expressSession({
	secret: credentials.cookieSecret,
	resave: false,
	saveUninitialized: false
}))

let Schema = mongoose.Schema;

let userDataSchema = new Schema(
	{
		name: String,
		pass: String,
		email: String,
		verifyLink: String,
		blogs: Array,
		verify: Boolean
	},
	{
		collection: 'users'
	}
)

let UserData = mongoose.model('UserData', userDataSchema)

//UserData.findOneAndRemove({name: 'admin'}).exec()

UserData.find((err, data) => {

	console.log(data)
	if (data.length) return
	new UserData({
		name: 'admin',
		pass: '1',
		email: 'String',
		verifyLink: 'String',
		verify: true,
		blogs: []
	}).save()
})




//UserData.findOneAndUpdate({name: 'admin'}, {pass: '1', verify: true}).exec()

/*	let data = {
		name: "admin",
		pass: '1',
		blogs: []
	}

	let users = new UserData(data)
	users.save()
	UserData.find()
		.then(doc => console.log(doc))
	*/


/*		let arr;
			UserData.find()
				.then(doc => { 
				doc.forEach((item, i) => {
				UserData.findByIdAndRemove(item.id).exec()
			})
		})

*/
let url = 'mongodb://localhost:27017/test';







app.use((req, res, next) => {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	res.header("Access-Control-Allow-Methods", "OPTIONS, HEAD, GET, PUT, DELETE, POST")
	next();
})



app.use(require('cookie-parser')(credentials.cookieSecret));

app.use(expressSession({
	secret: credentials.cookieSecret,
	resave: false,
	saveUninitialized: false
}))
app.use(require('body-parser').urlencoded({ extended: true }));

app.use(expressValidator());

app.use(express.static(__dirname + '/public'));

app.set('port', process.env.PORT || 3000);




app.get('/', (req, res) =>{
	res.set('Content-Type', 'text/html');
	fs.readFile(__dirname+'/index.html', (err, data) => {
		res.send(data)

	} )
}) 

app.get('/session', (req, res) => {
	console.log(req.session.userName)
	if (req.session.userName){
		UserData.find({name : req.session.userName}, (err, data) => {
			res.send(data)
		})
	}else res.send(false)
})

app.post('/verifyin', (req, res) => {
	UserData.find()
	.then(doc => {
		let success = false
		doc.forEach(item => {
			if (item.name == req.body.name && item.pass == req.body.pass && item.verify)
				success = true;
		})
		if (success) req.session.userName = req.body.name
			res.send(success)
	})
})

app.get('/signout', (req, res) => {
	if (req.session.userName) delete req.session.userName
		if (!req.session.userName) res.send(true)
			else res.send(false)
		})

app.post('/register', (req, res) => {
	req.checkBody({
		'email': {
			isEmail: {errorMessage: 'Invalid email'}
		},
		'pass': {
			isLength:{
				options: [{min:4, max:16}],
				errorMessage: 'password must be 4 and 16 chars long'
			},
			'equals':{
				options: req.body.cPass,
				errorMessage: 'passwords must be equals'
			}
		}
	})
	let pass = req.body.pass.trim()
	let error = /\s/g.test(pass);
	let errors = req.validationErrors()
	let register;
	if (errors === false && error === false) register = true
		else register = false
			res.send({
				password: error, 
				body:errors, 
				register
			})
		let link = 'http://localhost:3000/#/user/' + Math.random()
		if (register) {
			UserData.find((err, data) => {
				new UserData({
					name: req.body.name.
					trim(),
					pass: req.body.pass.trim(),
					email: req.body.email.trim(),
					verify: false,
					verifyLink:  link ,
					blogs: []
				}).save()
			})

			let transporter  = nodemailer.createTransport({
				host: 'smtp.mail.ru',
				port: 465,
				secure: true,
				auth: {
					user: 'wilix_send_mail',
					pass: 'qwerasdfzxcv'
				}
			})

			let mailOptions = {
				from: '"Fred Foo " <wilix_send_mail@mail.ru>',
				to: req.body.email.trim(), 
				subject: 'thank you for registration on our blog',
				text: 'you need to complite you registration by passing through ' + link
			}

			transporter.sendMail(mailOptions, (err, info) => {
				if (err) console.log(err)
					else console.log('Message sent' + info.response)
				})
		}
	})

app.put('/andOfReg', (req, res) => {
	console.log(req.body.url)
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




