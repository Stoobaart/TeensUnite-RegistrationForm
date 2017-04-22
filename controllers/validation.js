var rpromise = require('request-promise');
var sendmail = require('sendmail')({
  silent: true
});

function validation(req, res) {
  var validatedDOB = validateDOB(req.body.dateOfBirth);

  var validatedAddress = false;

  validateAddress(req.body.postCode)
    .then(function(isValidated) {
      console.log(isValidated);
      validatedAddress = isValidated;
  });

  console.log("validatedDOB", validatedDOB);
  console.log("validatedAddress", validatedAddress);

  // Ensure the form matches the requirements to be taken seriously
  if(validatedDOB && validatedAddress) {
    // Send email
    sendEmail(req.body);
  }

  res.status(200).json({
    message: "Thank you for your application"
  });
}

// Validates the forms date of birth to ensure the user is eligible
function validateDOB(date) {
  var birthDate = new Date(date);
  var currentDate = new Date();
  var diff = currentDate - birthDate;
  var age = Math.floor(diff / (1000*60*60*24*365.25));

  // Verify the user is within the required age range
  if(13 < age < 24) return true;
  else return false;
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
  return rpromise(addressRequest)
    .then(function(response) {
      console.log(response.statusCode);
      if(response.statusCode === 200) return true;
    })
    .catch(function(error) {
      console.log(error);
      return false;
    });
}

// Send the email to the relevant party
function sendEmail(formData) {
  // The email data that will be sent
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
