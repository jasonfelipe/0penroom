

var path = require("path");


//Stuff to do(?)
// 



module.exports = function (app) {
  app.get('/chat', function (req, res) {
    res.sendFile(path.join(__dirname + '/../public/chat.html'));;
  });

  app.get('/', function (req, res) {
    res.sendFile(path.join__dirname + '/../public/login.html')
  });



};