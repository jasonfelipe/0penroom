$(function () {
    $('#about-page').hide();

    $('#aboutLink').on('click',function(){
        $('#chat-main').hide();
        $('#about-page').show();
    });

    $('#closeAbout').on('click', function(){
        $('#about-page').hide();
        $('#chat-main').show();

    });


});