var rpromise = require('request-promise');
var sendmail = require('sendmail')({
  silent: true
});

function validation(req, res) {
  console.log(req.body.postCode);
  var validated = validateAddress(req.body.postCode);
validated = true;
  console.log("Validated", validated);
  if(validated) {
    // Send email
    sendEmail(req.body);
  }

  res.status(200).json({
    message: "Thank you for your application"
  });
}

function validateDOB() {

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
          if(response.statusCode !== 404 && response.statusCode !== 400) return true;
          return false;
        })
        .catch(function(error) {
          return false;
        });
}

// Send the email to the relevant party
function sendEmail(formData) {

  sendmail({
    from: formData.email,
    to: 'chrisjtsoi.work@gmail.com',
    subject: 'Teen Sign Up Submission',
    html: "First Name:" + formData.firstName +
    "<br> Last Name:" + formData.lastName +
    "<br> Email:" + formData.email +
    "<br> Date of Birth:" + formData.dateOfBirth +
    "<br> Gender:" + formData.gender +
    "<br> Address:" + formData.address +
    "<br> Post Code:" + formData.postCode +
    "<br> Home Telephone:" + formData.homeTel +
    "<br> Mobile Telephone:" + formData.phoneTel +
    "<br> Parent/Carer Name:" + formData.parentCarerName +
    "<br> Parent/Carer Telephone:" + formData.parentCarerTel +
    "<br> Parent/Carer Email:" + formData.parentCarerEmail +
    "<br> Medical Condition:" + formData.medicalCondition +
    "<br> Hospitals Attended:" + formData.hospitalAttendedsPostCode +
    "<br> Special Requirements:" + formData.specialRequirements +
    "<br> Social Worker:" + formData.socialWorker +
    "<br> How Did You Head About Us:" + formData.howFind +
    "<br> Interests:" + formData.interests +
    "<br> Photo Release?:" + formData.photoRelease
  }, function(error, reply) {
    if(error) return false;
  });

  return true;
}

module.exports = {
    validate: validation
};
