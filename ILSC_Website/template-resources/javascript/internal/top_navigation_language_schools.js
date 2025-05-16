$(function() {

	//Megamenu	
  'use strict';
  /*Activate default tab contents*/
  var leftPos, newWidth, $magicLine;

  $('.nav-bar-items').append("<div id='magic-line'></div>");
  $magicLine = $('#magic-line');
  

  $('.navbar-nav li.nav-item a.nav-link').click(function() {
    var $this = $(this);
    $this.parent().addClass('active').siblings().removeClass('active');
    $magicLine
      .data('origLeft', $this.position().left)
      .data('origWidth', $this.parent().width());
    
 
  });

  /*Magicline hover animation*/
  $('.navbar-nav li.nav-item').find('a.nav-link').mouseenter(function() {
	  
    leftPos = $(this).position().left;
    newWidth = $(this).parent().width() - 15;
    
    $magicLine.css({
      "left": leftPos,
      "width": newWidth
    }).addClass('magic-active');
    

    
  }).mouseleave(function() {
	  
    $magicLine.css({
      "left": $magicLine.data('origLeft'),
      "width": $magicLine.data('origWidth') -15
    });
    $('.dropdown').on('hidden.bs.dropdown', function() {
		$magicLine.removeClass('magic-active');
	});
    $(this).parent().parent().removeClass('menu-hide');
  });
  
  $('.navbar-nav li.nav-item').mouseleave(function() {
	 
	  if(!$('ul.navbar-nav').hasClass('menu-show')){
		$magicLine.removeClass('magic-active');
	 }
		 
  });
  
  
  
  $('.top-nav .navbar-nav .dropdown').on('hidden.bs.dropdown', function() {
	  	$('ul.navbar-nav').addClass('menu-hide');
 	  	$('ul.navbar-nav').removeClass('menu-show');
		$magicLine.removeClass('magic-active');
	});
  $('.top-nav .navbar-nav .dropdown').on('shown.bs.dropdown', function() {
	  	$('ul.navbar-nav').addClass('menu-show');
	  	$('ul.navbar-nav').removeClass('menu-hide');
		$magicLine.addClass('magic-active');
	});
  
  //StickyNav
  

	// grab the initial top offset of the navigation 
   	var stickyNavTop = $('.top-nav').position().top;
   	
   	// our function that decides weather the navigation bar should have "fixed" css position or not.
   	var stickyNav = function(){
	    var scrollTop = $(window).scrollTop(); // our current vertical position from the top
	         
	    // if we've scrolled more than the navigation, change its position to fixed to stick to top,
	    // otherwise change it back to relative
	     if (scrollTop > stickyNavTop) { 
	        $('.top-nav').addClass('sticky');
	        $('.cta-flyout').addClass('show-fo');     
	        
	    } else {
	        $('.top-nav').removeClass('sticky');
	        $('.cta-flyout').removeClass('show-fo');
	    }
	};

  
	stickyNav();
	// and run it again every time you scroll
	$(window).scroll(function() {
		stickyNav();
	});
  
 
    $('.top-nav .nav-bar-items.navbar-collapse').on('show.bs.collapse', function () {
      $('.top-nav .navbar-brand').addClass("mobile-show");
    }).on('hide.bs.collapse', function () {
      $('.top-nav .navbar-brand').removeClass("mobile-show");
    });

  
});