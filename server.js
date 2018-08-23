//THE SERVER IS THE BACKEND CODE!

//THE DEPENENCIES
const express = require("express");
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 3000;

//Sets up express
const app = express();

//Socket IO 
const http = require('http').Server(app);
const io = require('socket.io')(http);
const db = require("./models");
//===============================
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// parse application/json
app.use(bodyParser.json());


//To get rid of the MIME type garbage. 
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/controllers'));



//---------ROUTES---------
require("./routes/html-routes.js")(app);
require("./routes/api-routes.js")(app);




//-------SOCKET IO CODE--------

//connection to server. The Callback function
io.on('connection', function (socket) {


  let socketId = socket.id

  socket.on('login', function (username) {
    socket.username = username
    socket.room = 'Main'
    socket.join('Main', function () {
      console.log('\n' + socket.username + ' joined Main\n')
    });

  });

  //Server receiving the submitted data, and doing something
  //with it. In this case it's emitting it out.
  socket.on('sendchat', function (data) {
    console.log('\nThe Data in Server (server.js) Username:' + socket.username + ' Data: ' + data + ' Room Name: ' + socket.room + "\n");
    io.to(socket.room).emit('updatechat', socket.username, data);
  });

  //Server receiving who is typing and then sending the data out.
  socket.on('typing', function (data) {
    //Socket syntax. This 'broadcast' puts a message to all users.
    socket.broadcast.to(socket.room).emit('typing', data);
  });

  //Code for switching rooms.
  socket.on('switch', function (newRoom, fn) {
    socket.leave(socket.room, function () {
      console.log("\n" + socket.username + ' has left ' + socket.room);
      socket.broadcast.to(socket.room).emit('updatechat', socket.username,
        data =
        {
          name: 'SERVER',
          message: '<strong>' + socket.username + '</strong>' + ' has left'
        }
      );
    });
    socket.join(newRoom, function (err) {
      console.log('\n' + socket.username + ' connected to room: ' + newRoom + " | Your Socket ID is: " + socketId + "\n");
      socket.to(newRoom).emit('updatechat', socket.username,
        data = {
          name: 'SERVER',
          message: '<strong>' + socket.username +'</strong>' + ' joined ' + newRoom
        }
      );
      socket.room = newRoom
    });
    fn('Room Switch Complete');

  });




  socket.on('disconnect', function () {
    console.log(socketId, 'has left');
  });
});


//Sequelize
db.sequelize.sync({}).then(function () {
  http.listen(PORT, function () {
    console.log('\nlistening on *:' + PORT);
  });

});

