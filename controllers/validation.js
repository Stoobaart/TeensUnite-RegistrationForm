var rpromise = require('request-promise');

function validation(req, res) {
  console.log(req.body.postCode);
  var validated = validateAddress(req.body.postCode);

  console.log("Validated", validated);
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

// Validates the forms address to ensure it is valid and within the UK
function validateAddress(postcode) {
  // Ensure postcode matches UK postcode format
  if(!postcode.match(/(GIR 0AA)|((([ABCDEFGHIJKLMNOPRSTUWYZ][0-9][0-9]?)|(([ABCDEFGHIJKLMNOPRSTUWYZ][ABCDEFGHKLMNOPQRSTUVWXY][0-9][0-9]?)|(([ABCDEFGHIJKLMNOPRSTUWYZ][0-9][ABCDEFGHJKSTUW])|([ABCDEFGHIJKLMNOPRSTUWYZ][ABCDEFGHKLMNOPQRSTUVWXY][0-9][ABEHMNPRVWXY])))) [0-9][ABDEFGHJLNPQRSTUWXYZ]{2})/g
)) return false;

  // Set request to send to the getAddress API
  var addressRequest = {
    uri: 'https://api.getAddress.io/v2/uk/' + postcode + '?api-key=' + process.env.API_KEY_GETADDRESS,
    json: true,
    resolveWithFullResponse: true
  };

  // Send request
  rpromise(addressRequest)
        .then(function(response) {
          console.log(response);
          if(response.statusCode !== 404 && response.statusCode!== 400) return true;
          return false;
        })
        .catch(function(error) {
          return false;
        });
}

module.exports = {
    validate: validation
};
