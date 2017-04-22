// Show the web page
function index(req, res) {
  res.render('../index.html');
}

module.exports = {
    index: index
};
