
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
  const socket = io();

  //Client side variables. AKA stuff from the DOM
  const message = document.getElementById('message'),
    name = document.getElementById('username'),
    btn = document.getElementById('send-message'),
    output = document.getElementById('output'),
    feedback = document.getElementById('feedback');



  //Default Room.
  let room = 'Main';

  //Code that connects to the room.
  socket.on('connect', function () {
    socket.emit('room', room);
  });



  //Placeholder for switching chat rooms. (psuedo code)
  //buttons or link value will be the chatroom name.  
  topicButton.addEventListener('click', function () {
    room = $(this).val(); //switching the variables

    socket.on('connect', function () { //reusing what we just did above.
      socket.emit('room', room);
      console.log('Welcome to Topic:', room);
      $.get('/api/messages', function (data, err) {
        console.log(data);
      });

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

    $('#message').val('')

  });

  //Now this looks for the 'keypress' event on the message.
  //this allows for us to have a 'name' is typing message.
  message.addEventListener('keypress', function () {
    socket.emit('typing', name.innerText);
  });

  //Listen for message event
  socket.on('chat', function (data) {
    console.log('\nThe Data from Event Listener', data, "\n");


    let newMessage = {
      message: data.message,
      name: data.name,
      topic: room
    }

    databaseMessage(newMessage);

    feedback.innerHTML = ''; //resets our feedback after a message is sent

    //Puts the message out into the HTML
    output.innerHTML += '<p><strong>'
      + data.name + ': </strong>' + data.message + '</p>';

    //puts chat to the bottom of window when new message pops up
    var chatWindow = document.getElementById("chat-window");
    chatWindow.scrollTop = chatWindow.scrollHeight;
  });


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