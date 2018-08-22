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

  //Clients have a unique ID each time they're connected, could be useful.
  console.log(
    "SOCKET ID: ", socket.id
  );

  let socketId = socket.id

  //Code for switching rooms. (CHECK CHAT.JS FOR DEFAULTS AND WHERE THE CLIENT SWITCHES)
  socket.on('room', function (room) {
    socket.on('dis', function () {
      console.log("disconnected " + room)
      socket.leaveAll();
      socket.leave(room);
      socket.to(room).emit('User Left', socketId)
    });
    socket.leaveAll();
    console.log("--------------")
    console.log(room);
    socket.join(room);
    console.log('Connected to room:', room, "| Your Socket ID is: ", socketId);
    socket.to(room).emit('User Joined', socketId);


    


    //Server receiving the submitted data, and doing something
    //with it. In this case it's emitting it out.
    socket.on('chat' , function (data) {

      console.log('\nThe Data in Server (server.js)', data, 'Room Name: ', room, "\n");
      io.to(room).emit('chat', data);
    });


    //Server receiving who is typing and then sending the data out.
    socket.on('typing', function (data) {
      //Socket syntax. This 'broadcast' puts a message to all users.
      socket.broadcast.to(room).emit('typing', data);
    });

    
  });
  
});

//Sequelize
db.sequelize.sync({}).then(function () {
  http.listen(PORT, function () {
    console.log('\nlistening on *:' + PORT);
  });

});