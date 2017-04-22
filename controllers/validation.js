var rpromise = require('request-promise');

function validation(req, res) {
  validateAddress();

  if(validated) {
    // Send email
  }
  res.status(200).json({
    message: "Thank you for your application"
  });
}

function validateDOB() {

}

function validateMobile() {

}

function validateAddress() {
  var addressRequest = {
    uri: 'https://api.getAddress.io/v2/uk/' + postcode + '?api-key=' + process.env.API_KEY_GETADDRESS ,
    json: true
  };

  rpromise(addressRequest)
        .then(function(response) {

        })
        .catch(function(error) {

        });
}

module.exports = {
    validate: validation
};
