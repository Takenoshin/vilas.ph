var urlParams = new URLSearchParams(window.location.search);
var urlParamLang = urlParams.get('lang');
var urlParamUUID = urlParams.get('uuid');
var langJson;

if (urlParamLang === null){
  urlParamLang = defaultLang;
}
if(
  urlParamLang != 'cn' &&
  urlParamLang != 'my-cn' &&
  urlParamLang != 'id' &&
  urlParamLang != 'vn' && 
  urlParamLang != 'th' && 
  urlParamLang != 'jp' && 
  urlParamLang != 'kr' && 
  urlParamLang != 'in'
) {
	urlParamLang = 'en';
}

fetchLangJson(urlParamLang);

function fetchLangJson(country) {
	$('.lang-area-outer .sel-lang').prepend('<img src="img/flags/'+country+'.svg">');
	$('body').attr('data-lang', country);
	$.ajax({
		url: "js/langcontent/"+country+".json",
		type: 'GET',
		cache: false,
		dataType: 'json',
		success: function(result) {
			Object.entries(result).map(obj => {
				const key   = obj[0];
				const value = obj[1];
				$('[data-txt="'+key+'"]').html(value);
				$('[data-cta="'+key+'"]').attr('href', value);
				$('[data-spinning-txt="'+key+'"]').attr('data-spinning-txt', value);
				$('[data-placeholder="'+key+'"]').attr('placeholder', value);
			});
		},
		error: function() {
			alert("No");
		}
	});
}

function openInNewWindow(url, width, height) {
	window.open(url, '', 'width=' + width + ', height=' + height);
}

//popup touchswipe
var touchstart = false;
var genY = 0;
var oldY = 0;
var goToY = 0;
var treshold = 100;
function swipeClosePopup() {
	touchstart = false;
	genY = 0;
	oldY = 0;
	goToY = 0;
	treshold = 100;
	targetHeight = $('.area-popup.active .popup').height() * -1;
	$('.area-popup.active .popup').animate({bottom: targetHeight}, 200, 'linear', function(){
		closePopup();
		$('.area-popup .popup').css('bottom', '');
	});
}
$(document).on('touchstart mousedown', '.area-popup.active .popup-head', function(e){
	if($(window).width() <= 480) {
		touchstart = true;
	}
}).on('touchend mouseup', '.area-popup.active .popup-head', function(e){
	if($(window).width() <= 480) {
		if(Math.abs(genY) > treshold) {
			swipeClosePopup();
		} else {
			$('.area-popup.active .popup').animate({bottom: 0}, 200, 'linear');
		}
	}
}).on('touchmove mousemove', '.area-popup.active .popup-head', function(e){
	if(touchstart && $(window).width() <= 480) {
		if(oldY == 0) {
			oldY = e.originalEvent.touches ?  e.originalEvent.touches[0].pageY : e.pageY;
		}
		genY = e.originalEvent.touches ?  e.originalEvent.touches[0].pageY : e.pageY;
		genY = oldY - genY;
		if(genY <= 0) {
			$('.area-popup.active .popup').css({bottom: genY});
		}
	}
});


$('.accordion-parent').click(function(){
	$('.accordion-content').slideToggle(function(){
		var that = this;
		if($(that).is(":visible")) {
			$("html, body").animate({scrollTop: $('.area-tnc').offset().top }, 600);
		}
	});
	$('.accordion-parent').toggleClass('active');
});

function closePopup() {
	console.log('hidden popup')
}

//dropdown
jQuery.fn.extend({
    initDropdown: function () {
		$(this).each(function(){
			var that = this;
			var clickDetect = 0;
			$(that).find('.dropdown-selected, .dropdown-selection').mouseenter(function(){
				clickDetect = 1;
			});
			$(that).find('.dropdown-selected, .dropdown-selection').mouseleave(function(){
				clickDetect = 0;
			});
			$(that).find('.dropdown-selected').click(function(){
				if(!$(this).hasClass('active')) {
					$(this).addClass('active');
				}
				else {
					$(this).removeClass('active');
				}
			});
			$(document).click(function(){
				if(clickDetect == 0) {
					$(that).find('.dropdown-selected').removeClass('active');
				}
			});
			$(that).find('.dropdown-selection dd').click(function(){
				var hiddenVal = ($(this).attr('data-value') != 'placeholder') ? $(this).attr('data-value') : '';
				$(that).find('.dropdown-selected').text($(this).text()).attr('data-country', $(this).attr('data-country'));
				$(that).find('input[type="hidden"]').val(hiddenVal);
				$(that).removeClass('valid');
				if($(that).find('input[type="hidden"]').val() != '') {
					$(that).addClass('valid');
				}
				$(that).find('.dropdown-selected').removeClass('active');
			});
			
			var dropdownHiddenField = $(that).find('input[type="hidden"]').attr('name');
			$(that).find('.dropdown-selected').text($(that).find('dd:eq(0)').text()).attr('data-country', $(that).find('dd:eq(0)').attr('data-country'));
			if($(that).find('dd:eq(0)').attr('data-value') == 'placeholder') {
				$(that).find('input[type="hidden"]').val('');
			}
			else {
				$(that).find('input[type="hidden"]').val($(that).find('dd:eq(0)').attr('data-value'));
			}
		});
    }
});
$('.dropdown-box').initDropdown();

function openCongratsPopup() {
    // $('body').addClass('popup-active');
    // $('.popup-congrats').addClass('active');
    UIkit.modal('.popup-congrats').show();
}

$('.popup-register .area-form .field-agree .btn-agree').click(function(){
	$(this).toggleClass('active');
});

function registerEnableBtn() {
	if($('.popup-register .field-area.success').length >= 2 ) {
		$('.popup-register #btnSubmit').addClass('active');
	} else {
		$('.popup-register #btnSubmit').removeClass('active');
	}
}

$(document).on('click', '.popup-register .area-form .field-agree .btn-checkbox', function(){
	registerEnableBtn();
});

$(document).on('keyup blur change mouseleave', '.popup-register [type="text"]', function(){
	registerEnableBtn();
});

$(document).on('click', '.popup-socialmedia .popup-content .boxes .box', function(){
	var indx = $(this).index() - 1;
	$('.sharethis-inline-share-buttons .st-btn:eq('+indx+')').click();
});