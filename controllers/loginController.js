$(document).ready(function () {

    const username = $('#userName').val;



    $('#register-button').on('click', function () {
        registerUser();
        $('#register-modal').modal('toggle')
    });

    $('#login-button').on('click', function () {
        loginUser();
        $('#login-modal').modal('toggle')
    });






    function loginUser() {
        console.log('this is a login function');
        console.log(username)
        //Stuff to do. 
        //Keep user Logged in as username (maybe we can use socket.id as a login variable?)

    }

    function registerUser() {
        console.log('this is a register function');

        const newUser = username;
        console.log(newUser     )

        //Stuff to do.
        //Save this the newUser into the database.
        

    

    }




});