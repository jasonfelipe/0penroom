//Stuff to do.
//Make sure the same username cannot be created.

$(document).ready(function () {
    const usernameInput = $('#username-input')

    //placeholder for password input 
    //const passwordInput = $('#password-input')

    $('#register-button').on('click', function () {
        event.preventDefault();

        //add password input inside here when created.


        //checks if there is a value in the input box.
        if (!usernameInput.val().trim) {
            return;
        }


        let newUser = {
            name: usernameInput.val().trim()
            //add password input here as well.
        };

        registerUser(newUser);
    });


    function registerUser(User) {
        $.post('/api/users/', User, function (data, err) {
            console.log('check to see', data);
            if (err) {
                $('#error-modal').modal('toggle');
            }
            else {
                $('#register-modal').modal('toggle');
            }
        });
    }

});