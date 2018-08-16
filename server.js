
//THE BACKEND CODE

const express = require("express");
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 3000;


//To get rid of the MIME type garbage. 
app.use(express.static(__dirname + '/public'));


app.get('/', function (req, res) {
  res.sendFile(__dirname + '/public/chat.html');
});


//connection to server. The Callback function
io.on('connection', function (socket) {

  //Clients have a unique ID each time they're connected, could be useful.
  console.log(
    "SOCKET ID: ", socket.id,
  );

  //Server receiving the submitted data, and doing something
  //with it. In this case it's emitting it out.
  socket.on('chat', function (data) {
    console.log('\nThe Data in Server', data);
    io.sockets.emit('chat', data);
  });


  //Server receiving who is typing and then sending the data out.
  socket.on('typing', function(data){
    //Socket syntax. This 'broadcast' puts a message to all users.
    socket.broadcast.emit('typing', data);
  });
});


http.listen(port, function () {
  console.log('\nlistening on *:' + port);
});
