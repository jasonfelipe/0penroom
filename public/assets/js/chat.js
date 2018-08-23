//CODE FOR THE FRONT END.
$(function () {
  $('#chat-main').hide();

  $('#sidebarCollapse').on('click', function () {
    $('#sidebar').toggleClass('active');
    $(this).toggleClass('active');
  });



  //==============BE WARNED!=============
  // THE REST OF THIS CODE USES VANILLA JAVASCRIPT!!! (with socket.io)

  //Uses our connection to the server


  var socket = io();


  //Client side variables. AKA stuff from the DOM
  const message = document.getElementById('message'),
    name = document.getElementById('username'),
    btn = document.getElementById('send-message'),
    output = document.getElementById('output'),
    feedback = document.getElementById('feedback'),
    chatWindow = document.getElementById("chat-window");



  //Default Room.
  let room = 'Main';

  //Code that connects to the room.
  // socket.on('connect', function () {
  //   socket.emit('room', room);
  // });



  //Placeholder for switching chat rooms. (psuedo code)
  //buttons or link value will be the chatroom name.  
  $('.roomName').on('click', function () {
    console.log("________________________")
    console.log("Leaving room: " + room)
    socket.emit('dis',room)
    //leaving a room
    socket.emit('connection')

    console.log("ROOM -->", $(this)[0].innerHTML);

    output.innerHTML = ""

    room = $(this)[0].innerHTML; //switching the variables
    socket.emit('room', room);
    console.log('Welcome to Topic:', room);
    $.get('/api/messages/' + room, function (data, err) {
      console.log("Console logging data in chat.js", data)

      for (var i = 0; i < data.length; i++) {
        output.innerHTML += '<p><strong>' +
          data[i].user + ': </strong>' + data[i].message + '</p>';;
      }

      chatWindow.scrollTop = chatWindow.scrollHeight;
      return room;
    });

  
  });

  // emit/send to server on the click
  btn.addEventListener('click', function () {
    // syntax to send stuff to the server
    // 'chat' is the name of the message parameter, 
    // second parameter is the data we are sending, the message and name
    socket.emit('chat', {
      message: message.value,
      name: name.innerText,
      topic: room
    });

chat()

  });

  //Now this looks for the 'keypress' event on the message.
  //this allows for us to have a 'name' is typing message.
  message.addEventListener('keypress', function () {
    socket.emit('typing', name.innerText);
  });

  //Listen for message event
  function chat(){
  
    console.log('\nThe Data from Event Listener',  "\n");


    let newMessage = {
      message: message.value,
      name: name.innerText,
      topic: room
    }

    databaseMessage(newMessage);

    feedback.innerHTML = ''; //resets our feedback after a message is sent

    message.innerHTML = ''; //resets our message input?

    //Puts the message out into the HTML
    output.innerHTML += '<p><strong>' +
      name.innerText + ': </strong>' + message.value + '</p>';

    //puts chat to the bottom of window when new message pops up
    chatWindow.scrollTop = chatWindow.scrollHeight;
 }







  //Listen for typing event
  socket.on('typing', function (data) {
    feedback.innerHTML =
      '<p><em>' + data +
      ' is typing a message...' +
      '</em></p>'

  });

  function databaseMessage(message) {
    $.post('/api/messages/', message, function (data, err) {
      console.log(data)
    });

  }
});

// new topic modal
$('#topicBtn').on('click', function () {
  $('#topicModal').modal('toggle')
})