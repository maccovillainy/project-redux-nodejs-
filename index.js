let express = require('express');
let formidable = require('formidable' );
let fs = require('fs')
let credentials = require('./credentials')// секрет куки
let router = express.Router();
let expressValidator;
expressValidator = require('express-validator');
let expressSession = require('express-session')
let app = express();
let multiparty = require('multiparty');
let nodemailer = require('nodemailer')
var formData = require("express-form-data");
const crypto = require('crypto');

const secret = 'aslkdjflksdfrwnelkfhs';
let link = 'http://localhost:3000/#/user/'


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

let blogsDataSchema = new Schema(
	{
		name: String,
		text: String,
		author: String,
		pic: String,
		date: String 
	},
	{
		collection: 'blogs'
	}
)

let UserData = mongoose.model('UserData', userDataSchema)
let BlogData = mongoose.model('BlogData', blogsDataSchema)

//UserData.findOneAndRemove({name: 'admin'}).exec()

UserData.find((err, data) => {

	//console.log(data)
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
//BlogData.find((err, data) => {console.log(data)})




//UserData.findOneAndUpdate({name: 'admin'}, {verifyLink: 'link'}).exec()

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


// parsing data with connect-multiparty. Result set on req.body and req.files
app.use(formData.parse({}));
// clear all empty files
app.use(formData.format());

// union body and files
app.use(formData.union());
app.use(expressValidator());

app.use(express.static(__dirname + '/public'));

app.set('port', process.env.PORT || 3000);



let date, reg;

app.post('/upload', (req, res) => {
	if(req.session.userName){

			var dateFormated = new Date();
			var options = {
			  year: 'numeric',
			  month: 'long',
			  day: 'numeric',
			  weekday: 'long',
			  hour: 'numeric',
			  minute: 'numeric',
			  second: 'numeric'
			};
			let name = req.body.name,
				text = req.body.text,
				date = dateFormated.toLocaleString("en-US", options),
				author = req.session.userName;
			req.checkBody({
				'name': {
					isLength:{
						options: [{min:5, max: 40}],
						errorMessage: 'Name must be 5 and 40 chars long'
					}
				},
				'text': {
					isLength:{
						options: [{min:50, max: 12000}],
						errorMessage: 'Text must be 50 and 12000 chars long'
					}
				}
			})

			let errors = req.validationErrors()
			if (!errors){
				BlogData.find({name: name}, (err, data) => {
					console.log(data)
					console.log(err)
					console.log('asasas')
					if(!data.length){

						if (req.body.image){
							if(/image\/*/.test(req.body.image.headers['content-type']) && req.body.image.size <= 20 * 1024 * 1024){
								date = new Date()
								reg = req.body.image.name.substr(req.body.image.name.lastIndexOf('.'))
								let pic = (+date)+reg;
								fs.rename(req.body.image.path, __dirname+'/public/img/'+(+date)+reg, (err, data)=> {
									new BlogData({name,text,date,author,pic}).save()
									let arr;
									UserData.find({name: author}, (err, doc)=> {
										arr = [...doc[0].blogs]
										arr.push(name)
										UserData.findOneAndUpdate({name: author}, {blogs: arr}).exec()
										res.send({errors:[],exist: false})
									})
								})
							}else{
								res.send({bul: false,msg:'Wrong image, max size: 20mb'})
							}
						}else{
							res.send({bul: false,msg:'have not image'})
						}
					}else res.send({errors:false, exist: true})
				})
			}else{
				res.send({errors, exist: false});
			}
		}
	})








// app.post('/upload', function(req, res, next){
// 	console.log(req.body)
// 	//res.send(req.body)
// 	if(req.session.userName){
// 		UserData.find({name: req.session.userName}, (err, data) => {
// 			if (data.length && req.body.image){
// 				if(/image\/*/.test(req.body.image.headers['content-type']) && req.body.image.size <= 20 * 1024 * 1024){
// 					 date = new Date()
// 					 reg = req.body.image.name.substr(req.body.image.name.lastIndexOf('.'))
// 					fs.rename(req.body.image.path, __dirname+'/public/img/'+(+date)+reg, (err, data)=> {
// 					})
// 					next()
// 				}else{
// 					res.send({bul: false,msg:'Wrong image, max size: 20mb'})
// 				}
// 			}
// 		})
// 	}else	res.send({bul: false,msg:'Please sign in'})
// });


/*apiR = express.router();

app.use('/apiv1/', apiR) 

apiR.get('/session', (req, res) => {
	if (req.session.userName){
		UserData.find({name : req.session.userName}, (err, data) => {
			res.send(data)
		})
	}else res.send(false)
})*/

app.get('/', (req, res) =>{
	res.set('Content-Type', 'text/html');
	fs.readFile(__dirname+'/index.html', (err, data) => {
		res.send(data)

	} )
}) 

app.get('/session', (req, res) => {
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
		'name': {
			matches:{
				options:	(/^[a-z]+?[a-z0-9]{4,}/i),
				errorMessage: 'Login must be a-z or 0-9, and beginign with a-z'
			},
			isLength:{
				options: [{min:5, max: 16}],
				errorMessage: 'login must be 5 and 16 chars long'
			}
		},
		'pass': {
			isLength:{
				options: [{min:4, max:16}],
				errorMessage: 'password must be 4 and 16 chars long'
			},
			matches:{
				options:(/[a-z0-9]/i),
				errorMassage:'password must be a-z 0-9'
			},
			'equals':{
				options: req.body.cPass,
				errorMessage: 'passwords must be equals'
			}
		}
	})
	let errors = req.validationErrors()
	if (!errors){
		UserData.find({name:req.body.name}, (err, data) => {
			if(data.length){
				res.send({type:false, msg: 'login exist'})
			}else{
				res.send({type:true, msg: 'Registration success! We send verify message on your e-mail, please go to verify link in this message'})
				const hash = crypto.createHmac('sha256',secret).update(req.body.name).digest('hex');
				UserData.find((err, data) => {
					new UserData({
						name: req.body.name.trim(),
						pass: req.body.pass.trim(),
						email: req.body.email.trim(),
						verify: false,
						verifyLink:  link + hash ,
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
					text: 'you need to complite you registration by passing through ' + link+hash
				}

				transporter.sendMail(mailOptions, (err, info) => {
					if (err) console.log(err)
						else console.log('Message sent' + info.response)
					})
			}
		})
	}else{
		console.log(errors)
		res.send({type: false, errors: errors})
	} 


})

app.put('/andOfReg', (req, res) => {

	UserData.find({verifyLink: `http://localhost:3000/#/user/${req.body.url}`}, (err, data) => {
		if (data.length && !data[0].verify){
		UserData.findOneAndUpdate({verifyLink: `http://localhost:3000/#/user/${req.body.url}`}, {verify: true}).exec()
		UserData.find({verifyLink: `http://localhost:3000/#/user/${req.body.url}`}, (err, d) => {
			res.send(d[0].verify)
		})
		}	
	})
})

app.post('/addnewblog', (req, res) => {
	if(req.session.userName){
		fs.readFile(__dirname+ '/public/img/'+req.body.pic, (err, data) => {
			if (err) {
				console.log(err)
				return
			}
			var dateFormated = new Date();
			var options = {
			  year: 'numeric',
			  month: 'long',
			  day: 'numeric',
			  weekday: 'long',
			  hour: 'numeric',
			  minute: 'numeric',
			  second: 'numeric'
			};
			let name = req.body.name,
			text = req.body.text,
			date = dateFormated.toLocaleString("en-US", options),
			pic = req.body.pic,
			author = req.session.userName;

			req.checkBody({
				'name': {
					isLength:{
						options: [{min:5, max: 40}],
						errorMessage: 'Name must be 5 and 40 chars long'
					}
				},
				'text': {
					isLength:{
						options: [{min:50, max: 12000}],
						errorMessage: 'Text must be 50 and 12000 chars long'
					}
				}
			})

			let errors = req.validationErrors()
			if (!errors){
				BlogData.find({name: name}, (err, data) => {
					if(!data.length){
						new BlogData({name,text,date,author,pic}).save()
						let arr;
						UserData.find({name: author}, (err, doc)=> {
							arr = [...doc[0].blogs]
							arr.push(name)
							UserData.findOneAndUpdate({name: author}, {blogs: arr}).exec()
							res.send({errors:[]})
						})
					}else res.send({errors:false, exist: true})
				})
			}else{
				res.send({errors});
			}
		})
	}
})

app.get('/getcontent', (req, res) => {
	BlogData.find((err, data) => {
		res.send(data)
	})
})

app.post('/getblog', (req, res) => {
	let name = req.body.name;
	console.log(name)
	BlogData.find({name: name},(err, data) => {
		res.send(data[0])
	})
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




