var express = require('express');
var bodyParser = require('body-parser');

var routes = require('./config/routes');

var app = express();

// Make public components available to use
app.use(express.static('public'));

// Body parser for json data
app.use(bodyParser.json());

// Body parser
app.use(bodyParser.urlencoded({ extended: false }));

// Add the router
app.use(routes);

// Start server
app.listen(process.env.PORT || 3000, function() {
    console.log("Server Started. Listening on port 3000");
});

module.exports = app;
