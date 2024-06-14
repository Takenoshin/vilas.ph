;(function(window) {

	/**
	 * GridLoaderFx obj.
	 */
	function GridLoaderFx(el, options) {
		this.el = el;
		this.items = this.el.querySelectorAll('.grid__item > .grid__link');
	}
	
	/**
	 * Effects.
	 */
	GridLoaderFx.prototype.effects = {
		'Shu': {
			lineDrawing: true,
			animeLineDrawingOpts: {
				duration: 800,
				delay: function(t,i) {
					return i*150;
				},
				easing: 'easeInOutSine',
				strokeDashoffset: [anime.setDashoffset, 0],
				opacity: [
					{value: [0,1]},
					{value: [1,0], duration: 200, easing: 'linear', delay:500}
				]
			},
			animeOpts: {
				duration: 800,
				easing: [0.2,1,0.3,1],
				delay: function(t,i) {
					return i*150 + 800;
				},
				opacity: {
					value: [0,1],
					easing: 'linear'
				},
				scale: [0.5,1]
			}
		}
	};

	GridLoaderFx.prototype._render = function(effect) {
		// Reset styles.
		this._resetStyles();

		var self = this,
			effectSettings = this.effects[effect],
			animeOpts = effectSettings.animeOpts

		if( effectSettings.perspective != undefined ) {
			[].slice.call(this.items).forEach(function(item) { 
				item.parentNode.style.WebkitPerspective = item.parentNode.style.perspective = effectSettings.perspective + 'px';
			});
		}
		
		if( effectSettings.origin != undefined ) {
			[].slice.call(this.items).forEach(function(item) { 
				item.style.WebkitTransformOrigin = item.style.transformOrigin = effectSettings.origin;
			});
		}

		if( effectSettings.lineDrawing != undefined ) {
			[].slice.call(this.items).forEach(function(item) { 
				// Create SVG.
				var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg'),
					path = document.createElementNS('http://www.w3.org/2000/svg', 'path'),
					itemW = item.offsetWidth,
					itemH = item.offsetHeight;

				svg.setAttribute('width', itemW + 'px');
				svg.setAttribute('height', itemH + 'px');
				svg.setAttribute('viewBox', '0 0 ' + itemW + ' ' + itemH);
				svg.setAttribute('class', 'grid__deco');
				// path.setAttribute('d', 'M0,0 l' + itemW + ',0 0,' + itemH + ' -' + itemW + ',0 0,-' + itemH);
				path.setAttribute('d', 'M20,0 h' + (itemW - 40) + ', a20,20,0,0,1,20,20, v' + (itemH - 40) + ', a20,20,0,0,1,-20,20, h-' + (itemW - 40) + ', a20,20,0,0,1,-20,-20, v-' + (itemH - 40) + ', a20,20,0,0,1,20,-20, z');
				// 10 Radius -- path.setAttribute('d', 'M 10,0 h' + (itemW - 20) + ', a10,10,0,0,1,10,10, v' + (itemH - 20) + ', a10,10,0,0,1,-10,10, h-' + (itemW - 20) + ', a10,10,0,0,1,-10,-10, v-' + (itemH - 20) + ', a10,10,0,0,1,10,-10, z');
      
        path.setAttribute('stroke-dashoffset', anime.setDashoffset(path));
				svg.appendChild(path);
				item.parentNode.appendChild(svg);
			});

			var animeLineDrawingOpts = effectSettings.animeLineDrawingOpts;
			animeLineDrawingOpts.targets = this.el.querySelectorAll('.grid__deco > path');
			anime.remove(animeLineDrawingOpts.targets);
			anime(animeLineDrawingOpts);
		}

		if( effectSettings.revealer != undefined ) {
			[].slice.call(this.items).forEach(function(item) { 
				var revealer = document.createElement('div');
				revealer.className = 'grid__reveal';
				if( effectSettings.revealerOrigin != undefined ) {
					revealer.style.transformOrigin = effectSettings.revealerOrigin;
				}
				if( effectSettings.revealerColor != undefined ) {
					revealer.style.backgroundColor = effectSettings.revealerColor;
				}
				item.parentNode.appendChild(revealer);
			});

			var animeRevealerOpts = effectSettings.animeRevealerOpts;
			animeRevealerOpts.targets = this.el.querySelectorAll('.grid__reveal');
			animeRevealerOpts.begin = function(obj) {
				for(var i = 0, len = obj.animatables.length; i < len; ++i) {
					obj.animatables[i].target.style.opacity = 1;
				}
			};
			anime.remove(animeRevealerOpts.targets);
			anime(animeRevealerOpts);
		}

		if( effectSettings.itemOverflowHidden ) {
			[].slice.call(this.items).forEach(function(item) {
				item.parentNode.style.overflow = 'hidden';
			});
		}

		animeOpts.targets = effectSettings.sortTargetsFn && typeof effectSettings.sortTargetsFn === 'function' ? [].slice.call(this.items).sort(effectSettings.sortTargetsFn) : this.items;
		anime.remove(animeOpts.targets);
		anime(animeOpts);
	};

	GridLoaderFx.prototype._resetStyles = function() {
		this.el.style.WebkitPerspective = this.el.style.perspective = 'none';
		[].slice.call(this.items).forEach(function(item) {
			var gItem = item.parentNode;
			item.style.opacity = 0;
			item.style.WebkitTransformOrigin = item.style.transformOrigin = '50% 50%';
			item.style.transform = 'none';

			var svg = item.parentNode.querySelector('svg.grid__deco');
			if( svg ) {
				gItem.removeChild(svg);
			}

			var revealer = item.parentNode.querySelector('.grid__reveal');
			if( revealer ) {
				gItem.removeChild(revealer);
			}

			gItem.style.overflow = '';
		});
	};

	window.GridLoaderFx = GridLoaderFx;

	var body = document.body,
		grids = [].slice.call(document.querySelectorAll('.grid')), masonry = [],
		currentGrid = 0,
		// Switch grid radio buttons.
		switchGridCtrls = [].slice.call(document.querySelectorAll('.control__radio')),
		// Choose effect buttons.
		fxCtrls = [].slice.call(document.querySelectorAll('.control--effects > .control__btn')),
		// The GridLoaderFx instances.
		loaders = [],
		loadingTimeout;

	function init() {
		// Preload images
		imagesLoaded(body, function() {
			// Initialize Masonry on each grid.
			grids.forEach(function(grid) {
				var m = new Masonry(grid, {
					itemSelector: '.grid__item',
					columnWidth: '.grid__sizer',
					percentPosition: true,
					transitionDuration: 0
				});
				masonry.push(m);
				// Hide the grid.
				grid.classList.add('grid--hidden');
				// Init GridLoaderFx.
				loaders.push(new GridLoaderFx(grid));
			});

			// Show current grid.
			grids[currentGrid].classList.remove('grid--hidden');
			// Init/Bind events.
			initEvents();
			// Remove loading class from body
			body.classList.remove('loading');
			loaders[currentGrid]._render('Shu');
		});
	}

	function initEvents() {
		// Switching grids radio buttons.
		switchGridCtrls.forEach(function(ctrl) {
			ctrl.addEventListener('click', switchGrid);
		});
		// Effect selection.
		fxCtrls.forEach(function(ctrl) {
			ctrl.addEventListener('click', applyFx);
		});
	}

	function switchGrid(ev) {
		// Hide current grid.
		grids[currentGrid].classList.add('grid--hidden');
		// New grid.
		var grid = grids.filter(function(obj) { return obj.classList.contains(ev.target.value); })[0];
		// Update currentGrid.
		currentGrid = grids.indexOf(grid);
		// Show new grid.
		grid.classList.remove('grid--hidden');
		masonry[currentGrid].layout();
	}

	function applyFx(ev) {
		// Simulate loading grid to show the effect.
		clearTimeout(loadingTimeout);
		grids[currentGrid].classList.add('grid--loading');

		loadingTimeout = setTimeout(function() {
			grids[currentGrid].classList.remove('grid--loading');

			// Apply effect.
			loaders[currentGrid]._render(ev.target.getAttribute('data-fx'));
		}, 500);
	}

	init();

})(window);


// Isotope

// init Isotope
var $grid = $('.grid').isotope({
  getSortData: {
    number: '.year parseFloat',
    oldest: '.year parseFloat',
    newest: '.year parseFloat'
  },
   sortAscending: {
    oldest: true,
    newest: false
  }
});

// FILTER items on button click
$('.filter').on( 'click', 'button', function() {
  var filterValue = $(this).attr('data-filter');
  $grid.isotope({ filter: filterValue });
});

$('.filter').each( function( i, buttonGroup ) {
  var $buttonGroup = $( buttonGroup );
  $buttonGroup.on( 'click', 'button.action', function() {
    $buttonGroup.find('.is-checked').removeClass('is-checked');
    $( this ).addClass('is-checked');
  });
});

// SORT Items

$('.sort-button-group').on( 'click', 'button.action', function() {
  var sortValue = $(this).attr('data-sort-by');
  $grid.isotope({ sortBy: sortValue });
});

// change is-checked class on buttons
$('.sort-button-group').each( function( i, buttonGroup ) {
  var $buttonGroup = $( buttonGroup );
  $buttonGroup.on( 'click', 'button.action', function() {
    $buttonGroup.find('.is-checked').removeClass('is-checked');
    $( this ).addClass('is-checked');
  });
});

// START Custom


$(document).ready(function(){
	
	// Burger
  $(".hamburger").click(function(){
    $(this).toggleClass("is-active");
   });	
   
	// Hide Year
  $(".year-toggle-btn").click(function(){
    $("span.year").toggleClass("is-shown");
    $(this).toggleClass("is-active");
   });
	// Clicked on startup
    $(".year-toggle-btn").trigger('click');

  // Filters and Sort Mobile
    $(".sort-button-group > button").click(function(){
    $(".sort-button-group > .btn-mobile-options").toggleClass("is-shown");
    $(this).toggleClass("is-active");
    $(".filter > .btn-mobile-options").removeClass("is-shown");
    $(".filter > button").removeClass("is-active");
   });  
   
    $(".filter > button").click(function(){
    $(".filter > .btn-mobile-options").toggleClass("is-shown");
    $(this).toggleClass("is-active");
    $(".sort-button-group > .btn-mobile-options").removeClass("is-shown");
    $(".sort-button-group > button").removeClass("is-active");
   });


	// MagniPopup
	$('.popup-link').magnificPopup({
		type: 'ajax',
		midClick: true,
		removalDelay: 300,
		mainClass: 'mfp-fade'
	});
	
	$('.menu-link').magnificPopup({
		type: 'inline',
		midClick: true,
		removalDelay: 300,
		mainClass: 'mfp-fade'
	});

	
	 
});

//END Custom
