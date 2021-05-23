//var window width
var viewportGlobal = $(window).width();

//function js cal match height
var calMatchHeight = function(){
  if($('.js-match-height').length > 0){
    $('.js-match-height >ul >li').matchHeight();
  }
};

var showPassword = function () {
  $('.show-pass').click(function (e) {
    var grand = $(this).parent();
    var type = $("#show-password", $(grand)).attr('type');
    switch (type) {
      case 'password':
        {
          $("#show-password", $(grand)).attr('type', 'text');
          $(".icon-invisible", $(grand)).removeClass('icon-invisible').addClass('icon-visible');
          return;
        }
      case 'text':
        {
          $("#show-password", $(grand)).attr('type', 'password');
          $(".icon-visible", $(grand)).removeClass('icon-visible').addClass('icon-invisible');
          return;
        }
    }
  });
};

var maxlengthOTP = function () {
  if ($('.c-login__otp__input').length > 0) {
    $(".c-login__otp__input input").jqueryPincodeAutotab();
  }
}

//function js nameFunction
var nameFunction = function(){
  //code js
};