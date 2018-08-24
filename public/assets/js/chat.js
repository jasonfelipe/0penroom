//CODE FOR THE FRONT END.
$(function () {
  $('#chat-main').hide();

  $('#sidebarCollapse').on('click', function () {
    $('#sidebar').toggleClass('active');
    $(this).toggleClass('active');
  });


  //Uses our connection to the server


  var socket = io();


  //Client side variables. AKA stuff from the DOM
  const message = document.getElementById('message'),
    name = document.getElementById('username'),
    btn = document.getElementById('send-message'),
    output = document.getElementById('output'),
    feedback = document.getElementById('feedback'),
    chatWindow = document.getElementById("chat-window")



  //default Room
  let room = 'Main';
  chatLogs();
  topics();




  //Switching Rooms
  $('.roomName').on('click', function () {

    console.log('Check current Room: ' + room);

    //resets chatbox
    output.innerHTML = ""

    console.log("ROOM -->" + $(this)[0].innerHTML);

    newRoom = $(this)[0].innerHTML; //switching the variables

    console.log('Welcome to Topic:' + newRoom); //sending the subscribe to the server aka pls join this room.

    socket.emit('switch', newRoom, function (data) {
      console.log(data);
      chatLogs();
    });
    room = newRoom
  });



  // emit/send to server on the click
  btn.addEventListener('click', function () {
    socket.emit('sendchat', {
      name: name.innerText,
      message: message.value,
      topic: room
    });
    //Putting the new message into a sequelize object
    let newMessage = {
      name: name.innerText,
      message: message.value,
      topic: room
    }

    //Using the function below to post into the database
    databaseMessage(newMessage);
  });


  //Now this looks for the 'keypress' event on the message.
  //this allows for us to have a 'name' is typing message.
  message.addEventListener('keypress', function () {
    socket.emit('typing',name.innerText);
  });

  //Listen for message event
  socket.on('updatechat', function (username, data) {
    console.log('\nThe Data from Event Listener \nusername: ' + username + '\ndata: ' + data.name, data.message + "\n" + 'room: ' + room);


    feedback.innerHTML = ''; //resets our feedback after a message is sent

    message.innerHTML = ''; //resets our message input?

    //Puts the message out into the HTML
    output.innerHTML += '<p><strong>' +
      data.name + ': </strong>' + data.message + '</p>';

    //puts chat to the bottom of window when new message pops up
    chatWindow.scrollTop = chatWindow.scrollHeight;
  });


  //Listen for typing event
  socket.on('typing', function (data) {
    feedback.innerHTML =
      '<p><em>' + data +
      ' is typing a message...' +
      '</em></p>'
  });


  //Posting Chat messages in database.
  function databaseMessage(message) {
    console.log(message)
    $.post('/api/messages/', message, function (data, err) {
      console.log(data)
    });

  }

  //function getting Chat Logs from database.
  function chatLogs() {

    $.get('/api/messages/' + room, function (data, err) {
      //looping through the database object
      for (var i = 0; i < data.length; i++) {
        output.innerHTML += '<p><strong>'
        + data[i].user + ':</strong>' + data[i].message + '</p>';;
      }
      chatWindow.scrollTop = chatWindow.scrollHeight;
    });
  }

  // new topic modal
  $('#topicBtn').on('click', function () {
    $('#topicModal').modal('toggle')
  });
});

// new topic post


      $("#dbTopic").on('click', function(){
        let newTopic = {
          title: $('#title').val().trim(),
          description: $("#description").val().trim()
        }
        addTopic(newTopic)
      });
      function addTopic(newTopic){
        console.log(newTopic)
        $.post('/api/posts/', newTopic, function (data, err){
          console.log(data);
        })
        topics()
      };

function topics(){
  $.get('/api/posts/', function(data, err){
    console.log(data)
    for (var i = 0; i<data.length; i++){
      $("#homeSubmenu").append("<li id='menuBar'><button class='roomName'>"+data[i].title+"</button></li>")
    }
  })
}

      
