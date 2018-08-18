//Stuff to do.
//Get Database info to see if user exists.
//If user exists, put them into the chat.
//Make sure no one else can log in as user as long as they are there.

$(function() {

    $('#login-button').on('click', function () {
        loginUser();
        $('#login-modal').modal('toggle')
    });


//Function to Log in the user.
    function loginUser() {
        const username = $('#username-input').val();
        console.log('this is a login function');
        console.log(username)

        //Stuff to do. 
        //Keep user Logged in as username (maybe we can use socket.id as a login variable?)


    }

});