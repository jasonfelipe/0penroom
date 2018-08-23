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
app.use(bodyParser.urlencoded({
  extended: true
}));
// parse application/json
app.use(bodyParser.json());


//To get rid of the MIME type garbage. 
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/controllers'));



//---------ROUTES---------
require("./routes/html-routes.js")(app);
require("./routes/api-routes.js")(app);




//-------SOCKET IO CODE--------
// io.sockets.on('connection', function (socket) {

//   socket.on('room', function(data) { socket.join(data.room); })

//   socket.on('disconnect', function(data) { socket.leave(data.room); })

// });

//connection to server. The Callback function
io.on('connection', function (socket) {

<<<<<<< HEAD
  //Clients have a unique ID each time they're connected, could be useful.
  console.log(
    "SOCKET ID: ", socket.id
  );

  let socketId = socket.id
  socket.on('dis', function (dis) {
    console.log("disconnected " + dis)
    socket.leaveAll();
    socket.leave(dis);
    socket.to(dis).emit('User Left', socketId)
  });
  //Code for switching rooms. (CHECK CHAT.JS FOR DEFAULTS AND WHERE THE CLIENT SWITCHES)
  socket.on('room', function (room) {
    
    
    console.log("--------------")
    console.log(room);
    socket.join(room);
    console.log('Connected to room:', room, "| Your Socket ID is: ", socketId);
    socket.to(room).emit('User Joined', socketId);


    


    //Server receiving the submitted data, and doing something
    //with it. In this case it's emitting it out.
    socket.on('chat' , function (data) {
socket.leaveAll()
      console.log('\nThe Data in Server (server.js)', data, 'Room Name: ', room, "\n");
      io.to(room).emit('chat', data);
=======

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

  //Code for switching rooms.
  socket.on('switch', function (newRoom) {
    socket.leave(socket.room, function () {
      console.log("\n" + socket.username + ' has left ' + socket.room);
    });

    socket.join(newRoom, function (err) {
      console.log('\n' + socket.username + ' connected to room: ' + newRoom + " | Your Socket ID is: " + socketId + "\n");
      socket.to(newRoom).emit(socket.username + ' joined ' + newRoom);
      socket.room = newRoom
>>>>>>> 649acfea98433a3e9615f7436c7f85eabc2174c1
    });


    //Server receiving who is typing and then sending the data out.
    socket.on('typing', function (data) {
      //Socket syntax. This 'broadcast' puts a message to all users.
<<<<<<< HEAD
      socket.broadcast.to(room).emit('typing', data);
    });

    
  });
  
=======
      socket.broadcast.to(socket.room).emit('typing', data);
    });
  });




  socket.on('disconnect', function () {
    console.log(socketId, 'has left');
  });
>>>>>>> 649acfea98433a3e9615f7436c7f85eabc2174c1
});


//Sequelize
db.sequelize.sync({}).then(function () {
  http.listen(PORT, function () {
    console.log('\nlistening on *:' + PORT);
  });

});