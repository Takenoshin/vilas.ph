$(window).on('load', function() { // makes sure the whole site is loaded 
  // $('.cs-load-status').fadeOut();  will first fade out the loading animation 
  $('#cs-preloader').delay(350).fadeOut('slow'); // will fade out the white DIV that covers the website. 
  $('body').delay(350).css({
		'overflow-x':'hidden',
		'overflow-y':'visible'
	});
})


window.onbeforeunload = function () {
  window.scrollTo(0, 0);
}

$(window).scroll(function() {    
    var scroll = $(window).scrollTop();

    if (scroll >= 800) {
        $(".cs-totop").fadeIn();
    }
		else {
        $(".cs-totop").fadeOut();
		}
}); //missing );