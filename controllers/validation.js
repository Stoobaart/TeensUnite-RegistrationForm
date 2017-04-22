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

}

module.exports = {
    validate: validation
};
