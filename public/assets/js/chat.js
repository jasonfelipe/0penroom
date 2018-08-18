
//CODE FOR THE FRONT END.
$(function () {
  
  //Uses our connection to the server
  const socket = io();


  //Client side variables. AKA stuff from the DOM
  const message = document.getElementById('message'),
        name = document.getElementById('name'),
        btn = document.getElementById('send-message'),
        output = document.getElementById('output'),
        feedback = document.getElementById('feedback');


  //emit/send to server on the click
  btn.addEventListener('click', function () {

    // syntax to send stuff to the server
    // 'chat' is the name of the message parameter, 
    // second parameter is the data we are sending, the message and name
    socket.emit('chat', {
      message: message.value,
      // name: name.value
    });
  });

    //Now this looks for the 'keypress' event on the message.
    //this allows for us to have a 'name' is typing message.
    message.addEventListener('keypress', function(){

    //again, 'typing' is the name of our message parameter,
    // and the second parameter is the data we are sending, which
    //in this case is only the name.
    socket.emit('typing', name.value);
  });

  //Listen for message event
  socket.on('chat', function(data){
    console.log('\nThe Data from Event Listener', data);
    // feedback.innerHTML = ''; //resets our feedback after a message is sent

    //This is what's getting sent out to the HTML for the users to see.
    
    output.innerHTML += '<p>' +data.message +'</p>';
  });


  //Listen for typing event
  socket.on('typing', function(data){

    //This is what's getting sent out to the HTML for the users to see.
    feedback.innerHTML = '<p><em>' + data + 
    ' is typing a message...' +
    '</em></p>'
  });


});