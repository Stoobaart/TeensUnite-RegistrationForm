var express = require('express');
var router = express.Router();

var servePageController = require('../controllers/servePage');
var validationController = require('../controllers/validation');

// Serve the form page
router.route('/')
    .get(servePageController.index);

// Validate the form data to ensure the user is a valid candidate
router.route('/validate')
    .post(validationController.validate);

module.exports = router;
