

var path = require("path");


//Stuff to do(?)
// Create automatic routes for each topic post
// ^ That may be unnecessary 



module.exports = function (app) {
  app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/../public/main.html'));
  });




};    