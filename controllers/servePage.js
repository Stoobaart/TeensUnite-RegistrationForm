// Show the web page
function index(req, res) {
  res.sendFile(__dirname + '/index.html');
}

module.exports = {
    index: index
};
