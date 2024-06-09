<?php

$domain = $_SERVER['SERVER_NAME'];

// domains and config
include_once('config.php');

// ready for langauge verification
$site = $trackingCode[$domain];
unset($site['affId']);
$languages = array_keys($site);

// set language default first array key
$language = isset($_GET['lang']) ? $_GET['lang'] : $languages[0];
// verify exist in array language
if ( !in_array($language, $languages)){

	// header refresh remove lang
	// $language = $languages[0];

	$filename = str_replace('index.php', '', $_SERVER['PHP_SELF']);
	if (!headers_sent())
		header('Location: '.$filename);
	else {
		echo '<script type="text/javascript">';
		echo 'window.location.href = \''.$filename.'\';';
		echo '</script>';
		echo '<noscript>';
		echo '<meta http-equiv="refresh" content="0;url=\''.$filename.'\'" />';
		echo '</noscript>';
	}
	exit();
}

include_once('languages/' . $language . '.php');

$ga_code = 'G-7BG55MYQN7';
if (isset($ga_codes[$domain]))
	$ga_code = $ga_codes[$domain];

?>
<!DOCTYPE html>
<html>
<head>
	<meta charset="UTF-8">
	<meta name="description" content="<?php echo $meta_description; ?>">
	<title><?php echo $meta_title; ?></title>
	<meta name="viewport" content="width=device-width, initial-scale=1">

	<!-- JS FILES REGISTRATION FORM -->
	<script type="text/javascript" src="https://api.m88.services/signup/assets/js/build-script-regform.js?load=jquery,jquery-validation,uikit,uikit-icons,iconselectbox&123123123"></script>

	<script type="text/javascript" src="js/scroller.js"></script>
	<!-- <script src="js/additional-methods.js"></script> -->
	<link rel="icon" href="img/favicon.ico">

	<!-- CSS FILES -->
	<link rel="stylesheet" type="text/css" href="https://api.m88.services/signup/assets/uikit-3.16.14/css/uikit.min.css">

	<link rel="stylesheet" href="css/custom.css?a11">
	<!-- CSS FILES REGISTRATION FORM -->
	<link rel="stylesheet" type="text/css" href="css/registration-form.css?a3">

  <!-- Global site tag (gtag.js) - Google Analytics -->
  <script async src="https://www.googletagmanager.com/gtag/js?id=<?php echo $ga_code; ?>"></script>
  <script>
	window.dataLayer = window.dataLayer || [];
	function gtag(){dataLayer.push(arguments);}
	gtag('js', new Date());

	gtag('config', '<?php echo $ga_code; ?>');
  </script>

</head>
<body class="registered" uk-height-viewport> <!-- toggle classes 'registered' & 'unregistered' -->

	<div class="parallax-wrapper">
		<div class="layer-3" data-mouse-parallax="0.03"></div>
		<div class="layer-2"></div>
	</div>

	<header class="uk-position-top uk-position-small reset-position">
	    <div class="uk-grid uk-child-width-expand" uk-grid>
	        <div class="uk-flex uk-flex-left">
						<img class="" src="img/m88logo.png" uk-img/>
	        </div>
	        <div class="uk-flex uk-flex-right">
					  <?php
					  if ( sizeof($site) > 1 ) : ?>
						<div class="language-selector uk-flex uk-flex-right">

							<button class="uk-button uk-button-default language-button uk-text-uppercase text-dark" type="button">
								<span class="icon-flag fl-<?php echo $language; ?>"></span><?php echo $language; ?><span uk-icon="icon: triangle-down"></span>
							</button>

							<div class="lang-area-outer dropdown-dark" uk-dropdown>

							  <ul class="uk-nav uk-dropdown-nav">
								<?php
								foreach ($languages as $key => $value) { 	
								  $active = ($language === $value ) ? 'uk-active' : '';
								  echo '<li class="'. $active .' uk-margin-remove uk-text-uppercase">'
									. '<a lang="'. $value .'" href="?lang='. $value .'">'
									  . '<span class="icon-flag fl-'. $value .'"></span>'
									  . $value . '</a></li>';
								} ?> 
							  </ul>
							</div>

						</div>
					  <?php endif; ?>
	        </div>
	    </div>
	</header>

  <div id="container" class="main-container uk-flex uk-flex-center uk-flex-middle" uk-height-viewport>

		<div class="spinwheel-container uk-flex uk-flex-center uk-flex-wrap-around uk-text-center">

			<div>
				<div class="logo"><img src="img/logo-<?php echo $language; ?>.webp" /></div>
				
				<div class="wheelContainer">
					<svg class="wheelSVG" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" text-rendering="optimizeSpeed" preserveAspectRatio="xMidYMin meet">
						<defs>
							<filter id="shadow" x="-100%" y="-100%" width="550%" height="550%">
								<feOffset in="SourceAlpha" dx="0" dy="0" result="offsetOut"></feOffset>
								<feGaussianBlur stdDeviation="9" in="offsetOut" result="drop" />
								<feColorMatrix in="drop" result="color-out" type="matrix" values="0 0 0 0   0
								0 0 0 0   0
								0 0 0 0   0
								0 0 0 .3 0" />
								<feBlend in="SourceGraphic" in2="color-out" mode="normal" />
							</filter>
						</defs>
						<g class="mainContainer">
							<g class="wheel">
							</g>
						</g>
						<g class="wheelOutline" />
						<g class="pegContainer" opacity="0">
							<path class="peg" fill="#EEEEEE" d="M22.139,0C5.623,0-1.523,15.572,0.269,27.037c3.392,21.707,21.87,42.232,21.87,42.232 s18.478-20.525,21.87-42.232C45.801,15.572,38.623,0,22.139,0z" />
						</g>
						<g class="valueContainer" />
					</svg>
					<div class="cwheelOutline"></div>
							<div class="winning-indicator"></div>
					<div class="cwheel-arrow"></div>
					<div class="cwheel-innerCircle"></div>
					<div class="toast" style="display: none">
						<div class="toast-inner"><p></p></div>
						<div class="spin-left" data-txt="txt2"></div>
					</div>
					<!-- <img src="img/game/dealer.webp" class="dealer" /> -->
				</div>

				<div class="area-txt txt-1">asdasdasd</div>
				<div class="area-cta">
					<button class="btn spinBtn" data-spinning-txt="spinning-txt"><span class="loader"></span><span><?php echo $spin_txt; ?></span></button>
					<button class="btn btn-register" data-txt="txt4"></button><br>
					<button class="btn viewprizes " href="#viewPrizes" uk-toggle><?php echo $text_viewprizes; ?></button>
				</div>

			</div>

		</div>

	</div>

				
  <footer class="footer uk-light uk-text-center uk-padding-small uk-position-bottom">
	  <span class="uk-text-small">
	  	<a href="#popup-tnc" class="tnc-link" uk-toggle><?php echo $text_tnc;?></a> • <?php echo $text_m88commited;?> <a href="<?php echo $responsible_link; ?>" target="_blank" class="responsible-link"><?php echo $text_responsiblegaming;?></a>
    </span>
  </footer>



	<!-- CONGRATS MODAL -->
   <div id="popup-congrats" class="popup-congrats uk-flex-center uk-text-left uk-border-rounded" uk-modal="stack: true" bg-close="false"esc-close="false">
   	<div class="bg-ray"></div>
	  <div class="uk-modal-dialog uk-margin-auto-vertical uk-text-center uk-width-auto" uk-overflow-auto>
	    <div class="uk-modal-header uk-padding-remove">
				<img class="congrats-header" src="" >
			</div>
	    <div class="uk-modal-body">
		  	<h4 class="uk-text-uppercase text-white uk-margin-remove" data-txt="txt7"></h4>
				<h3 id="divDynamicResult" class="text-yellow"></h3>
			</div>
	    <div class="uk-modal-footer uk-padding-remove">
				<a class="uk-button btn claim-btn" uk-toggle="target: #registration-form-modal" data-txt="txt10"></a>
			</div>
		</div>
	</div>
	<!-- END CONGRATS MODAL -->

	<!-- T&C MODAL -->
   <div id="popup-tnc" class="popup-tnc uk-flex-top uk-text-left " uk-modal="stack: true" bg-close="true" >
	  <div class="uk-modal-dialog uk-margin-auto-vertical uk-border-rounded" uk-overflow-auto>
		  <button class="uk-modal-close-default" type="button" uk-close></button>
			<?php echo $tnc; ?>
		</div>
	</div>
	<!-- END T&C MODAL -->

	<!-- MECHANICS MODAL -->
	<div id="popup-mechanics" class="popup-mechanics modal" uk-modal="stack: true" bg-close="true">
		<div class="uk-modal-dialog uk-margin-auto-vertical" >
			<?php echo $mechanics; ?>
		</div>
	</div>
	<!-- END MECHANICS MODAL -->

	<!-- VIEW PRIZES OFFCANVAS -->
	<div id="viewPrizes" uk-offcanvas>
    <div class="prizes-container uk-offcanvas-bar">

      <button class="uk-offcanvas-close" type="button" uk-close></button>
      <h3><?php echo $text_prizes; ?></h3>

				<div class="prize-card" uk-grid>
			    <div class="uk-width-auto"><img src="img/prize-1.png" class=""></div>
			    <div class="uk-width-expand uk-flex uk-flex-middle"><?php echo $prize_1; ?></div>
				</div>

				<div class="prize-card" uk-grid>
			    <div class="uk-width-auto"><img src="img/prize-2.png" class=""></div>
			    <div class="uk-width-expand uk-flex uk-flex-middle"><?php echo $prize_2; ?></div>
				</div>

				<div class="prize-card" uk-grid>
			    <div class="uk-width-auto"><img src="img/prize-3.png" class=""></div>
			    <div class="uk-width-expand uk-flex uk-flex-middle"><?php echo $prize_3; ?></div>
				</div>

				<div class="prize-card" uk-grid>
			    <div class="uk-width-auto"><img src="img/prize-4.png" class=""></div>
			    <div class="uk-width-expand uk-flex uk-flex-middle"><?php echo $prize_4; ?></div>
				</div>

				<div class="prize-card" uk-grid>
			    <div class="uk-width-auto"><img src="img/prize-5.png" class=""></div>
			    <div class="uk-width-expand uk-flex uk-flex-middle"><?php echo $prize_5; ?></div>
				</div>

				<div class="prize-card" uk-grid>
			    <div class="uk-width-auto"><img src="img/prize-6.png" class=""></div>
			    <div class="uk-width-expand uk-flex uk-flex-middle"><?php echo $prize_6; ?></div>
				</div>


				<div class="prize-card" uk-grid>
			    <div class="uk-width-auto"><img src="img/prize-7.png" class=""></div>
			    <div class="uk-width-expand uk-flex uk-flex-middle"><?php echo $prize_7; ?></div>
				</div>

    </div>
  </div>


	<div id="registration-container"></div>


	<script type="text/javascript">
	  const promoName = '<?php echo $promoName;?>';
	  let trackingCode = <?php echo json_encode($trackingCode[$domain]);?>;
	  let bonusValue = 0;
	  const defaultLang = '<?php echo $language; ?>';
	  // global variable 
	  var lang = '<?php echo $language;?>';
	</script>
	
	<script src="js/scripts.js?a5"></script>
	<script src="js/spin-libs.js"></script>
	<script src='js/spinwheel.js?a1'></script>
	<script src="js/script-api.js?a1"></script>

	<script type="text/javascript" src="https://api.m88.services/signup/assets/js/scripts.js?v2.70"></script>
	<script type="text/javascript">
	  jQuery(document).ready(function() {
			$('#registration-container').RegistrationForm({
			  'mode' : '',
			  'banner_mobile': 'img/reg-mobile-<?php echo $language;?>.webp',
			  'banner_desktop': 'img/reg-img.webp',
			  'languages': <?php echo json_encode($languages);?>,
			  'include_inr': false,
			  // 'currency': ['cny','usd'],
			  'lock-mobile': true,
			  'default-language': '<?php echo $languages[0];?>',
			  'promo': null,
			  'affiliate_id': null,
			  'campaign_name': null
			});

			$(".registered").mousemove(function(e) {
			  var x = e.pageX - $(this).offset().left - $(this).width() / 2;
			  var y = e.pageY - $(this).offset().top - $(this).height() / 2;
			  
			  $("*[data-mouse-parallax]").each(function() {
			    var factor = parseFloat($(this).data("mouse-parallax"));
			    x = -x * factor;
			    y = -y * factor;

			    $(this).css({ transform: "translate3d( " + x + "px, " + y + "px, 0 )" });
			  });
			});

	  });
	</script>
</body>
</html>