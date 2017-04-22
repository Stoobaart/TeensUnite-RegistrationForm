var express = require('express');
var bodyParser = require('body-parser');
var app = express();

// Make public components available to use
app.use(express.static('public'));

// Body parser for json data
app.use(bodyParser.json());

// Body parser
app.use(bodyParser.urlencoded({ extended: false }));

module.exports = app;
