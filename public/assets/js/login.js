//Stuff to do.
//Make sure no one else can log in as user as long as they are there.
$(function () {
    const socket = io();

    $('#login-button').on('click', function () {
        loginUser();
    });
    
    //Function to Log in the user.
    function loginUser() {
        const username = $('#username-input').val();    
        //checks to see if the login name is inside the database.
        $.get('/api/users/' + username, function (data, err) {
            if (!data || username === '') {
                $('#modal-content').css('color', 'red');
                $('#modal-body').html('Please input a valid username, or please register.')
                $('.modal-title').html('ERROR!')
                $('#modal').modal('toggle')

            }
            else {
                $('#chat-link-button').show()
                $('#close').hide();

                $('#login').hide();
                $('#chat-main').show();

                socket.emit('login', username);
                
                $('#username').text(username)
                return username;
            }
        });

    }

});

