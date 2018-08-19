//Stuff to do.
//Make sure no one else can log in as user as long as they are there.
$(function () {

    $('#login-button').on('click', function () {
        loginUser();
    });

    //Function to Log in the user.
    function loginUser() {
        const username = $('#username-input').val();
        //checks to see if the login name is inside the database.
        $.get('/api/users/' + username, function (data, err) {
            if (!data || username === '') {
                $('.modal-body').html('Please input a valid username, or please register.')
                $('#error-modal').modal('toggle')

            }
            else {
                $('.modal-body').html('Go ahead and chat!')
                $('#login-modal').modal('toggle')

                console.log(username)
                return username;
            }
            
        });
        
    }
});

