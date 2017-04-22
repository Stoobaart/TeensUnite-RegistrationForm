var express = require('express');
var bodyParser = require('body-parser');
var app = express();

// Make public components available
app.use(express.static('public'));

// Body parser for json data
app.use(bodyParser.json());

// Body parser
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/api", routes);

app.get('/', function(req, res){
  res.render('index.html.ejs');
});

module.exports = app;
