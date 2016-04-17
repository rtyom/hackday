$(document).ready(function(){

//// Cabinet step1 form validation
/////////////////////////////////////////
  $('#cab_step1').submit(function(event) { //Trigger on form submit

    var postForm = $(this).serialize();

    $.ajax({ //Process the form using $.ajax()
      type    : 'POST', //Method type
      url     : 'process.php', //Your form processing file url
      data    : postForm, //Forms name
      dataType  : 'json',
      success   : function(data) {

      if (!data.success) { //If fails
        $('#form_error_msg').html(data.errors.text); //Main error msg
        $('#form_error').show(); //Main error msg
      } else {
          $('#form_error').hide(); //Main error msg
          $('#form_success').show(); //If successful, than throw a success message
        }
      }
    });
      event.preventDefault(); //Prevent the default submit
  });

//// Cabinet step2 form validation
/////////////////////////////////////////
  $('#cab_step2').submit(function(event) { //Trigger on form submit

    var postForm = $(this).serialize();

    $.ajax({ //Process the form using $.ajax()
      type    : 'POST', //Method type
      url     : 'process.php', //Your form processing file url
      data    : postForm, //Forms name
      dataType  : 'json',
      success   : function(data) {
      

      if (!data.success) { //If fails
        $('#form_error_msg').html(data.errors.text); //Main error msg
        $('#form_error').show(); //Main error msg
      } else {
          $('#form_error').hide(); //Main error msg
          $('#form_success').show(); //If successful, than throw a success message
        }
      }
    });
      event.preventDefault(); //Prevent the default submit
  });

//// Password recovery popup form validation
/////////////////////////////////////////
  $('#popup_pwd').submit(function(event) { //Trigger on form submit
    $('.throw_error').empty(); //Clear the messages first

    var errmsg = 'Проверьте правильность заполнения поля';
    var postForm = $(this).serialize();

    $.ajax({ //Process the form using $.ajax()
      type    : 'POST', //Method type
      url     : 'process.php', //Your form processing file url
      data    : postForm, //Forms name
      dataType  : 'json',
      success   : function(data) {
        
      if (!data.success) { //If fails
        if (data.errors.email) { //Returned if any error from process.php
          $('#email_err').html(errmsg); //Throw relevant error
        }
        $('#error_msg').html(data.errors.other); //Main error msg
      } else {
          $('fieldset').hide();
          $('#success').show(); //If successful, than throw a success message
        }
      }
    });
      event.preventDefault(); //Prevent the default submit
  });

//// Authentication popup form validation
/////////////////////////////////////////
  $('#popup_auth').submit(function(event) { //Trigger on form submit
    $('.throw_error').empty(); //Clear the messages first

    var errmsg = 'Проверьте правильность заполнения поля';
    var postForm = $(this).serialize();

    $.ajax({ //Process the form using $.ajax()
      type    : 'POST', //Method type
      url     : 'process.php', //Your form processing file url
      data    : postForm, //Forms name
      dataType  : 'json',
      success   : function(data) {
        
      if (!data.success) { //If fails
        if (data.errors.email) { //Returned if any error from process.php
          $('#email_err').html(errmsg); //Throw relevant error
        }
        if (data.errors.password) { //Returned if any error from process.php
          $('#password_err').html(errmsg); //Throw relevant error
        }
        $('#error_msg').html(data.errors.other); //Main error msg
      } else {
          $('fieldset').hide();
          $('#success').show(); //If successful, than throw a success message
        }
      }
    });
      event.preventDefault(); //Prevent the default submit
  });

//// Registration popup form validation
/////////////////////////////////////////
  $('#popup_reg').submit(function(event) { //Trigger on form submit
    $('.throw_error').empty(); //Clear the messages first

    var errmsg = 'Проверьте правильность заполнения поля';
    var postForm = $(this).serialize();

    $.ajax({ //Process the form using $.ajax()
      type    : 'POST', //Method type
      url     : 'process.php', //Your form processing file url
      data    : postForm, //Forms name
      dataType  : 'json',
      success   : function(data) {
        
      if (!data.success) { //If fails
        if (data.errors.email) { //Returned if any error from process.php
          $('#email_err').html(errmsg); //Throw relevant error
        }
        $('#error_msg').html(data.errors.other); //Main error msg
      } else {
          $('fieldset').hide();
          $('#success').show(); //If successful, than throw a success message
        }
      }
    });
      event.preventDefault(); //Prevent the default submit
  });

//// Password recovery popup
/////////////////////////////////////////  
  $('#pwd').click(function(){
      var txt = $(this).data('text');
      $('fieldset').show();
      $('#success').hide('');
  });

  $('#pwd').magnificPopup({
    type: 'inline',
    preloader: false,
    focus: '#email',

    callbacks: {
      beforeOpen: function() {
        if($(window).width() < 700) {
          this.st.focus = false;
        } else {
          this.st.focus = '#email';
        }
      }
    }
  });

//// Registration popup
/////////////////////////////////////////  
  $('.section__go').click(function(){
      var txt = $(this).data('text');
      $('#popup_reg > div > mark').text(txt);
      $('fieldset').show();
      $('#success').hide('');
  });

  $('.section__go').magnificPopup({
    type: 'inline',
    preloader: false,
    focus: '#email',

    callbacks: {
      beforeOpen: function() {
        if($(window).width() < 700) {
          this.st.focus = false;
        } else {
          this.st.focus = '#email';
        }
      }
    }
  });

//// Authentication popup
/////////////////////////////////////////

  $('#auth').click(function(){
      $('fieldset').show();
      $('#success').hide('');
  });

  $('#auth').magnificPopup({
    type: 'inline',
    preloader: false,
    focus: '#email',

    callbacks: {
      beforeOpen: function() {
        if($(window).width() < 700) {
          this.st.focus = false;
        } else {
          this.st.focus = '#email';
        }
      }
    }
  });

//// Speakers section 
/////////////////////////////////////////
$('.about__box__item').click(function() {
    $('.about__box__descr').hide();
    $('.about__box__img').css('background-color','white');
    $('.about__box__name > span').css('color', '#f15357');
    $('#'+this.id).find('.about__box__img').css('background-color', '#ccc');
    $('#'+this.id).find('span').css('color', 'red');    
    $('#'+this.id+'_descr').fadeIn('slow');
  }
);

/////////////////////////////////////////

  $('.video__play').on('click', function(event) {
    event.preventDefault();
    $('.video__gag').fadeOut(300);
    $('.video__source')[0].src += "&autoplay=1";
  });

  $('.gallery a').magnificPopup({
    type:'image',
    gallery: {
      enabled: true
    }
  });
  
  
  
});