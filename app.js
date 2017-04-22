var ejs            = require('ejs');
var express        = require('express');
var bodyParser 	   = require('body-parser');
var mongoose       = require('mongoose');
var routes 	 	   = require('./config/routes');
var layouts		   = require('express-ejs-layouts');
var app            = express();

app.use(express.static('public'));

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/takeOneDb');
app.set('view engine', ejs);


// body parser for json data
app.use(bodyParser.json());

//body parser
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/api", routes);

app.get('/', function(req, res){
  res.render('index.html.ejs')
});

module.exports = app;

app.listen(process.env.PORT || 3000);