let express = require('express');
var formidable = require('formidable' );
let fs = require('fs')
let router = express.Router();
var app = express();

let mongoose = require('mongoose')

mongoose.connect('localhost:27017/test')

let Schema = mongoose.Schema;

var userDataSchema = new Schema({
	title: {
		type: String,
		required: true
	},
	content: String,
	author: String,
  id: String
},
{
	collection: 'user-data'
})

let UserData = mongoose.model('UserData', userDataSchema);

app.use(require('body-parser').urlencoded({ extended: true }));
// Установка механизма представления handlebars
var handlebars = require('express-handlebars')
	.create({ defaultLayout:'main' });
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');



app.use(express.static(__dirname + '/public'));

app.set('port', process.env.PORT || 3000);



app.get('/test', (req, res) => {

})




app.get('/', (req, res, next) =>{
	res.render('test')
}) 


app.get('/get-data', (req, res) => {
	UserData.find()
    .then(doc => res.render('test', {data: doc}))
})

app.post('/insert', (req, res) => {
	let data = {
		title: req.body.title,
		content: req.body.content,
		author: req.body.author
	}
  let users = new UserData(data)
  users.save()
	res.redirect(303, '/get-data')
})

app.post('/update', (req, res, next) => {
	let data = {
		title: req.body.title,
		content: req.body.content,
		author: req.body.author
	}
    let id = '586d872f552df8188407ecc4'
    UserData.findById(id, (err, doc) => {
      doc.title = data.title;
      doc.content = data.content;
      doc.author = data.author;
      doc.save();
    })
		res.redirect(303, '/get-data')
	
})

app.post('/delete', (req, res, next) => {

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




