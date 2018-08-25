//CODE FOR THE FRONT END.
$(function () {
  $('#chat-main').hide();

  $('#sidebarCollapse').on('click', function () {
    $('#sidebar').toggleClass('active');
    $(this).toggleClass('active');
  });


  //Uses our connection to the server
  const socket = io();

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

  setInterval(topicsRefresh, 2000);


  function topicsRefresh() {
    topics();
  }

  function topics() {
    $.get('/api/posts/', function (data, err) {
      console.log(data);
      $('#homeSubmenu').empty();
      for (var i = 0; i < data.length; i++) {
        $("#homeSubmenu").append("<li id='menuBar'><button class='roomName'>" + data[i].title + "</button></li>")
      }
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
    });

  }


  //Switching Rooms
  $('.roomName').on('click', function () {
    console.log(this)
    console.log('Check current Room: ' + room);

    //resets chatbox
    output.innerHTML = ""

    console.log("ROOM -->" + $(this)[0].innerHTML);

    newRoom = $(this)[0].innerHTML; //switching the variables

    $('#topic-title').html(newRoom);

    console.log('Welcome to Topic:' + newRoom); //sending the subscribe to the server aka pls join this room.

    socket.emit('switch', newRoom, function (data) {
      console.log(data);
      chatLogs();
    });
    room = newRoom
    topics();
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
    topics();
  });


  //Now this looks for the 'keypress' event on the message.
  //this allows for us to have a 'nagla.davis89@gmail.comgla.davis89@gmail.comgla.davis89@gmail.comme' is typing message.
  message.addEventListener('keypress', function () {
    socket.emit('typing', name.innerText);
  });

  //Listen for message event
  socket.on('updatechat', function (username, data) {
    console.log('\nThe Data from Event Listener \nusername: ' + username + '\ndata: ' + data.name, data.message + "\n" + 'room: ' + room);


    feedback.innerHTML = ''; //resets our feedback after a message is sent

    message.innerHTML = ''; //resets our message input?

    //Puts the message out into the HTML
    output.innerHTML += '<p><strong>'
      + data.name + ': </strong>' + data.message + '</p>';

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
          + data[i].user + ': </strong>' + data[i].message + '</p>';;
      }
      chatWindow.scrollTop = chatWindow.scrollHeight;
    });
  }

  // new topic modal
  $('#topicBtn').on('click', function () {
    $('.modal-title').html('Add A Topic!')
    $('#topicModal').modal('toggle')
  });

  // new topic post
  $("#dbTopic").on('click', function () {
    let title = $('#title').val().trim(),
      description = $("#description").val().trim()
    let newTopic = {
      title: title,
      description: description
    }

    //Checking input, doesn't work if something is blank
    if (title && description === "") {

      $('.modal-title').html('ERROR!! <br> TITLE AND DESCRPTION REQUIRED');
      console.log(title === "", description === "");

    }
    else {
      $('#topicModal').modal('hide');
      addTopic(newTopic);
    }
  });


  function addTopic(newTopic) {
    console.log(newTopic)
    $.post('/api/posts/', newTopic, function (data, err) {
      console.log(data);
      if (data.name === 'SequelizeUniqueConstraintError') {
        $('#modal-content').css('color', 'red');
        $('.modal-title').html('ERROR!')
        $('#modal-body').html('POST ALREADY EXISTS!');
        $('#modal').modal('toggle');
      }

      else {
        $('#modal-content').css('color', 'black');
        $('.modal-title').html('Topic Successfully Added!');
        $('#modal-body').html('Check the Topics tab and go Chat!')
        $('#modal').modal('toggle');
        topics();
      }
    });
  };
});





